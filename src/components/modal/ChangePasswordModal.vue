<template>
  <Modal>
    <h1>Change password</h1>
    <form @submit="change" class="mainForm">
      <label for="password">Current password</label>
      <input
        class="mainInput"
        v-model="password"
        type="password"
        name="password"
      />
      <label for="password2">New password</label>
      <input
        class="mainInput"
        v-model="password2"
        type="password"
        name="password2"
      />
      <label for="password3">Confirm password</label>
      <input
        class="mainInput"
        v-model="password3"
        type="password"
        name="password3"
      />
      <input class="mainSubmit" type="submit" />
    </form>
  </Modal>
</template>

<script>
import Modal from "../modal/Modal";
export default {
  name: "ChangePasswordModal",
  data() {
    return {
      password: "",
      password2: "",
      password3: "",
    };
  },
  components: {
    Modal,
  },
  methods: {
    setError(msg) {
      this.$store.commit("setError", { active: true, msg });
    },
    change(e) {
      e.preventDefault();
      if (this.password2.length < 6) {
        this.setError("Password must be at least 6 characters long.");
        return;
      }
      if (this.password2 !== this.password3) {
        this.setError("Passwords don't match.");
        return;
      }
      this.$store.dispatch("changePassword", {
        password: this.password,
        newPassword: this.password2,
      });
    },
  },
};
</script>

<style></style>
