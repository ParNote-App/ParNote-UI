<script context="module">
  import { _ } from "svelte-i18n";
  import jQuery from "jquery";
  import { writable } from "svelte/store";

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

<div
  id="{id}"
  class="alert border border-danger text-danger display-none"
  role="alert"
>
  <div class="d-flex">
    <div class="alert__icon mr-3">
      <i class="fas fa-exclamation-circle"></i>
    </div>

    <div class="align-self-center mr-3">{$_('error-codes.' + $error)}</div>

    <div class="ml-auto">
      <button
        type="button"
        class="alert__close alert__close--light"
        aria-label="{$_('close')}"
        on:click="{hide}"
      >
        <span aria-hidden="true" class="text-danger">×</span>
      </button>
    </div>
  </div>
</div>
