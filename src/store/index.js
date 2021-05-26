import { createStore } from "vuex";
import actions from "./actions";

export default createStore({
  state: {
    user: null,
    modal: "",
    error: { active: false, message: "" },
  },
  mutations: {
    // sync
    setModal(state, payload) {
      state.modal = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    closeError(state) {
      state.error.active = false;
    },
  },
  actions,
  modules: {},
});
