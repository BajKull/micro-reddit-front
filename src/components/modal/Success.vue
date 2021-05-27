<template>
  <transition name="fromBottom">
    <div class="success" v-if="success.active">
      <div class="content">
        <Icon iconName="close" class="close" @click="closeSuccess" />
        <p class="successMsg">{{ success.msg }}</p>
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
    success() {
      return this.$store.state.success;
    },
  },
  methods: {
    closeSuccess() {
      this.$store.commit("closeSuccess");
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
.success {
  position: absolute;
  z-index: 999;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: $success;
  border-radius: 3px;
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

    .successMsg {
      color: white;
    }
  }
}
</style>
