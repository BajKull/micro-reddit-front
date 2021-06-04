<template>
  <div class="modal" @mousedown="close">
    <div class="content">
      <div class="closeContainer" @click="close">
        <Icon iconName="close" />
      </div>
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
        e.currentTarget.classList.contains("closeContainer")
      )
        this.$store.commit("setModal", "");
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
.modal {
  position: fixed;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;

  .content {
    position: relative;
    width: clamp(300px, 30%, 400px);
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 10px;
    padding: 25px;

    h1 {
      text-align: center;
      margin-bottom: 15px;
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
  .closeContainer {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 24px;
    height: 24px;
  }
  .close {
    width: 24px;
    height: 24px;
    stroke: black;
    cursor: pointer;
  }
}
</style>
