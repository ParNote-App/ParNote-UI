export default {
  routes: {
    "/": {
      component: () => import("./pages/loggedIn/Home.svelte"),
    },
    "/settings": {
      component: () => import("./pages/loggedIn/Settings.svelte"),
    },
    "*": {
      component: () => import("./pages/Error404.svelte"),
    },
  },
};
