<style lang="scss" global>
  @import "styles/style";
</style>

<script>
  import { onMount, onDestroy } from "svelte";
  import { beforeRouteEnter } from "routve";

  import "./util/language.util";
  import Splash from "./components/Splash.svelte";

  import { checkLogin, loginStatus, LoginStates } from "./util/login.util";

  import { isPageInitialized } from "./Store";

  let showSplashAlways = false;
  let beforeRoutePath = null;
  let waitAnimation = true;

  checkLogin();

  const beforeRouteEnterUnsubscribe = beforeRouteEnter((context, next) => {
    if (beforeRoutePath !== context.pathname) isPageInitialized.set(false);

    beforeRoutePath = context.pathname;

    next();
  });

  function showSplash(showSplashAlways, loginStatus, isPageInitialized, waitAnimation) {
    return (
      showSplashAlways ||
      loginStatus === LoginStates.LOADING ||
      (loginStatus === LoginStates.LOGGED_IN && !isPageInitialized) ||
      waitAnimation
    );
  }

  onMount(async () => {
    setTimeout(function () {
      waitAnimation = false;
    }, 1500);
  });

  onDestroy(beforeRouteEnterUnsubscribe);
</script>

{#if showSplash(showSplashAlways, $loginStatus, $isPageInitialized, waitAnimation)}
  <Splash />
{/if}

<!-- Main Contents Hidden -->
{#await import('./components/Main.svelte') then MainComponent}
  <svelte:component
    this="{MainComponent.default}"
    hidden="{showSplash(showSplashAlways, $loginStatus, $isPageInitialized, waitAnimation)}"
  />
{/await}
