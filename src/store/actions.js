import axios from "axios";
const URL = "http://localhost:5000";

const actions = {
  initAuth: ({ commit }) => {
    const sessionID = localStorage.getItem("sessionID");
    if (sessionID) {
      axios
        .post(`${URL}/initAuth`, { sessionID })
        .then((res) => {
          commit("setUser", res.data);
        })
        .catch(() => {
          localStorage.removeItem("sessionID");
          commit("setUser", "noUser");
        });
    } else commit("setUser", "noUser");
  },
  signIn: ({ commit }, { username, password }) => {
    axios
      .post(`${URL}/signIn`, { username, password })
      .then((res) => {
        console.log(res.data.user);
        localStorage.setItem("sessionID", res.data.sessionID);
        commit("setUser", res.data.user);
        commit("setModal", "");
      })
      .catch(() =>
        commit("setError", {
          active: true,
          msg: "Invalid username or password.",
        })
      );
  },
  signUp: ({ commit, dispatch }, { username, email, password }) => {
    axios
      .post(`${URL}/signUp`, { username, email, password })
      .then(() => {
        dispatch("signIn", { username, password });
        commit("setModal", "");
      })
      .catch((err) =>
        commit("setError", { active: true, msg: err.response.data })
      );
  },
  signOut: ({ commit }, { username }) => {
    axios
      .post(`${URL}/signOut`, { username })
      .then(() => {
        localStorage.removeItem("sessionID");
        commit("setUser", "noUser");
      })
      .catch((err) =>
        commit("setError", { active: true, msg: err.response.data })
      );
  },
  changePassword: ({ commit, state }, { password, newPassword }) => {
    axios
      .post(`${URL}/changePassword`, {
        password,
        newPassword,
        id: state.user.id,
      })
      .then(() => {
        commit("setSuccess", {
          active: true,
          msg: "Password successfully changed.",
        });
        commit("setModal", "");
      })
      .catch((err) =>
        commit("setError", { active: true, msg: err.response.data })
      );
  },
  changeEmail: ({ commit, state }, { email, password }) => {
    axios
      .post(`${URL}/changeEmail`, {
        email,
        password,
        id: state.user.id,
      })
      .then(() => {
        commit("setSuccess", {
          active: true,
          msg: "Email successfully changed.",
        });
        commit("setModal", "");
      })
      .catch((err) =>
        commit("setError", { active: true, msg: err.response.data })
      );
  },
  getSubreddits: ({ commit, state, dispatch }, { sort }) => {
    if (!state.user || state.user === "noUser") {
      dispatch("getSubredditsAll", { sort, limit: true });
      return;
    }
    axios
      .get(`${URL}/subreddits`, {
        params: { user: state.user?.id || null, sort },
      })
      .then((res) => {
        commit("setSubreddits", res.data);
      })
      .catch((err) =>
        commit("setError", { active: true, msg: err.response.data })
      );
  },
  getSubredditsAll: ({ commit }, { sort, limit = false }) => {
    axios
      .get(`${URL}/subredditsAll`, { params: { sort, limit } })
      .then((res) => {
        commit("setSubreddits", res.data);
      })
      .catch((err) =>
        commit("setError", { active: true, msg: err.response.data })
      );
  },
  getSubreddit: ({ commit, state }, { subreddit, sort }) => {
    axios
      .get(`${URL}/subreddit/${subreddit}`, {
        params: { user: state.user ? state.user.id : null, sort },
      })
      .then((res) => {
        commit("setSubreddit", res.data);
      })
      .catch((err) => console.log(err));
  },
  createSubreddit: ({ commit, state }, { name, desc, router }) => {
    const user = state.user.id;
    axios
      .post(`${URL}/createSubreddit`, { name, desc, user })
      .then((res) => {
        commit("addSubreddit", res.data);
        commit("setSuccess", {
          active: true,
          msg: "Subreddit successfully created.",
        });
        router.push(`/r/${name}`);
      })
      .catch((err) => {
        commit("setError", { active: true, msg: err.response.data });
        console.log(err);
      });
  },
  createPost: (
    { commit, state },
    { name, content, image, video, survey, subredditId, router }
  ) => {
    const data = {
      name,
      content,
      image,
      video,
      survey,
      subredditId,
      userId: state.user.id,
    };
    axios
      .post(`${URL}/createPost`, { data })
      .then(() => {
        commit("setSuccess", {
          active: true,
          msg: "Post successfully created.",
        });
        router.push(`/r/${subredditId}`);
      })
      .catch((err) => {
        commit("setError", { active: true, msg: err.response.data });
      });
  },
  likePost: ({ commit, state }, { value, postId }) => {
    const userId = state.user.id;
    const data = { value, postId, userId };
    if (!userId) {
      commit("setError", {
        active: true,
        msg: "In order to vote post, you need to be signed in.",
      });
      return;
    }
    commit("likePost", { value, postId });
    axios
      .post(`${URL}/likePost`, { data })
      .catch((err) =>
        commit("setError", { active: true, msg: err.response.data })
      );
  },
  deletePost: ({ commit, state }, { router, id, path, subredditName }) => {
    const user = state.user;
    if (!user && user === "noUser") return;
    commit("deletePost", { id });
    state.socket.emit("deletePost", { user, id, path, subredditName }, () => {
      if (path.split("/").length === 4) router.push(`/r/${subredditName}`);
    });
  },
  joinSubreddit: ({ commit, state }, { subredditId }) => {
    const userId = state.user.id;
    commit("joinSubreddit", { subredditId });
    axios.post(`${URL}/joinSubreddit`, { subredditId, userId });
  },
  getLanding: ({ commit, state }, { sort }) => {
    axios
      .get(`${URL}/getLanding`, {
        params: { userId: state.user.id || null, sort },
      })
      .then((res) => commit("setSubreddit", res.data))
      .catch((err) => {
        commit("setError", { active: true, msg: err.response.data });
      });
  },
  getSearch: ({ commit }, { sortPosts, sortSubreddits, search }) => {
    axios
      .get(`${URL}/getSearch`, {
        params: { search, sortPosts, sortSubreddits },
      })
      .then((res) => {
        commit("setSubreddit", res.data.posts);
        commit("setSubreddits", res.data.subreddits);
      })
      .catch((err) => {
        commit("setError", { active: true, msg: err.response.data });
      });
  },
  getPost: ({ commit }, { postId }) => {
    axios
      .get(`${URL}/getPost`, { params: { postId } })
      .then((res) => {
        commit("setPost", res.data);
      })
      .catch((err) => {
        commit("setError", { active: true, msg: err.response.data });
      });
  },
  subredditEdit: ({ commit, state }, { router, subredditId, description }) => {
    const user = state.user.id;
    if (!user) return;
    axios
      .post(`${URL}/subredditEdit`, { user, subredditId, description })
      .then(() => {
        commit("setSuccess", {
          active: true,
          msg: "Subreddit successfully updated.",
        });
        router.push(`/r/${subredditId}`);
      })
      .catch((err) => {
        console.log(err);
        commit("setError", { active: true, msg: err.response.data });
      });
  },
  deleteComment: ({ commit, state }, { id, subredditName, path }) => {
    const user = state.user;
    if (!user) return;
    state.socket.emit("deleteComment", { user, subredditName, id, path });
    commit("deleteComment", { id });
  },
};

export default actions;
