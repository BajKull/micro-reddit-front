<template>
  <Close v-if="iconName === 'close'" />
  <ArrowUp v-if="iconName === 'arrowUp'" />
  <ArrowDown v-if="iconName === 'arrowDown'" />
  <Remove v-if="iconName === 'remove'" />
  <Card v-if="iconName === 'card'" />
  <List v-if="iconName === 'list'" />
  <Search v-if="iconName === 'search'" />
</template>

<script>
import Close from "./Close";
import ArrowUp from "./ArrowUp";
import ArrowDown from "./ArrowDown";
import Remove from "./Remove";
import Card from "./Card";
import List from "./List";
import Search from "./Search";
export default {
  name: "Icon",
  props: {
    iconName: {
      default: "",
      type: String,
    },
  },
  components: { Close, ArrowUp, ArrowDown, Remove, Card, List, Search },
};
</script>

<style></style>
