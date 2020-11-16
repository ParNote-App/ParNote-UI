export default {
  routes: {
    "/": {
      component: () => import("./pages/Home.svelte"),
    },
    "/about": {
      component: () => import("./pages/About.svelte"),
    },
    "/register": {
      component: () => import("./pages/Register.svelte"),
    },
    "/login": {
      component: () => import("./pages/Login.svelte"),
    },
    "/terms-and-policy": {
      component: () => import("./pages/TermsAndPolicy.svelte"),
    },
    "/reset-password": {
      component: () => import("./pages/ResetPassword.svelte"),
    },
    "/activate": {
      component: () => import("./pages/ActivateEmail.svelte"),
    },
    "/forgotten-password": {
      component: () => import("./pages/ForgottenPassword.svelte"),
    },
    "*": {
      component: () => import("./pages/Error404.svelte"),
    },
  },
};
