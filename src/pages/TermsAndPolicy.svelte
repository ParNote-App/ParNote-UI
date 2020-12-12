<script>
  import { _ } from "svelte-i18n";
</script>

<main class="px-lg-5 px-3 text-center">
  <h1>{$_('pages.terms-and-policy.title')}</h1>
  <p>{$_('pages.terms-and-policy.body')}</p>

  <p>
    This site is protected by reCAPTCHA and the Google
    <a href="https://policies.google.com/privacy" target="_blank">Privacy Policy</a>
    and
    <a href="https://policies.google.com/terms" target="_blank">Terms of Service</a>
    apply.
  </p>
</main>
