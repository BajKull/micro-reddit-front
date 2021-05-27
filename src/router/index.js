import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "LandingView",
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
    path: "/r/:id",
    name: "Subreddit",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/components/subreddits/Subreddit.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
