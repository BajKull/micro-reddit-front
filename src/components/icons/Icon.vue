<template>
  <Close v-if="iconName === 'close'" />
</template>

<script>
import Close from "./Close";
export default {
  name: "Icon",
  props: {
    iconName: {
      default: "",
      type: String,
    },
  },
  components: { Close },
};
</script>

<style></style>
