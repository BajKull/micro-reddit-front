<template>
  <Modal>
    <h1>Change email</h1>
    <form @submit="change">
      <label for="password">Current password</label>
      <input
        class="mainInput"
        v-model="password"
        type="password"
        name="password"
      />
      <label for="email">New email address</label>
      <input
        class="mainInput"
        v-model="email"
        type="email"
        name="email"
        required
      />
      <input class="mainSubmit" type="submit" />
    </form>
  </Modal>
</template>

<script>
import Modal from "../modal/Modal";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  components: {
    Modal,
  },
  methods: {
    change(e) {
      e.preventDefault();
      this.$store.dispatch("changeEmail", {
        password: this.password,
        email: this.email,
      });
    },
  },
};
</script>

<style></style>
