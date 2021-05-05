export default {
  routes: {
    "/": {
      component: () => import("./pages/loggedIn/Home.svelte"),
    },
    "/settings": {
      component: () => import("./pages/loggedIn/Settings.svelte"),
    },
    "/shared-note/:token": {
      component: () => import("./pages/loggedIn/SharedNote.svelte"),
    },
    "*": {
      component: () => import("./pages/Error404.svelte"),
    },
  },
};
