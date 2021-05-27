<template>
  <div class="subreddit">
    <div class="post" v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.votes }}</p>
      <p>{{ post.comments }} comments</p>
      <img :src="post.image_path" v-if="post.image_path" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Subreddit",
  beforeCreate: function() {
    const route = this.$route.params.id;
    this.$store.dispatch("getSubreddit", { subreddit: route });
  },
  computed: {
    posts() {
      return this.$store.state.subreddit;
    },
  },
};
</script>

<style></style>
