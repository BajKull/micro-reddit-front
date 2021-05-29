<template>
  <div class="createPost">
    <h1 class="createPostTitle">Create post in {{ subreddit }}</h1>
    <form @submit="post" class="mainForm" id="postForm">
      <label for="name">Post name</label>
      <input class="mainInput" v-model="name" type="text" name="name" />
      <label for="content">Post content</label>
      <textarea
        class="mainInput"
        v-model="content"
        form="postForm"
        name="content"
      />
      <label for="image"
        >Image URL - <span class="italic">Optional</span></label
      >
      <input class="mainInput" v-model="image" type="text" name="image" />
      <label for="video"
        >Video URL - <span class="italic">Optional</span></label
      >
      <input class="mainInput" v-model="video" type="text" name="video" />
      <div class="flex">
        <label for="survey">Add survey</label>
        <input type="checkbox" v-model="survey.active" name="survey" />
      </div>

      <div v-if="survey.active" class="survey">
        <label for="surveyQ">Survey question</label>
        <input
          class="mainInput"
          v-model="survey.question"
          type="text"
          name="surveyQ"
        />
        <div v-for="(answer, id) in survey.answers" :key="id" class="answer">
          <label for="surveyQ">Answer {{ id + 1 }}</label>
          <input
            class="mainInput"
            v-model="answer.answer"
            type="text"
            name="surveyQ"
            required
          />
          <div class="removeContainer" @click="removeAnswer(id)" v-if="id > 1">
            <Icon iconName="remove" />
          </div>
        </div>
        <button type="button" class="secondaryButton" @click="addAnswer">
          Add answer
        </button>
      </div>
      <input type="submit" class="mainSubmit" />
    </form>
  </div>
</template>

<script>
import Icon from "../icons/Icon";
export default {
  data() {
    return {
      name: "",
      content: "",
      image: "",
      video: "",
      survey: {
        active: false,
        question: "",
        answers: [{ answer: "" }, { answer: "" }],
      },
    };
  },
  name: "CreatePost",
  methods: {
    setError(msg) {
      this.$store.commit("setError", { active: true, msg });
    },
    post(e) {
      e.preventDefault();
      console.log(this.video);
      if (this.name.length < 3) {
        this.setError("Post name must be at least 3 characters long.");
        return;
      }
      if (this.name.length > 32) {
        this.setError("Post name can't be longer than 32 characters.");
        return;
      }
      if (this.content.length > 10000) {
        this.setError("Post content too long.");
        return;
      }
      if (this.image) {
        try {
          new URL(this.image);
          if (!this.image.match(/\.(jpeg|jpg|gif|png)$/)) {
            this.setError("Image is not a valid image URL.");
            return;
          }
        } catch (e) {
          this.setError("Image is not a valid URL.");
          return;
        }
      }
      if (
        this.video &&
        !this.video.match(
          /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
        )
      ) {
        this.setError("Video URL must be a valid youtube video URL.");
        return;
      }
      if (this.survey.active && this.survey.question.length < 3) {
        this.setError("Survey question must be at least 3 characters long.");
        return;
      }
      if (this.survey.active && this.survey.question.length > 100) {
        this.setError("Survey question can't be longer than 100 characters.");
        return;
      }
      this.$store.dispatch("createPost", {
        name: this.name,
        content: this.content,
        image: this.image ? this.image : null,
        video: this.video ? this.video : null,
        survey: this.survey.active
          ? {
              question: this.survey.question,
              answers: this.survey.answers,
            }
          : null,
        subredditId: this.$route.params.id,
      });
    },
    addAnswer() {
      this.survey.answers.push({ answer: "" });
    },
    removeAnswer(id) {
      this.survey.answers.splice(id, 1);
    },
    reRoute() {
      if (this.$store.state.user === "noUser") {
        const id = this.$route.params.id;
        this.$store.commit("setModal", "signIn");
        this.$router.push(`/r/${id}`);
      }
    },
  },
  components: {
    Icon,
  },
  computed: {
    subreddit() {
      return this.$route.params.id;
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
.createPost {
  width: 30%;
  min-width: 500px;
  margin: auto;

  .createPostTitle {
    text-align: center;
    margin-bottom: 25px;
    margin-top: 75px;
  }

  .italic {
    font-style: italic;
    font-weight: 300;
    color: rgb(180, 180, 180);
  }

  .flex {
    display: flex;
    align-items: center;

    input {
      margin-left: 15px;
      margin-bottom: 5px;
    }
  }

  form {
    display: flex;
    flex-direction: column;

    textarea {
      resize: vertical;
      min-height: 18px;
    }
    .survey,
    .answer {
      display: flex;
      flex-direction: column;
    }
    .survey {
      overflow-y: auto;
      overflow-x: hidden;
      max-height: 300px;
      padding: 50px 0;

      input {
        width: calc(100% - 65px);
      }

      .secondaryButton {
        margin: 25px auto 0;
      }

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
    }

    .answer {
      position: relative;
      .removeContainer {
        position: absolute;
        width: 32px;
        height: 32px;
        top: 46px;
        transform: translateY(-50%);
        right: 5px;
        cursor: pointer;
      }
      .remove {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
