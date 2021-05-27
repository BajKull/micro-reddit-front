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
      state.error.success = false;
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
  },
  actions,
  modules: {},
});
