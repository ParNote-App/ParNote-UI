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

  export let token = null;

  const recaptchaID = writable(0);
  const data = {
    newPassword: "",
    newPasswordRepeat: "",
    token: token,
    recaptcha: "",
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
    ApiUtil.post("auth/resetPassword", data)
      .then((response) => {
        if (response.data.result === "ok") {
          showSuccess("PASSWORD_CHANGED_SUCCESSFULLY");
        } else {
          const errorCode = response.data.error;

          showError(errorCode);

          buttonsLoading = false;
        }
      })
      .catch(() => {
        showError(NETWORK_ERROR);

        buttonsLoading = false;
      });
  }
</script>

<main role="main">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-auto">
        <h1 class="text-center">{$_("pages.reset-password.title")}</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-6">
        <SuccessAlert />
        <ErrorAlert />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-5">
        <form on:submit|preventDefault="{submit}">
          <div class="form-group mt-4">
            <label for="newPassword" class="u-font-size-90">{$_("pages.reset-password.form.new-password")}</label>
            <input
              type="password"
              class="form-control"
              id="newPassword"
              aria-describedby="newPassword"
              bind:value="{data.newPassword}"
            />
          </div>

          <div class="form-group mt-4">
            <label for="newPasswordRepeat" class="u-font-size-90">{$_("pages.reset-password.form.new-password-repeat")}</label>
            <input
              type="password"
              class="form-control"
              id="newPasswordRepeat"
              aria-describedby="newPasswordRepeat"
              bind:value="{data.newPasswordRepeat}"
            />
          </div>

          <button
            type="submit"
            class="btn btn-lg btn-primary d-block mx-auto mt-4"
            class:disabled="{buttonsLoading}"
            disabled="{buttonsLoading}"
          >{$_("pages.reset-password.form.reset-password")}
          </button>

          <Recaptcha
            recaptchaID="{recaptchaID}"
            on:callback="{recaptchaCallback}"
            on:errorCallback="{recaptchaErrorCallback}"
          />
        </form>
      </div>
    </div>
  </div>
</main>
