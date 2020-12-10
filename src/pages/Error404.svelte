<script>
  import { onMount } from "svelte";
  import { isPageInitialized } from "../Store";

  onMount(() => {
    isPageInitialized.set(true);
  });
</script>

<div class="container py-4">
  <h4 class="font-weight-bolder">Error: 404</h4>
  <p>Page not found.</p>
  <hr />
  <a href="/" class="btn btn-primary">Go back</a>
</div>
