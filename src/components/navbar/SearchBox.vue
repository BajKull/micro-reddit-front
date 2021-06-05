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
      if (this.searchText.length < 3) {
        this.$store.commit("setError", {
          active: true,
          msg: "You need to search for at least 3 characters.",
        });
        return;
      }
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
  width: calc(100% - 290px);
  display: flex;
  align-items: center;
  background-color: $gray;
  height: 38px;
  border-radius: 5px;
  position: relative;

  @include breakpoint(600px) {
    width: calc(100% - 215px);
    font-size: 0.8em;
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

    @include breakpoint(600px) {
      width: 15px;
      height: 15px;
      padding: 14px 9px;
    }
  }

  .mainInput {
    width: 100%;
    margin: 0;
    padding-left: 48px;

    @include breakpoint(600px) {
      padding-left: 38px;
    }
  }
}
</style>
