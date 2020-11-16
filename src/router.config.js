export default {
  routes: {
    "/": {
      component: () => import("./pages/Home.svelte"),
    },
    "/about": {
      component: () => import("./pages/About.svelte"),
    },
    "*": {
      component: () => import("./pages/Error404.svelte"),
    },
  },
};
