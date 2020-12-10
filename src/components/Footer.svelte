<script>
  import {_} from "svelte-i18n"
</script>

<footer class="mt-auto pb-3 fixed-bottom">
  <nav class="navbar navbar-expand">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link text-primary" href="/about">{$_("footer.about")}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-primary" href="/terms-and-policy">{$_("footer.terms")}</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link text-primary"
          href="mailto:contact@parnote.me"
          target="_blank"
        >{$_("footer.contact")}</a>
      </li>
    </ul>

    <div class="navbar-nav flex-row ml-auto nav-login-colors-link">
      ParNote © 2020
    </div>
  </nav>
</footer>
