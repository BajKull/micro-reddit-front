<template>
  <Modal>
    <h1>Sign up</h1>
    <form @submit="signUp" class="mainForm">
      <label for="username">Username</label>
      <input
        class="mainInput"
        required
        v-model="username"
        type="text"
        name="username"
      />
      <label for="email">Email</label>
      <input
        class="mainInput"
        required
        v-model="email"
        type="email"
        name="email"
      />
      <label for="password">Password</label>
      <input
        class="mainInput"
        required
        v-model="password"
        type="password"
        name="password"
      />
      <label for="password2">Confirm Password</label>
      <input
        class="mainInput"
        required
        v-model="password2"
        type="password"
        name="password2"
      />
      <input type="submit" class="mainSubmit" />
    </form>
    <p>
      Already have an account?
      <span class="underline" @click="signIn">Sign in!</span>
    </p>
  </Modal>
</template>

<script>
import Modal from "../modal/Modal";
export default {
  name: "SignUpModal",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      password2: "",
    };
  },
  components: {
    Modal,
  },
  methods: {
    setError(msg) {
      this.$store.commit("setError", { active: true, msg });
    },
    signIn() {
      this.$store.commit("setModal", "signIn");
    },
    signUp(event) {
      event.preventDefault();
      if (this.username.length < 3) {
        this.setError("Username must be at least 3 characters long.");
        return;
      }
      if (this.username.length > 24) {
        this.setError("Username can't be longer than 24 characters.");
        return;
      }
      if (this.password.length < 6) {
        this.setError("Password must be at least 6 characters long.");
        return;
      }
      if (this.password !== this.password2) {
        this.setError("Passwords don't match.");
        return;
      }
      this.$store.dispatch("signUp", {
        username: this.username,
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style></style>
