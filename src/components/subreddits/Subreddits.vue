<template>
  <div class="subreddits">
    <div class="subredditsInfo">
      <h1 class="subredditsTitle">Subreddits</h1>
      <button class="mainButton">Create subreddit</button>
    </div>
    <router-link
      :to="`/r/${subreddit.name}`"
      class="subreddit"
      v-for="subreddit in $store.state.subreddits"
      :key="subreddit.id"
    >
      <div class="subredditAvatar">
        <p>{{ subreddit.name[0] }}</p>
      </div>
      <div class="subredditInfo">
        <h2 class="subredditTitle">{{ subreddit.name }}</h2>
        <p class="subredditDesc">{{ subreddit.description }}</p>
        <p class="subredditUsers">{{ subreddit.users }} users</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Subreddits",
  beforeMount: function() {
    this.$store.dispatch("getSubreddits");
  },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
.subreddits {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 25px auto 0;
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

  .subreddit {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    padding: 15px 30px;
    background-color: darken($gray, 5);
    transition: background-color 0.2s;
    text-decoration: none;
    color: inherit;
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
        margin-bottom: 5px;
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
    width: 85px;
    height: 85px;
    border-radius: 50%;
    background-color: $secondary;
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
