<template>
  <div class="subreddits">
    <div class="subredditsInfo">
      <h1 class="subredditsTitle">Subreddits</h1>
      <router-link to="/r/CreateSubreddit" class="mainButton"
        >Create subreddit</router-link
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
.subreddits {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto 0;
  padding: 25px 5%;
  min-height: 100vh;
  background-color: $gray;

  .subredditsInfo {
    display: flex;
    justify-content: center;
    position: relative;
    margin-bottom: 25px;
    align-items: center;
    .subredditsTitle {
      text-align: center;
      justify-self: center;
    }

    .mainButton {
      position: absolute;
      right: 0;
    }
  }

  .content {
    width: 60%;
    margin: auto;
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

    .subredditInfo {
      display: flex;
      flex-direction: column;
      .subredditTitle {
        margin-bottom: 10px;
        font-size: 1.75em;
      }

      .subredditDesc {
        margin-bottom: 10px;
      }

      .subredditUsers {
        font-size: 0.8em;
        color: darken($gray, 30);
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
    p {
      line-height: 0;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
}
</style>
