<script>
  import { get, writable } from "svelte/store";

  import ApiUtil, { NETWORK_ERROR } from "../util/api.util";

  import { convertLocale } from "../util/language.util"

  import Recaptcha, {
    execute as executeRecaptcha,
    reset as resetRecaptcha,
  } from "../components/Recaptcha.svelte";
  import ErrorAlert, {
    hide as hideError,
    show as showError,
  } from "../components/ErrorAlert.svelte";
  import SuccessAlert, {
    hide as hideSuccess,
    show as showSuccess,
  } from "../components/SuccessAlert.svelte";

  const recaptchaID = writable(0);
  const data = {
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    termsBox: false,
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

    register();
  }

  function recaptchaErrorCallback() {
    hideSuccess();
    hideError();

    buttonsLoading = false;

    showError(NETWORK_ERROR);
  }

  function register() {
    data.lang = convertLocale();

    ApiUtil.post("auth/register", data)
      .then((response) => {
        if (response.data.result === "ok") {
          showSuccess("REGISTERED_SUCCESSFULLY_CHECK_YOUR_EMAIL");
        } else {
          const errorCode = response.data.error;

          showError(errorCode);
        }

        buttonsLoading = false;
      })
      .catch((error) => {
        showError(NETWORK_ERROR);

        buttonsLoading = false;
      });
  }
</script>

<h2 class="text-center mb-4">Create an Account</h2>
<form class="homepage-form" on:submit|preventDefault="{submit}">
  
  <SuccessAlert />
  <ErrorAlert />

  <div class="row">
    <div class="col-6">
      <div class="form-group mb-4">
        <label for="name" class="u-font-size-90">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          aria-describedby="name"
          bind:value="{data.name}"
        />
      </div>
    </div>
    <div class="col-6">
      <div class="form-group mb-4">
        <label for="surname" class="u-font-size-90">Surname</label>
        <input
          type="text"
          class="form-control"
          id="surname"
          aria-describedby="surname"
          bind:value="{data.surname}"
        />
      </div>
    </div>
  </div>

  <div class="form-group mb-4">
    <label for="username" class="u-font-size-90">Username</label>
    <input
      type="text"
      class="form-control"
      id="username"
      aria-describedby="username"
      bind:value="{data.username}"
    />
  </div>

  <div class="form-group mb-4">
    <label for="email" class="u-font-size-90">Email</label>
    <input
      type="email"
      class="form-control"
      id="email"
      aria-describedby="emailHelp"
      bind:value="{data.email}"
    />
  </div>

  <div class="form-group mb-4">
    <label for="password" class="u-font-size-90">Password</label>
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
      bind:checked="{data.termsBox}"
    />
    <label class="custom-control-label u-font-size-90" for="termsBox">
      I accept
      <a href="/terms-and-policy" class="font-weight-bold">terms and
        policies</a>.
    </label>
  </div>

  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-auto pl-0">
        <button
          type="submit"
          class="btn btn-primary"
          class:disabled="{buttonsLoading}"
          disabled="{buttonsLoading}"
        >Create Account</button>
      </div>
      <div class="col-auto justify-content-end d-flex pr-0 ml-auto">
        <a
          href="/login"
          class="btn btn-link font-weight-bold"
          class:disabled="{buttonsLoading}"
          disabled="{buttonsLoading}"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          Login
        </a>
      </div>
    </div>
  </div>
  <div class="mt-3">
    <Recaptcha
      recaptchaID="{recaptchaID}"
      on:callback="{recaptchaCallback}"
      on:errorCallback="{recaptchaErrorCallback}"
    />
  </div>
</form>
