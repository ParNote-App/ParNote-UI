<script>
  import Router from "routve";

  import { loginStatus, LoginStates } from "../util/login.util";

  import RouterConfig from "../router.config";
  import RouterConfigLoggedIn from "../router.config.loggedIn";

  import Header from "./Header.svelte";
  import RightFooter from "./RightFooter.svelte";

  export let hidden;
</script>

{#if $loginStatus === LoginStates.LOGGED_OUT}
<Header />

<div class="container-fluid h-100">
  <div class="row h-100">
    <div
      class="col-lg-6 col-12 h-100 d-flex h-100 flex-column justify-content-center"
    >
      <Router routerConfig="{RouterConfig}" />
    </div>
    <div class="col-6 h-100 bg-primary d-md-flex d-none"></div>
  </div>
</div>
{/if}
{#if $loginStatus === LoginStates.LOGGED_IN}
  <Router routerConfig="{RouterConfigLoggedIn}" />
{/if}
