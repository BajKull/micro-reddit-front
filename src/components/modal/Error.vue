<template>
  <transition name="fromBottom">
    <div class="error" v-if="error.active">
      <div class="content">
        <div class="closeContainer" @click="closeError">
          <Icon iconName="close" />
        </div>
        <p class="errorMsg">{{ error.msg }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
import Icon from "../icons/Icon";
export default {
  name: "Error",
  components: { Icon },
  computed: {
    error() {
      return this.$store.state.error;
    },
  },
  methods: {
    closeError() {
      this.$store.commit("closeError");
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
.error {
  position: fixed;
  z-index: 999;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: $error;
  border-radius: 3px;
  .content {
    position: relative;
    padding: 15px 35px;

    .closeContainer {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 16px;
      height: 16px;
    }
    .close {
      width: 16px;
      height: 16px;
      cursor: pointer;
      stroke: white;
    }

    .errorMsg {
      color: white;
    }
  }
}
</style>
