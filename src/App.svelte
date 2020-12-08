<style lang="scss" global>
  @import "styles/style";
</style>

<script>
  import { onDestroy } from "svelte";
  import { isPageLoading, beforeRouteEnter } from "routve";

  import "./util/language.util";
  import Splash from "./components/Splash.svelte";

  import { checkLogin, loginStatus, LoginStates } from "./util/login.util";

  import { isPageInitialized } from "./Store";

  let showSplashAlways = false;
  let beforeRoutePath = null;

  checkLogin();

  const beforeRouteEnterUnsubscribe = beforeRouteEnter((context, next) => {
    if (beforeRoutePath !== context.pathname) isPageInitialized.set(false);

    beforeRoutePath = context.pathname;

    next();
  });

  function showSplash(
    showSplashAlways,
    loginStatus,
    isPageLoading,
    isPageInitialized
  ) {
    return (
      showSplashAlways ||
      loginStatus === LoginStates.LOADING ||
      (loginStatus === LoginStates.LOGGED_IN && !isPageInitialized)
    );
  }

  onDestroy(beforeRouteEnterUnsubscribe);
</script>

{#if showSplash(showSplashAlways, $loginStatus, $isPageLoading, $isPageInitialized)}
  <Splash />
{/if}

<!-- Main Contents Hidden -->
{#await import('./components/Main.svelte') then MainComponent}
  <svelte:component
    this="{MainComponent.default}"
    hidden="{showSplash(showSplashAlways, $loginStatus, $isPageLoading, $isPageInitialized)}"
  />
{/await}
