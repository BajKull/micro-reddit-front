<template>
  <SignInModal v-if="$store.state.modal === 'signIn'" />
  <SignUpModal v-if="$store.state.modal === 'signUp'" />
</template>

<script>
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";

export default {
  name: "ModalContainer",
  components: {
    SignInModal,
    SignUpModal,
  },
};
</script>

<style></style>
