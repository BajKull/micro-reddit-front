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
        });
    } else commit("setUser", "noUser");
  },
  signIn: ({ commit }, { username, password }) => {
    axios
      .post(`${URL}/signIn`, { username, password })
      .then((res) => {
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
};

export default actions;
