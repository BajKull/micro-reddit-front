<template>
  <transition name="fromBottom">
    <div class="error" v-if="error.active">
      <div class="content">
        <Icon iconName="close" class="close" @click="closeError" />
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
  position: absolute;
  z-index: 999;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: $error;
  border-radius: 5px;
  border-left: 5px solid darken($error, 15);
  .content {
    position: relative;
    padding: 15px 35px;

    .close {
      position: absolute;
      top: 5px;
      right: 5px;
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
