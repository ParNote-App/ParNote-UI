<script>
  import Router from "routve";
  import RouterConfig from "../router.config";

  import Header from "./Header.svelte";
  import RightFooter from "./RightFooter.svelte";

  export let hidden;
</script>

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
