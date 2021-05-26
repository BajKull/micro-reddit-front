<template>
  <div class="home">
    <Landing />
  </div>
</template>

<script>
// @ is an alias to /src
import Landing from "@/components/landing/Landing.vue";

export default {
  name: "LandingView",
  components: {
    Landing,
  },
};
</script>
