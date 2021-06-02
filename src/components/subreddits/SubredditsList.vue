<template>
  <div class="sort">
    <button ref="sort1" @click="setSort('sort1')">
      most users
    </button>
    <button ref="sort2" @click="setSort('sort2')">
      most posts
    </button>
  </div>
  <div class="sort" v-if="$store.state.subreddits.length === 0">
    There are no subreddits to show.
  </div>
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
  name: "SubredditList",
  computed: {
    watchTrigger() {
      const route = this.$route.name;
      const id = this.$route.params.id;
      const sort = this.$store.state.sortSubreddits;
      return `${sort}, ${route}, ${id}`;
    },
  },
  methods: {
    setSort(val) {
      localStorage.setItem("subredditSort", val);
      this.$store.commit("setSortSubreddits", val);
      this.$refs.sort1.classList.remove("active");
      this.$refs.sort2.classList.remove("active");
      this.$refs[val].classList.add("active");
    },
    setSubreddits() {
      const howToSort = () => {
        if (this.$store.state.sortSubreddits === "sort1") return "users";
        if (this.$store.state.sortSubreddits === "sort2") return "posts";
        return "users";
      };
      const route = this.$route.name;
      if (route === "Subreddits")
        this.$store.dispatch("getSubredditsAll", { sort: howToSort() });
      else if (route === "Landing")
        this.$store.dispatch("getSubreddits", { sort: howToSort() });
    },
  },
  watch: {
    watchTrigger() {
      this.setSubreddits();
    },
  },
  beforeMount: function() {
    this.$nextTick(() => {
      this.setSubreddits();
    });
  },
  mounted: function() {
    this.$nextTick(() => {
      this.$refs[this.$store.state.sortSubreddits].classList.add("active");
    });
  },
};
</script>

<style lang="scss"></style>
