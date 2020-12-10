<script context="module">
  import {_} from "svelte-i18n"
  import jQuery from "jquery";
  import {writable} from "svelte/store"

  const id = "successAlert";
  let message = writable("");

  export function show(successCode) {
    message.set(successCode);
    jQuery("#" + id).fadeIn("slow");
  }

  export function hide() {
    jQuery("#" + id).fadeOut("fast");
  }
</script>

<div id="{id}" class="alert border border-success text-success display-none" role="alert">
  <div class="d-flex">
    <div class="alert__icon mr-3">
      <i class="fas fa-exclamation-circle"></i>
    </div>

    <div class="align-self-center mr-3">
      {$_("success-codes."+$message)}
    </div>

    <div class="ml-auto">
      <button
        type="button"
        class="alert__close alert__close--light"
        aria-label="{$_('close')}"
        on:click={hide}
      >
        <span aria-hidden="true" class="text-success">×</span>
      </button>
    </div>
  </div>
</div>
