<script>
  import {_} from "svelte-i18n"
</script>

<main class="px-lg-5 px-3">
  <h1>{$_("pages.home.title")}</h1>
  <p class="lead">
    {$_("pages.home.description")}
  </p>
  <div class="mt-4">
    <a href="/register" class="btn btn-primary">{$_("pages.home.links.create-account")}</a>
<!--    <a href="javascript:void(0);" class="btn btn-link align-items-center">-->
<!--      <i class="far fa-compass mr-1"></i>-->
<!--      {$_("pages.home.links.discover-notes")}</a>-->
<!--  </div>-->
</main>
