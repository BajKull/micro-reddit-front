import { createStore } from "vuex";
import actions from "./actions";
import { io } from "socket.io-client";
const socket = io("http://localhost:5050");

export default createStore({
  state: {
    user: null,
    modal: "",
    error: { active: false, message: "" },
    success: { active: false, message: "" },
    subreddits: [],
    subreddit: [],
    sortPosts: localStorage.getItem("sort") || "sort1",
    sortSubreddits: localStorage.getItem("subredditSort") || "sort1",
    post: { commentList: [] },
    socket,
  },
  mutations: {
    setModal(state, payload) {
      state.modal = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
      state.success.active = false;
    },
    setSortPosts(state, payload) {
      state.sortPosts = payload;
    },
    setPost(state, payload) {
      const post = payload;
      if (post.video_url === "null") post.video_url = null;
      if (post.image_path) {
        try {
          new URL(post.image_path);
        } catch (error) {
          post.image_path = `http://localhost:5000/getImage/${post.image_path}`;
        }
      }
      state.post = post;
    },
    addComment(state, payload) {
      state.post.commentList.unshift(payload);
    },
    setSortSubreddits(state, payload) {
      state.sortSubreddits = payload;
    },
    closeError(state) {
      state.error.active = false;
    },
    setSuccess(state, payload) {
      state.success = payload;
      state.error.active = false;
    },
    closeSuccess(state) {
      state.success.active = false;
    },
    setSubreddits(state, payload) {
      state.subreddits = payload;
    },
    setSubreddit(state, payload) {
      const posts = payload.map((p) => {
        if (!p.image_path) return p;
        try {
          new URL(p.image_path);
          return p;
        } catch (error) {
          return {
            ...p,
            image_path: `http://localhost:5000/getImage/${p.image_path}`,
          };
        }
      });
      state.subreddit = posts;
    },
    addSubreddit(state, payload) {
      state.subreddits.push(payload);
    },
    likePost(state, payload) {
      const { value, postId, postsOverview } = payload;
      const post = state.subreddit.find((p) => p.id === postId);
      const desired = postsOverview ? post : state.post;
      const votes = parseInt(desired.votes);
      console.log(payload, votes, desired);
      if (desired.voted === value) {
        desired.voted = 0;
        if (value === 1) desired.votes = votes - 1;
        else desired.votes = votes + 1;
      } else {
        if (value === 1) {
          if (desired.voted === -1) desired.votes = votes + 2;
          else desired.votes = votes + 1;
        } else {
          if (desired.voted === 1) desired.votes = votes - 2;
          else desired.votes = votes - 1;
        }
        desired.voted = value;
      }
    },
    joinSubreddit(state, payload) {
      const { subredditId } = payload;
      const index = state.user.subreddits.indexOf(subredditId);
      if (index !== -1) state.user.subreddits.splice(index, 1);
      else state.user.subreddits.push(subredditId);
    },
    deletePost(state, payload) {
      state.subreddit = state.subreddit.filter((p) => p.id !== payload.id);
    },
    deleteComment(state, payload) {
      state.post.commentList = state.post.commentList.filter(
        (c) => c.id !== payload.id
      );
    },
  },
  actions,
  modules: {},
});
