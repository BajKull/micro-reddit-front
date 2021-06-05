<template>
  <div class="subredditList">
    <div class="subredditInfo">
      <h1 class="subredditTitle">{{ $route.params.id }}</h1>
      <router-link
        v-if="
          user && user !== 'noUser' && user.moderator.includes($route.params.id)
        "
        class="secondaryButton subredditManage"
        :to="`/r/${$route.params.id}/edit`"
      >
        Manage
      </router-link>
      <button
        v-if="user && user !== 'noUser'"
        :class="
          user.subreddits.includes($route.params.id)
            ? 'mainButton subredditJoin leaveBtn'
            : 'mainButton subredditJoin joinBtn'
        "
        @click="join"
      >
        {{ user.subreddits.includes($route.params.id) ? "Leave" : "Join" }}
      </button>
    </div>
    <div class="create">
      <input
        class="mainInput"
        placeholder="Create post"
        @click="create"
        @keydown="createK"
      />
    </div>
    <h2 class="subredditEmpty" v-if="posts && posts.length === 0">
      There are no posts in this subreddit.
    </h2>
    <div class="postsList">
      <PostsOverview />
    </div>
  </div>
</template>

<script>
import PostsOverview from "./PostsOverview";
export default {
  name: "Subreddit",
  methods: {
    create() {
      const route = this.$route.params.id;
      this.$router.push(`/r/${route}/createPost`);
    },
    createK(e) {
      if (e.key === "Tab") return;
      this.create();
    },
    join() {
      const route = this.$route.params.id;
      this.$store.dispatch("joinSubreddit", { subredditId: route });
    },
  },
  computed: {
    posts() {
      return this.$store.state.subreddit;
    },
    user() {
      return this.$store.state.user;
    },
  },

  components: { PostsOverview },

  mounted: function() {
    const path = this.$route.fullPath;
    this.$store.state.socket.emit("joinRoom", { path });
  },
  onUnmounted: function() {
    const path = this.$route.fullPath;
    this.$store.state.socket.emit("leaveRoom", { path });
  },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_mixins.scss";
.subredditList {
  width: 100%;
  padding: 25px 0;
  min-height: calc(100vh - 110px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: $gray;

  @include breakpoint(600px) {
    width: calc(100% - 10px);
    padding: 25px 5px;
  }

  .flex {
    display: flex;
  }

  .subredditEmpty {
    text-align: center;
    margin: 25px 0;
  }

  .postsList {
    width: 30%;
    min-width: 500px;
    margin: 0 auto;

    @include breakpoint(600px) {
      width: 100%;
      min-width: initial;
    }
  }

  .create {
    margin: 0 auto;
    width: 30%;
    min-width: 500px;

    @include breakpoint(600px) {
      width: 100%;
      min-width: initial;
    }

    .mainInput {
      background-color: white;
      width: calc(100% - 40px);
      padding: 15px 20px;
    }
    margin-bottom: 15px;
  }

  .subredditInfo {
    display: flex;
    justify-content: center;
    position: relative;
    margin-bottom: 50px;
    align-items: center;
    width: 80%;
    margin: 0 auto 50px auto;
    width: 30%;
    min-width: 500px;

    @include breakpoint(600px) {
      width: 100%;
      min-width: initial;
    }

    .subredditManage {
      display: block;
      position: absolute;
      left: 0;
      width: 50px;
      text-align: center;
    }

    .titleContainer {
      position: relative;
    }

    .subredditTitle {
      text-align: center;
      justify-self: center;
    }

    .subredditJoin {
      position: absolute;
      right: 0;
    }
    .joinBtn {
      background: $main;
      color: white;
      transition: background-color 0.2s;
      &:hover {
        background: darken($main, 10);
      }
    }
    .leaveBtn {
      background: lighten($error, 35);
      color: white;
      transition: background-color 0.2s;
      &:hover {
        background: lighten($error, 25);
      }
    }
    .secondaryButton {
      position: absolute;
      left: 0;
    }
  }
}
</style>
