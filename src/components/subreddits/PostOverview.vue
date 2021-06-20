<template>
  <div class="postVotes">
    <div
      :class="post.voted === 1 ? 'arrowContainer liked' : 'arrowContainer'"
      @click="like($event, 1, post.id)"
    >
      <Icon iconName="arrowUp" />
    </div>
    <p class="postVotesAmount">{{ post.votes }}</p>
    <div
      :class="post.voted === -1 ? 'arrowContainer disliked' : 'arrowContainer'"
      @click="like($event, -1, post.id)"
    >
      <Icon iconName="arrowDown" />
    </div>
  </div>
  <div
    class="postDelete"
    v-if="user && user !== 'noUser' && user.moderator.includes(post.name)"
  >
    <button class="deleteBtn" @click="deletePost">Delete post</button>
  </div>
  <router-link class="content" :to="`/r/${post.name}/${post.id}`">
    <p class="tip">Posted {{ getDate(post.creation_date) }}</p>
    <h2 class="postTitle">{{ post.title }}</h2>
    <p class="postContent">{{ post.content }}</p>
    <img :src="post.image_path" v-if="post.image_path" class="postImage" />
    <iframe
      :src="videoUrl"
      v-if="
        post.video_url &&
          (routeName === 'SubredditPost' ||
            (routeName !== 'SubredditPost' && !post.image_path))
      "
      class="postVideo"
    />
    <p class="tip">
      {{
        post.comments == 0
          ? "No comments"
          : `${post.comments} comment${post.comments > 1 ? "s" : ""}`
      }}
    </p>
  </router-link>
</template>

<script>
import Icon from "../icons/Icon";
import moment from "moment";
export default {
  name: "PostOverview",
  components: { Icon },
  props: {
    post: Object,
  },
  methods: {
    getDate(d) {
      console.log(this.post);
      const date = moment(d);
      const today = moment(Date.now());
      if (date.isSame(today, "day")) return `today ${date.format("HH:mm")}`;
      if (date.isSame(today.subtract(1, "day"), "day"))
        return `yesterday ${date.format("HH:mm")}`;
      return date.format("DD.MM.YYYY");
    },
    like(event, value, postId) {
      event.stopPropagation();
      const postsOverview = this.$route.params.postId ? false : true;
      this.$store.dispatch("likePost", { value, postId, postsOverview });
    },
    deletePost(e) {
      e.stopPropagation();
      this.$store.dispatch("deletePost", {
        id: this.post.id,
        subredditName: this.post.name,
        path: this.$route.fullPath,
        router: this.$router,
      });
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    videoUrl() {
      return this.post.video_url.replace("watch?v=", "embed/");
    },
    routeName() {
      return this.$route.name;
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_mixins.scss";
.post {
  width: calc(100% - 100px);
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
    .tip {
      margin-bottom: 5px;
    }
  }

  .postContent {
    margin-top: 10px;
    line-height: 1.25;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 30px;
  }

  .postImage {
    display: block;
    margin: 25px auto;
    min-height: 150px;
    max-height: 600px;
    max-width: 100%;
    object-fit: contain;
  }

  .postVideo {
    width: 100%;
    aspect-ratio: 16 / 9;
    margin-top: 25px;
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
        fill: lighten($success, 10);
      }
    }
    .arrowDown {
      &:hover {
        fill: $error;
      }
    }
    .liked {
      .arrowUp {
        fill: lighten($success, 10);
      }
    }
    .disliked {
      .arrowDown {
        fill: $error;
      }
    }
  }

  .postDelete {
    position: absolute;
    right: 15px;
    top: 15px;

    @include breakpoint(400px) {
      top: 5px;
      right: 5px;
    }

    .deleteBtn {
      padding: 10px 15px;
      color: white;
      border-radius: 5px;
      background: $error;
      border: 0;
      cursor: pointer;

      @include breakpoint(400px) {
        font-size: 0.6em;
        padding: 5px 10px;
      }

      &:hover {
        background: darken($error, 5);
      }
    }
  }
}
</style>
