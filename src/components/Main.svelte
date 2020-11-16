<script>
  import Router from "routve";
  import RouterConfig from "../router.config";

  import LeftHeader from "./LeftHeader.svelte";
  import RightHeader from "./RightHeader.svelte";
  import LeftFooter from "./LeftFooter.svelte";
  import RightFooter from "./RightFooter.svelte";
</script>

<div class="container-fluid h-100">
  <div class="row h-100">
    <div class="col-lg d-flex h-100 container flex-column">
      <div class="mb-auto">
        <LeftHeader />
      </div>

      <Router routerConfig="{RouterConfig}" />

      <LeftFooter />
    </div>
    <div class="col-lg bg-light-primary d-flex h-100 container flex-column">
      <RightHeader />
      <RightFooter />
    </div>
  </div>
</div>
