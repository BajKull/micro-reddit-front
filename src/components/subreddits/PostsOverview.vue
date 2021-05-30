<template>
  <div class="sort">
    <button ref="sort1" @click="setSort('sort1')">
      newest
    </button>
    <button ref="sort2" @click="setSort('sort2')">
      most popular
    </button>
    <button ref="sort3" @click="setSort('sort3')">
      trending
    </button>
    <div class="views">
      <div class="cardContainer" ref="view1" @click="setView('view1')">
        <Icon iconName="card" />
      </div>
      <div class="listContainer" ref="view2" @click="setView('view2')">
        <Icon iconName="list" />
      </div>
    </div>
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
      sort: "newest",
      view: "view1",
    };
  },
  computed: {
    posts() {
      return this.$store.state.subreddit;
    },
  },
  methods: {
    setSort(val) {
      localStorage.setItem("sort", val);
      this.sort = val;
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
  },
  watch: {
    sort() {
      const howToSort = () => {
        if (this.sort === "sort1") return "newest";
        if (this.sort === "sort2") return "popular";
        if (this.sort === "sort3") return "trending";
      };
      this.$store.dispatch("getLanding", { sort: howToSort() });
    },
  },
  beforeMount: function() {
    this.view = localStorage.getItem("view") || "view1";
    this.sort = localStorage.getItem("sort") || "sort1";
  },
  mounted: function() {
    this.$nextTick(() => {
      this.$refs[this.view].classList.add("active");
      this.$refs[this.sort].classList.add("active");
    });
  },
  components: { PostOverview, Icon },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
.sort {
  width: calc(100% - 100px);
  background-color: white;
  min-width: 400px;
  padding: 15px 50px;
  border-radius: 5px;
  margin: auto;
  margin-bottom: 25px;
  display: flex;

  .active {
    background: $main;
    color: white;

    &:hover {
      background: darken($main, 5);
    }
  }

  .views {
    display: flex;
    margin-left: auto;

    .cardContainer,
    .listContainer {
      max-height: 30px;
      max-width: 30px;
      cursor: pointer;
      margin-left: 15px;

      svg {
        height: 100%;
        width: 100%;
        fill: $gray;
        transition: fill 0.2s;
        &:hover {
          fill: darken($gray, 5);
        }
      }
    }

    .active {
      background: 0;
      svg {
        fill: $main;
      }
    }
  }

  button {
    border-radius: 500px;
    border: 0;
    padding: 5px 15px;
    background: $gray;
    margin-right: 10px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background: darken($gray, 5);
    }
  }
}
</style>
