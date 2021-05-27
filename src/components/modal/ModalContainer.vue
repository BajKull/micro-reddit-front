<template>
  <SignInModal v-if="$store.state.modal === 'signIn'" />
  <SignUpModal v-if="$store.state.modal === 'signUp'" />
  <ChangePasswordModal v-if="$store.state.modal === 'changePassword'" />
  <ChangeEmailModal v-if="$store.state.modal === 'changeEmail'" />
</template>

<script>
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import ChangePasswordModal from "./ChangePasswordModal";
import ChangeEmailModal from "./ChangeEmailModal";

export default {
  name: "ModalContainer",
  components: {
    SignInModal,
    SignUpModal,
    ChangePasswordModal,
    ChangeEmailModal,
  },
};
</script>

<style></style>
