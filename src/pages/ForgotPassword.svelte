<script>
  import {_} from "svelte-i18n"
  import { get, writable } from "svelte/store";

  import SuccessAlert, {
    hide as hideSuccess,
    show as showSuccess,
  } from "../components/SuccessAlert.svelte";
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

  const recaptchaID = writable(0);
  const data = {
    usernameOrEmail: "",
    recaptcha: "",
    lang: "EN",
  };

  let buttonsLoading = false;

  function submit() {
    buttonsLoading = true;

    hideError();
    hideSuccess();
    resetRecaptcha(get(recaptchaID));
    executeRecaptcha(get(recaptchaID));
  }

  function recaptchaCallback(event) {
    data.recaptcha = event.detail.token;

    resetPassword();
  }

  function recaptchaErrorCallback() {
    hideSuccess();
    hideError();

    buttonsLoading = false;

    showError(NETWORK_ERROR);
  }

  function resetPassword() {
    data.lang = convertLocale();

    ApiUtil.post("auth/forgotPassword", data)
      .then((response) => {
        if (response.data.result === "ok") {
          showSuccess("EMAIL_SENT_SUCCESSFULLY");
        } else {
          const errorCode = response.data.error;

          showError(errorCode);
        }

        buttonsLoading = false;
      })
      .catch(() => {
        showError(NETWORK_ERROR);

        buttonsLoading = false;
      });
  }
</script>

<h2 class="text-center mb-4">{$_("pages.forgot-password.title")}</h2>

<form class="homepage-form" on:submit|preventDefault="{submit}">
  <SuccessAlert />
  <ErrorAlert />
  <div class="form-group mb-4 ">
    <label for="usernameOrEmail" class="u-font-size-90">{$_("pages.forgot-password.form.username-or-email")}</label>
    <input
      type="text"
      class="form-control"
      id="usernameOrEmail"
      aria-describedby="usernameOrEmail"
      bind:value="{data.usernameOrEmail}"
    />
  </div>

  <button
    type="submit"
    class="btn btn-primary d-block mx-auto"
    class:disabled="{buttonsLoading}"
    disabled="{buttonsLoading}"
  >{$_("pages.forgot-password.form.reset-password")}
    <i class="fas fa-chevron-right ml-2"></i>
  </button>

  <Recaptcha
    recaptchaID="{recaptchaID}"
    on:callback="{recaptchaCallback}"
    on:errorCallback="{recaptchaErrorCallback}"
  />
</form>
