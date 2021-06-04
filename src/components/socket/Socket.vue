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
    socket.on("deletePost", (data) => {
      console.log(data);
      console.log(this.$route);
      if (this.$route.params.postId == data.id)
        this.$router.push(`/r/${this.$route.params.id}`);
      this.$store.commit("deletePost", { id: data.id });
    });
  },
};
</script>

<style></style>
