<template>
  <div class="comments">
    <h3 class="commentsTitle">Comments</h3>
    <div class="commentsAdd">
      <input
        class="mainInput"
        v-model="commentText"
        placeholder="Add comment"
        @keydown="checkEnter"
      />
      <button class="mainButton" @click="sendComment">Add comment</button>
    </div>
    <div class="comment" v-for="comment in comments" :key="comment.id">
      <p class="commentAuthor">{{ comment.nickname }}</p>
      <p class="commentContent">{{ comment.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentText: "",
    };
  },
  name: "Comments",
  methods: {
    checkEnter(e) {
      if (e.key === "Enter") this.sendComment();
    },
    sendComment() {
      const user = this.$store.state.user;
      if (!user || user === "noUser") {
        this.$store.commit("setError", {
          active: true,
          msg: "In order to add a comment you need to be signed in.",
        });
        return;
      }
      if (this.commentText.length === 0) {
        this.$store.commit("setError", {
          active: true,
          msg: "Comment can not be empty.",
        });
        return;
      }
      const postId = this.$route.params.postId;
      const path = this.$route.fullPath;
      this.$store.commit("addComment", {
        nickname: user.username,
        content: this.commentText,
      });
      this.$store.state.socket.emit("commentSend", {
        path,
        user,
        content: this.commentText,
        postId,
      });
      this.commentText = "";
    },
  },
  props: { comments: Object },
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
.comments {
  width: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 25px;
  border-radius: 5px;

  .commentsAdd {
    width: 100%;
    margin: 25px 0;

    .mainInput {
      width: calc(100% - 20px);
    }

    .mainButton {
      display: block;
      margin-left: auto;
    }
  }

  .comment {
    display: flex;
    flex-direction: column;
    width: calc(100% - 50px);
    padding: 15px 25px;
    background-color: $gray;
    border-radius: 5px;
    margin-bottom: 10px;

    .commentAuthor {
      font-size: 0.85em;
      color: rgb(100, 100, 100);
    }
  }
}
</style>
