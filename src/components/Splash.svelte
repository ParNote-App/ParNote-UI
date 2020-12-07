<script>
  import { fade } from "svelte/transition";
</script>

<div class="d-flex justify-content-center align-items-center min-vh-100 w-100" role="status" in:fade out:fade>
  <img
    class="animated fadeIn infinite slow"
    alt="ParNote"
    src="/assets/img/logo.svg"
    width="48"
  />
</div>
