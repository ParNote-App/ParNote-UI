import Home from "./pages/loggedIn/Home.svelte"

export default {
  routes: {
    "/": {
      component: Home,
    },
    "*": {
      component: () => import("./pages/loggedIn/Error404.svelte"),
    },
  },
};
