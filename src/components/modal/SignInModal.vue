<template>
  <Modal>
    <h1>Sign In</h1>
    <form @submit="signIn">
      <label for="username">Username</label>
      <input class="mainInput" v-model="username" type="text" name="username" />
      <label for="password">Password</label>
      <input
        class="mainInput"
        v-model="password"
        type="password"
        name="password"
      />
      <input class="mainSubmit" type="submit" />
    </form>
    <p>
      Don't have an account?
      <span class="underline" @click="signUp">Sign up for free!</span>
    </p>
  </Modal>
</template>

<script>
import Modal from "../modal/Modal";
export default {
  name: "SignInModal",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  components: {
    Modal,
  },
  methods: {
    signIn(e) {
      e.preventDefault();
      this.$store.dispatch("signIn", {
        username: this.username,
        password: this.password,
      });
    },
    signUp() {
      this.$store.commit("setModal", "signUp");
    },
  },
};
</script>

<style lang="scss"></style>
