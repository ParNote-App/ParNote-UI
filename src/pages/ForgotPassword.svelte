<script>
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

  export let token = null;

  const recaptchaID = writable(0);
  const data = {
    token: token,
    usernameOrEmail: "",
    recaptcha: "",
    lang: "EN"
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

<main role="main">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-auto">
        <h1 class="text-center">Reset Password</h1>
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
          <div class="form-group mb-4 ">
            <label for="usernameOrEmail" class="u-font-size-90">Username / E-mail</label>
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
            class="btn btn-lg btn-primary d-block mx-auto"
            class:disabled="{buttonsLoading}"
            disabled="{buttonsLoading}"
          >Reset Password
            <i class="fas fa-chevron-right"></i>
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
