<template>
  <router-link
    :to="`/r/${subreddit.name}`"
    class="subreddit"
    v-for="subreddit in $store.state.subreddits"
    :key="subreddit.id"
  >
    <div class="subredditAvatar">
      <p>{{ subreddit.name[0] }}</p>
    </div>
    <div class="subredditInfo">
      <h2 class="subredditTitle">{{ subreddit.name }}</h2>
      <p class="subredditDesc">{{ subreddit.description }}</p>
      <p class="subredditUsers">
        {{ subreddit.users }} user{{ subreddit.users > 1 ? "s" : "" }}
      </p>
    </div>
  </router-link>
</template>

<script>
export default {
  beforeMount: function() {
    this.$store.dispatch("getSubreddits");
  },
};
</script>

<style lang="scss"></style>
