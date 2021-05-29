<template>
  <Close v-if="iconName === 'close'" />
  <ArrowUp v-if="iconName === 'arrowUp'" />
  <ArrowDown v-if="iconName === 'arrowDown'" />
  <Remove v-if="iconName === 'remove'" />
</template>

<script>
import Close from "./Close";
import ArrowUp from "./ArrowUp";
import ArrowDown from "./ArrowDown";
import Remove from "./Remove";
export default {
  name: "Icon",
  props: {
    iconName: {
      default: "",
      type: String,
    },
  },
  components: { Close, ArrowUp, ArrowDown, Remove },
};
</script>

<style></style>
