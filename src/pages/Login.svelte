<script>
  import { _ } from "svelte-i18n";
  import { get, writable } from "svelte/store";

  import ErrorAlert, {
    hide as hideError,
    show as showError,
  } from "../components/ErrorAlert.svelte";

  import Recaptcha, {
    execute as executeRecaptcha,
    reset as resetRecaptcha,
  } from "../components/Recaptcha.svelte";

  import ApiUtil, { NETWORK_ERROR } from "../util/api.util";
  import { convertLocale } from "../util/language.util";
  import { setLoggedIn } from "../util/login.util";

  import { route } from "routve";

  const recaptchaID = writable(0);
  const data = {
    usernameOrEmail: "",
    password: "",
    rememberMe: false,
    recaptcha: "",
    lang: "EN",
  };

  let buttonsLoading = false;

  function submit() {
    buttonsLoading = true;

    hideError();
    resetRecaptcha(get(recaptchaID));
    executeRecaptcha(get(recaptchaID));
  }

  function recaptchaCallback(event) {
    data.recaptcha = event.detail.token;

    login();
  }

  function recaptchaErrorCallback() {
    hideError();

    buttonsLoading = false;

    showError(NETWORK_ERROR);
  }

  function login() {
    data.lang = convertLocale();

    ApiUtil.post("auth/login", data)
      .then((response) => {
        if (response.data.result === "ok") {
          setLoggedIn();
          window.location = "/";
        } else {
          const errorCode = response.data.error;

          showError(errorCode);

          buttonsLoading = false;
        }
      })
      .catch((error) => {
        showError(NETWORK_ERROR);

        buttonsLoading = false;
      });
  }
</script>

<h2 class="text-center mb-4">{$_('pages.login.title')}</h2>

<form class="homepage-form" on:submit|preventDefault="{submit}">
  <ErrorAlert />

  <div class="form-group mb-4">
    <label for="usernameOrEmail" class="u-font-size-90">
      {$_('pages.login.form.username-or-email')}
    </label>
    <input
      type="text"
      class="form-control"
      id="usernameOrEmail"
      aria-describedby="usernameOrEmail"
      bind:value="{data.usernameOrEmail}"
    />
  </div>

  <div class="form-group mb-4">
    <label for="password" class="u-font-size-90">{$_('pages.login.form.password')}</label>
    <input
      type="password"
      class="form-control"
      id="password"
      aria-describedby="password"
      bind:value="{data.password}"
    />
  </div>

  <div class="custom-control custom-checkbox mb-2">
    <input
      type="checkbox"
      class="custom-control-input"
      id="termsBox"
      bind:checked="{data.rememberMe}"
    />
    <label class="custom-control-label u-font-size-90" for="termsBox">
      {$_('pages.login.form.remember-me')}
    </label>
  </div>

  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-auto pl-0">
        <button
          type="submit"
          class="btn btn-primary"
          class:disabled="{buttonsLoading}"
          disabled="{buttonsLoading}"
        >{$_('pages.login.form.login')}
          <i class="fas fa-chevron-right ml-2"></i>
        </button>
      </div>
      <div class="col-auto pr-0">
        <a
          href="/register"
          class="btn btn-link"
          class:disabled="{buttonsLoading}"
          disabled="{buttonsLoading}"
        >{$_('pages.login.form.create-account')}
        </a>
      </div>
    </div>
    <hr />
    <div class="container-fluid mt-3">
      <div class="row justify-content-center">
        <div class="col-auto text-center mt-3">
          <a
            href="/forgot-password"
            class="btn btn-outline-primary btn-sm"
            class:disabled="{buttonsLoading}"
            disabled="{buttonsLoading}"
          >{$_('pages.login.form.forgot-password')}
          </a>
        </div>
      </div>
    </div>
  </div>
  <Recaptcha
    recaptchaID="{recaptchaID}"
    on:callback="{recaptchaCallback}"
    on:errorCallback="{recaptchaErrorCallback}"
  />
</form>
