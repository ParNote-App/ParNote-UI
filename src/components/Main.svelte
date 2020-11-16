<script>
  import Router from "routve";
  import RouterConfig from "../router.config";

  import LeftHeader from "./LeftHeader.svelte";
  import RightHeader from "./RightHeader.svelte";
</script>

<div class="container-fluid h-100">
  <div class="row h-100">
    <div class="col">
      <LeftHeader/>
    </div>
    <div class="col bg-light-primary">
      <RightHeader/>
    </div>
  </div>
</div>

<Router routerConfig="{RouterConfig}"/>