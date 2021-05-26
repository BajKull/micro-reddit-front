<template>
  <div class="modal" @mousedown="close">
    <div class="content">
      <Icon class="close" iconName="close" @click="close" />
      <slot />
    </div>
  </div>
</template>

<script>
import Icon from "../icons/Icon.vue";
export default {
  name: "Modal",
  components: {
    Icon,
  },
  methods: {
    close(e) {
      if (
        e.target.classList.contains("modal") ||
        e.target.classList.contains("close")
      )
        this.$store.commit("setModal", "");
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.modal {
  position: absolute;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    position: relative;
    width: clamp(300px, 30%, 400px);
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 10px;
    padding: 25px;

    form {
      display: flex;
      flex-direction: column;

      input {
        background: $gray;
        border: 0;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
      }

      input[type="submit"] {
        background: $main;
        color: white;
        font-weight: 700;
        width: 50%;
        margin: 25px auto 10px auto;
        display: block;
        cursor: pointer;
        transition: background-color 0.2s;
        &:hover {
          background: darken($main, 5);
        }
      }

      label {
        text-align: left;
        margin-bottom: 5px;
        font-weight: 600;
      }
    }

    .underline {
      text-decoration: underline;
      cursor: pointer;
      color: #666;
      transition: color 0.2s;
      &:hover {
        color: #000;
      }
    }
  }
  .close {
    width: 24px;
    height: 24px;
    stroke: black;
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
  }
}
</style>
