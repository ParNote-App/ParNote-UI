<script>
  import { get, writable } from "svelte/store";

  import Recaptcha, {
    execute as executeRecaptcha,
    reset as resetRecaptcha,
  } from "../components/Recaptcha.svelte";
  import ApiUtil, { NETWORK_ERROR } from "../util/api.util";
  import SuccessAlert, {
    hide as hideSuccess,
    show as showSuccess,
  } from "../components/SuccessAlert.svelte";
  import ErrorAlert, {
    hide as hideError,
    show as showError,
  } from "../components/ErrorAlert.svelte";

  export let token = null;

  const recaptchaID = writable(0);
  const data = {
    token: token,
    recaptcha: "",
  };

  console.log(token)

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

    verifyEmail();
  }

  function recaptchaErrorCallback() {
    hideSuccess();
    hideError();

    buttonsLoading = false;

    showError(NETWORK_ERROR);
  }

  function verifyEmail() {
    ApiUtil.post("auth/emailVerification", data)
      .then((response) => {
        if (response.data.result === "ok") {
          showSuccess("EMAIL_VERIFIED_SUCCESSFULLY");
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
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-8 text-center">
        <h1><strong>Verify E-Mail</strong></h1>

        <SuccessAlert />
        <ErrorAlert />

        <h4>To login your account please verify your E-Mail address.</h4>

        <form on:submit|preventDefault="{submit}">
          <button
            type="submit"
            class="btn btn-primary btn-lg m-3"
            class:disabled="{buttonsLoading}"
            disabled="{buttonsLoading}"
          >Verify My E-Mail</button>
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
