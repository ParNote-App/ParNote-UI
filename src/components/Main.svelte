<script>
  import Router from "routve";
  import RouterConfig from "../router.config";

  import LeftHeader from "./LeftHeader.svelte";
  import RightHeader from "./RightHeader.svelte";
  import LeftFooter from "./LeftFooter.svelte";
</script>

<div class="container-fluid h-100">
  <div class="row h-100">
    <div class="col d-flex h-100 container flex-column">
      <div class="mb-auto">
        <LeftHeader />
      </div>

      <Router routerConfig="{RouterConfig}" />

      <LeftFooter />
    </div>
    <div class="col bg-light-primary">
      <RightHeader />
    </div>
  </div>
</div>
