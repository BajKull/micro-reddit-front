<template>
  <div class="subreddits">
    <div class="landingSubreddits">
      <div class="info">
        <h1 class="subredditsTitle">
          {{ user !== "noUser" ? "Your subreddits" : "Subreddits" }}
        </h1>
        <router-link to="/r" class="secondaryButton">See all </router-link>
      </div>
      <SubredditsList />
    </div>
  </div>
</template>

<script>
import SubredditsList from "../subreddits/SubredditsList";
export default {
  name: "LandingSubreddits",
  components: { SubredditsList },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
.subreddits {
  width: 15%;
  min-width: 250px;
  margin-left: 50px;
  background-color: white;
  border-radius: 5px;
  padding: 25px;
  max-height: 50vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-track-piece:end {
    margin-bottom: 75px;
  }

  &::-webkit-scrollbar-track-piece:start {
    margin-top: 75px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 5px;
  }

  .landingSubreddits {
    .sort {
      width: initial;
      min-width: initial;
      padding: 15px 0;
      display: flex;
      justify-content: center;
    }
  }

  .info {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    .subredditsTitle {
      font-size: 1.25em;
      margin-right: 5px;
    }

    .secondaryButton {
      margin: 0;
      padding: 5px 15px;
      border-radius: 500px;
      display: flex;
      align-items: center;
      margin-left: 5px;
    }
  }

  .subreddit {
    display: flex;
    text-decoration: none;
    color: inherit;
    margin-bottom: 15px;
    background-color: $gray;
    padding: 15px 15px;
    border-radius: 5px;
    align-items: center;
    transition: background-color 0.2s;

    &:hover {
      background-color: darken($gray, 5);
    }

    .subredditInfo {
      .subredditTitle {
        font-size: 1.25em;
      }
      .subredditDesc {
        display: none;
      }
      .subredditUsers {
        font-size: 0.7em;
        color: darken($gray, 30);
      }
    }

    .subredditAvatar {
      position: relative;
      font-size: 1.25em;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background-color: $darkMain;
      color: white;
      margin-right: 30px;
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
