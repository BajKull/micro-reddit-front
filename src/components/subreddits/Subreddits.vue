<template>
  <div class="subredditsList">
    <div class="subredditsInfo">
      <h1 class="subredditsTitle">Subreddits</h1>
      <router-link to="/r/CreateSubreddit" class="mainButton createBig"
        >Create subreddit</router-link
      >
      <router-link to="/r/CreateSubreddit" class="mainButton createSmall"
        >+</router-link
      >
    </div>
    <div class="content">
      <SubredditsList />
    </div>
  </div>
</template>

<script>
import SubredditsList from "./SubredditsList";
export default {
  name: "Subreddits",
  components: { SubredditsList },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_mixins.scss";
.subredditsList {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto 0;
  padding: 25px 5%;
  min-height: 100vh;
  background-color: $gray;

  @include breakpoint(900px) {
    padding: 25px;
    width: calc(100% - 50px);
  }

  @include breakpoint(600px) {
    padding: 25px 5px;
    width: calc(100% - 10px);
  }

  .subredditsInfo {
    display: flex;
    justify-content: center;
    position: relative;
    margin-bottom: 25px;
    align-items: center;
    .subredditsTitle {
      text-align: center;
      justify-self: center;
      font-size: clamp(1.25em, 5vw, 3em);
    }

    .mainButton {
      position: absolute;
      right: 0;
    }

    .createBig {
      @include breakpoint(600px) {
        display: none;
      }
    }
    .createSmall {
      display: none;
      @include breakpoint(600px) {
        display: initial;
      }
    }
  }

  .content {
    width: 60%;
    margin: auto;

    @include breakpoint(900px) {
      width: 100%;
    }

    .subreddit {
      display: flex;
      align-items: center;
      margin-bottom: 25px;
      padding: 15px 30px;
      background-color: darken($gray, 5);
      transition: background-color 0.2s;
      text-decoration: none;
      color: inherit;
      border-radius: 5px;
      &:hover {
        background-color: darken($gray, 10);
      }

      @include breakpoint(900px) {
        padding: 10px;
      }

      .subredditInfo {
        display: flex;
        flex-direction: column;
        .subredditTitle {
          margin-bottom: 10px;
        }

        .subredditDesc {
          margin-bottom: 10px;

          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }

    .subredditAvatar {
      position: relative;
      font-size: 3em;
      min-width: 85px;
      min-height: 85px;
      border-radius: 50%;
      background-color: $darkMain;
      color: white;
      margin-right: 30px;

      @include breakpoint(900px) {
        min-width: 45px;
        min-height: 45px;
        font-size: 1.25em;
      }

      p {
        line-height: 0;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }
  }
}
</style>
