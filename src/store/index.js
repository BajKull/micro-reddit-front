import { createStore } from "vuex";
import actions from "./actions";

export default createStore({
  state: {
    user: null,
    modal: "",
    error: { active: false, message: "" },
    success: { active: false, message: "" },
    subreddits: [],
    subreddit: null,
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
      state.subreddit = payload;
    },
    addSubreddit(state, payload) {
      state.subreddits.push(payload);
    },
    likePost(state, payload) {
      const { value, postId } = payload;
      const post = state.subreddit.find((p) => p.id === postId);
      const postIndex = state.subreddit.findIndex((p) => p.id === postId);
      const votes = parseInt(state.subreddit[postIndex].votes);
      if (post.voted === value) {
        state.subreddit[postIndex].voted = 0;
        if (value === 1) state.subreddit[postIndex].votes = votes - 1;
        else state.subreddit[postIndex].votes = votes + 1;
      } else {
        if (value === 1) {
          console.log(post.voted, post.voted === -1, post.voted == -1);
          if (post.voted === -1) state.subreddit[postIndex].votes = votes + 2;
          else state.subreddit[postIndex].votes = votes + 1;
        } else {
          if (post.voted === 1) state.subreddit[postIndex].votes = votes - 2;
          else state.subreddit[postIndex].votes = votes - 1;
        }
        state.subreddit[postIndex].voted = value;
      }
    },
    joinSubreddit(state, payload) {
      const { subredditId } = payload;
      const index = state.user.subreddits.indexOf(subredditId);
      if (index !== -1) state.user.subreddits.splice(index, 1);
      else state.user.subreddits.push(subredditId);
    },
  },
  actions,
  modules: {},
});
