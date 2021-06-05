<template>
  <div class="sort">
    <div>
      <button ref="sort1" @click="setSort('sort1')">
        newest
      </button>
      <button ref="sort2" @click="setSort('sort2')">
        popular
      </button>
      <button ref="sort3" @click="setSort('sort3')">
        trending
      </button>
    </div>
    <div class="views">
      <div class="cardContainer" ref="view1" @click="setView('view1')">
        <Icon iconName="card" />
      </div>
      <div class="listContainer" ref="view2" @click="setView('view2')">
        <Icon iconName="list" />
      </div>
    </div>
  </div>
  <div class="sort" v-if="$store.state.subreddit.length === 0">
    <p>
      There are no posts to show.
    </p>
  </div>
  <div class="post" v-for="post in posts" :key="post.id">
    <PostOverview :post="post" />
  </div>
</template>

<script>
import PostOverview from "../subreddits/PostOverview";
import Icon from "../icons/Icon";
export default {
  name: "PostsOverview",
  data() {
    return {
      view: "view1",
    };
  },
  computed: {
    posts() {
      return this.$store.state.subreddit;
    },
    route() {
      return this.$route.name;
    },
    watchTrigger() {
      const route = this.$route.name;
      const id = this.$route.params.id;
      const sort = this.$store.state.sortPosts;
      return `${sort}, ${route}, ${id}`;
    },
  },
  methods: {
    setSort(val) {
      localStorage.setItem("sort", val);
      this.$store.commit("setSortPosts", val);
      this.$refs.sort1.classList.remove("active");
      this.$refs.sort2.classList.remove("active");
      this.$refs.sort3.classList.remove("active");
      this.$refs[val].classList.add("active");
    },
    setView(val) {
      localStorage.setItem("view", val);
      this.view = val;
      this.$refs.view1.classList.remove("active");
      this.$refs.view2.classList.remove("active");
      this.$refs[val].classList.add("active");
    },
    setPosts() {
      const howToSort = () => {
        if (this.$store.state.sortPosts === "sort1") return "newest";
        if (this.$store.state.sortPosts === "sort2") return "popular";
        if (this.$store.state.sortPosts === "sort3") return "trending";
      };
      const route = this.$route.name;
      if (route === "Landing")
        this.$store.dispatch("getLanding", { sort: howToSort() });
      else if (route === "Subreddit")
        this.$store.dispatch("getSubreddit", {
          subreddit: this.$route.params.id,
          sort: howToSort(),
        });
    },
  },
  watch: {
    watchTrigger() {
      this.setPosts();
    },
  },
  beforeMount: function() {
    this.view = localStorage.getItem("view") || "view1";
  },
  mounted: function() {
    this.$nextTick(() => {
      this.$refs[this.view].classList.add("active");
      this.$refs[this.$store.state.sortPosts].classList.add("active");
    });
    this.setPosts();
  },
  components: { PostOverview, Icon },
};
</script>

<style></style>
