<template>
  <div class="searchBox">
    <div class="searchContainer" @click="search">
      <Icon iconName="search" />
    </div>
    <input
      v-model="searchText"
      class="mainInput"
      placeholder="search"
      @keydown="checkEnter"
    />
  </div>
</template>

<script>
import Icon from "../icons/Icon";
export default {
  data() {
    return {
      searchText: "",
    };
  },
  components: {
    Icon,
  },
  methods: {
    search() {
      this.$router.push(`/search/${this.searchText}`);
      this.searchText = "";
    },
    checkEnter(e) {
      if (e.key === "Enter") this.search();
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_mixins.scss";
.searchBox {
  width: calc(100% - 240px);
  display: flex;
  align-items: center;
  margin-left: 50px;
  background-color: $gray;
  height: 38px;
  border-radius: 5px;
  position: relative;

  @include breakpoint(600px) {
    width: calc(100% - 185px);
    margin-left: 25px;
  }

  .searchContainer {
    position: absolute;
    left: 0;
    width: 20px;
    height: 20px;
    padding: 9px;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;
    &:hover {
      opacity: 1;
    }
  }

  .mainInput {
    width: 100%;
    margin: 0;
    padding-left: 48px;
  }
}
</style>
