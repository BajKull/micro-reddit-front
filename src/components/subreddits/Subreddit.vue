<template>
  <div class="subredditList">
    <div class="subredditInfo">
      <h1 class="subredditTitle">{{ $route.params.id }}</h1>
      <!-- <button>{{ post.member ? "Leave" : "Join" }}</button> -->

      <router-link class="secondaryButton" to="/r">Subreddit list</router-link>
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
    <div class="post" v-for="post in posts" :key="post.id">
      <div class="postVotes">
        <div
          :class="post.voted === 1 ? 'arrowContainer liked' : 'arrowContainer'"
          @click="like($event, 1, post.id)"
        >
          <Icon iconName="arrowUp" />
        </div>
        <p class="postVotesAmount">{{ post.votes }}</p>
        <div
          :class="
            post.voted === -1 ? 'arrowContainer disliked' : 'arrowContainer'
          "
          @click="like($event, -1, post.id)"
        >
          <Icon iconName="arrowDown" />
        </div>
      </div>
      <router-link class="content" :to="`/r/${post.name}/${post.id}`">
        <h2 class="postTitle">{{ post.title }}</h2>
        <p class="postContent">{{ post.content }}</p>
        <img :src="post.image_path" v-if="post.image_path" class="postImage" />
        <p class="postComments">
          {{
            post.comments == 0
              ? "No comments"
              : `${post.comments} comment${post.comments > 1 ? "s" : ""}`
          }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<script>
import Icon from "../icons/Icon";
export default {
  name: "Subreddit",
  components: { Icon },
  beforeCreate: function() {
    const route = this.$route.params.id;
    this.$store.dispatch("getSubreddit", { subreddit: route });
  },
  methods: {
    create() {
      const route = this.$route.params.id;
      this.$router.push(`/r/${route}/createPost`);
    },
    createK(e) {
      if (e.key === "Tab") return;
      this.create();
    },
    like(event, value, postId) {
      event.stopPropagation();
      this.$store.dispatch("likePost", { value, postId });
    },
  },
  computed: {
    posts() {
      return this.$store.state.subreddit;
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
.subredditList {
  width: 90%;
  padding: 25px 5%;
  min-height: calc(100vh - 110px);
  margin: auto;
  display: flex;
  flex-direction: column;
  background-color: $gray;

  .subredditEmpty {
    text-align: center;
    margin-top: 50px;
  }

  .create {
    margin: auto;
    width: calc(30% + 100px);
    min-width: 400px;
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
    .subredditTitle {
      text-align: center;
      justify-self: center;
    }

    .mainButton {
      position: absolute;
      right: 0;
    }
    .secondaryButton {
      position: absolute;
      left: 0;
    }
  }

  .post {
    width: 30%;
    min-width: 400px;
    margin: auto;
    background-color: white;
    padding: 15px 50px;
    margin-bottom: 25px;
    border-radius: 5px;
    transition: background-color 0.2s;
    position: relative;

    &:hover {
      background-color: darken(white, 3);
    }

    .content {
      min-height: 100px;
      text-decoration: none;
      color: inherit;
    }

    .postContent {
      margin-top: 10px;
      line-height: 1.25;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .postImage {
      display: block;
      margin: 25px auto;
      min-height: 150px;
      max-height: 600px;
      max-width: 100%;
      object-fit: contain;
    }

    .postVotes {
      position: absolute;
      top: 10px;
      left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      z-index: 1;

      p {
        margin: 5px 0;
      }

      svg {
        width: 24px;
        height: 24px;
        stroke-width: 13px;
        cursor: pointer;
      }

      .arrowUp {
        &:hover {
          fill: $success;
        }
      }
      .arrowDown {
        &:hover {
          fill: $error;
        }
      }
      .liked {
        .arrowUp {
          fill: $success;
        }
      }
      .disliked {
        .arrowDown {
          fill: $error;
        }
      }
    }
  }
}
</style>
