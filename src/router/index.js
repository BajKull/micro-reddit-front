import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () =>
      import(
        /* webpackChunkName: "Landing" */ "@/components/landing/Landing.vue"
      ),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/components/profile/Profile.vue"
      ),
  },
  {
    path: "/r",
    name: "Subreddits",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/components/subreddits/Subreddits.vue"
      ),
  },
  {
    path: "/r/createSubreddit",
    name: "CreateSubreddit",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/components/subreddits/CreateSubreddit.vue"
      ),
  },
  {
    path: "/r/:id",
    name: "Subreddit",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/components/subreddits/Subreddit.vue"
      ),
  },
  {
    path: "/r/:id/:postId",
    name: "SubredditPost",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/components/subreddits/Post.vue"
      ),
  },
  {
    path: "/r/:id/createPost",
    name: "CreatePost",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/components/subreddits/CreatePost.vue"
      ),
  },
  {
    path: "/search/:id",
    name: "Search",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/components/search/Search.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
