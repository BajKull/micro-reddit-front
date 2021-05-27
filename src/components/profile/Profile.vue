<template>
  <div class="profile">
    <div class="content">
      <div class="section">
        <label class="sectionTitle" for="username">Username</label>
        <input
          class="mainInputDarker"
          name="username"
          readonly
          :value="user.nickname"
        />
      </div>
      <div class="section">
        <label class="sectionTitle" for="=email">Email</label>
        <div>
          <input
            class="mainInputDarker"
            name="email"
            readonly
            :value="user.email"
          />
          <button class="mainButton" @click="changeEmail">Change email</button>
        </div>
      </div>
      <div class="section">
        <h2 class="sectionTitle">Security</h2>
        <p>You can change your password by pressing the button below.</p>
        <button class="mainSubmit" @click="changePassword">
          Change password
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  methods: {
    changeEmail() {
      this.$store.commit("setModal", "changeEmail");
    },
    changePassword() {
      this.$store.commit("setModal", "changePassword");
    },
    reRoute() {
      if (this.$store.state.user === "noUser") {
        this.$store.commit("setModal", "signIn");
        this.$router.push("/");
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted: function() {
    this.reRoute();
  },
  updated: function() {
    this.reRoute();
  },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
.profile {
  background-color: $gray;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;

  .content {
    width: 80%;
    margin: 0 auto;
    padding-top: 25px;
  }

  .section {
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;

    .sectionTitle {
      font-weight: 600;
      font-size: clamp(1.5em, 1vw, 2.25em);
      margin-bottom: 10px;
    }

    .mainInputDarker {
      width: 280px;
      margin-right: 25px;
    }

    .mainSubmit {
      margin: 10px 0;
      max-width: 300px;
    }
  }
}
</style>
