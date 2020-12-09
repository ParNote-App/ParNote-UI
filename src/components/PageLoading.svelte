<script>
  import { fade } from "svelte/transition";
</script>

<div
  class="d-flex justify-content-center align-items-center h-100 py-5"
  in:fade
  out:fade
>
  <div class="spinner-border text-primary" role="status"></div>
</div>
