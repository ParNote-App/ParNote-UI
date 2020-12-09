<script>
  import { _, locales, locale as currentLocale } from "svelte-i18n";

  import { loginStatus, LoginStates } from "../util/login.util";
</script>

<nav class="navbar navbar-expand-md navbar-light bg-transparent py-3 fixed-top">
  <div class="nav-item mr-3">
    <a
      href="{$loginStatus === LoginStates.LOGGED_OUT ? '/' : 'javascript:void(0);'}"
      on:click="{() => ($loginStatus === LoginStates.LOGGED_OUT ? void 0 : (window.location = '/'))}"
    >
      <img src="/assets/img/logo.svg" alt="ParNote Logo" />
    </a>
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
        href="javascript:void(0);"
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
      {#if $loginStatus !== LoginStates.LOGGED_IN}
        <a
          role="button"
          href="/login"
          class="btn btn-outline-light d-flex align-items-center nav-login-colors-btn"
          class:disabled="{$loginStatus === LoginStates.LOADING}"
          disabled="{$loginStatus === LoginStates.LOADING}"
        ><i class="far fa-user fa-xs mr-2"></i>
          Login
          <i class="fas fa-chevron-right fa-xs ml-2"></i>
        </a>
      {/if}
    </li>
  </ul>
</nav>
