<script context="module">
  import jQuery from "jquery";

  const id = "errorAlert";

  export function show(error) {
    jQuery("#" + id).fadeIn("slow");
  }
</script>

<div id="{id}" class="alert bg-danger text-white display-none" role="alert">
  <div class="d-flex">
    <div class="alert__icon mr-3">
      <i class="fas fa-exclamation-circle"></i>
    </div>

    <div class="align-self-center mr-3">
      This is a primary alert — check it out!
    </div>

    <div class="ml-auto">
      <button
        type="button"
        class="alert__close alert__close--light"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  </div>
</div>
