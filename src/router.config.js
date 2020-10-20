export default {
  routes: {
    "/": {
      component: () => import("./pages/Home.svelte"),
    },
    "*": {
      component: () => import("./pages/Error404.svelte"),
    },
  },
};
