<template>
  <div />
</template>

<script>
export default {
  name: "Socket",
  beforeMount: function() {
    const socket = this.$store.state.socket;
    socket.on("commentReceive", (data) => {
      this.$store.commit("addComment", {
        nickname: data.nickname,
        content: data.content,
      });
    });
    socket.on("deletePost", ({ id }) => {
      if (this.$route.params.postId == id) {
        this.$router.push(`/r/${this.$route.params.id}`);
        this.$store.commit("setError", {
          active: true,
          msg: "This post was deleted by a moderator.",
        });
      }
      this.$store.commit("deletePost", { id });
    });
    socket.on("deleteComment", ({ id }) => {
      this.$store.commit("deleteComment", { id });
    });
  },
};
</script>

<style></style>
