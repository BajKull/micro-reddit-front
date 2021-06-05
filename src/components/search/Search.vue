<template>
  <div class="search">
    <h1 class="searchTitle">
      Search results for <span class="color">{{ $route.params.id }}</span>
    </h1>
    <div class="content">
      <SubredditsList />
      <PostsOverview />
    </div>
  </div>
</template>

<script>
import PostsOverview from "../subreddits/PostsOverview";
import SubredditsList from "../subreddits/SubredditsList";
export default {
  name: "Search",
  components: { PostsOverview, SubredditsList },
  computed: {
    watchTrigger() {
      const sortPosts = this.$store.state.sortPosts;
      const sortSubreddits = this.$store.state.sortSubreddits;
      const id = this.$route.params.id;
      return `${sortPosts}, ${sortSubreddits}, ${id}`;
    },
  },
  methods: {
    getSearch() {
      const howToSort = () => {
        if (this.$store.state.sortPosts === "sort1") return "newest";
        if (this.$store.state.sortPosts === "sort2") return "popular";
        if (this.$store.state.sortPosts === "sort3") return "trending";
      };
      const howToSortSubreddit = () => {
        if (this.$store.state.sortSubreddits === "sort1") return "users";
        if (this.$store.state.sortSubreddits === "sort2") return "posts";
      };
      this.$store.dispatch("getSearch", {
        sortPosts: howToSort(),
        sortSubreddits: howToSortSubreddit(),
        search: this.$route.params.id,
      });
    },
  },
  watch: {
    watchTrigger() {
      this.getSearch();
    },
  },
  beforeMount: function() {
    this.getSearch();
  },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_mixins.scss";
.search {
  width: 100%;
  background-color: $gray;
  min-height: calc(100vh - 60px);

  .searchTitle {
    text-align: center;
    padding: 25px 0;

    .color {
      color: $darkMain;
    }
  }

  .content {
    width: 30%;
    min-width: 500px;
    margin: auto;

    @include breakpoint(600px) {
      min-width: initial;
      width: calc(100% - 10px);
      padding: 0 5px;
    }

    .subreddit {
      display: flex;
      align-items: center;
      margin-bottom: 25px;
      padding: 15px 30px;
      background-color: darken($gray, 5);
      transition: background-color 0.2s;
      text-decoration: none;
      color: inherit;
      border-radius: 5px;
      &:hover {
        background-color: darken($gray, 10);
      }

      .subredditInfo {
        display: flex;
        flex-direction: column;
        .subredditTitle {
          margin-bottom: 10px;
        }

        .subredditDesc {
          margin-bottom: 10px;

          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }

    .subredditAvatar {
      position: relative;
      font-size: 3em;
      min-width: 85px;
      min-height: 85px;
      border-radius: 50%;
      background-color: $darkMain;
      color: white;
      margin-right: 30px;

      @include breakpoint(900px) {
        min-width: 45px;
        min-height: 45px;
        font-size: 1.25em;
      }
      p {
        line-height: 0;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }
  }
}
</style>
