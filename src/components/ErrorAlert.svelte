<script context="module">
  import jQuery from "jquery";
  import {writable} from "svelte/store"

  const id = "errorAlert";
  let error = writable("");

  export function show(errorCode) {
    error.set(errorCode);
    jQuery("#" + id).fadeIn("slow");
  }

  export function hide() {
    jQuery("#" + id).fadeOut("fast");
  }
</script>

<div id="{id}" class="alert bg-danger text-white display-none" role="alert">
  <div class="d-flex">
    <div class="alert__icon mr-3">
      <i class="fas fa-exclamation-circle"></i>
    </div>

    <div class="align-self-center mr-3">
      {$error}
    </div>

    <div class="ml-auto">
      <button
        type="button"
        class="alert__close alert__close--light"
        aria-label="Close"
        on:click={hide}
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  </div>
</div>
