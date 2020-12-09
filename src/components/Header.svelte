<script>
  import { _, locales, locale as currentLocale } from "svelte-i18n";
</script>

<nav
  class="navbar navbar-expand-md navbar-light bg-transparent py-3 px-4 fixed-top"
>
  <div class="nav-item mr-3">
    <a href="/"> <img src="/assets/img/logo.svg" alt="Parnote Logo" /> </a>
  </div>

  <a
    class="nav-link text-primary d-flex align-items-center"
    href="https://github.com/ParNote-App"
    target="_blank"
  ><i class="fab fa-github mr-2"></i>
    GitHub</a>

  <ul class="navbar-nav flex-row ml-auto">
    <li class="nav-item dropdown">
      <a
        class="nav-link nav-login-colors-link"
        href="#"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {$_('language-name')}
        <i class="fas fa-angle-down"></i>
      </a>
      <div
        class="dropdown-menu position-absolute"
        aria-labelledby="navbarDropdown"
      >
        {#each $locales as locale}
          <a
            class="dropdown-item text-primary"
            href="javascript:void(0);"
            class:font-weight-bold="{$currentLocale
              .toLowerCase()
              .startsWith(locale)}"
            on:click="{() => currentLocale.set(locale)}"
          >{$_('language-name', { locale })}</a>
        {/each}
      </div>
    </li>
    <li class="nav-item ml-3">
      <a
        role="button"
        href="/login"
        class="btn btn-outline-light d-flex align-items-center nav-login-colors-btn"
      ><i class="far fa-user fa-xs mr-2"></i>
        Login
        <i class="fas fa-chevron-right fa-xs ml-2"></i>
      </a>
    </li>
  </ul>
</nav>
