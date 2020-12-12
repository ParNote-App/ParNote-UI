<script>
  import {_} from "svelte-i18n"
</script>

<main role="main" class="mx-5">
  <div class="container">
    <div class="row">
      <div class="col-auto">
        <h1 class="text-center mb-5">{$_("pages.about.title")}</h1>

        <p class="lead">
          {$_("pages.about.body")}
        </p>
      </div>
    </div>
  </div>
</main>