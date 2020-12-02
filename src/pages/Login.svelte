<script>
  import { get, writable } from "svelte/store";

  import ErrorAlert, {
    hide as hideError,
    show as showError,
  } from "../components/ErrorAlert.svelte";
  import SuccessAlert, {
    hide as hideSuccess,
    show as showSuccess,
  } from "../components/SuccessAlert.svelte";

  import Recaptcha, {
    execute as executeRecaptcha,
    reset as resetRecaptcha,
  } from "../components/Recaptcha.svelte";

  import ApiUtil, { NETWORK_ERROR } from "../util/api.util";

  const recaptchaID = writable(0);
  const data = {
    usernameOrEmail: "",
    password: "",
    rememberMe: false,
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

    login();
  }

  function recaptchaErrorCallback() {
    hideSuccess();
    hideError();

    buttonsLoading = false;

    showError(NETWORK_ERROR);
  }

  function login() {
    ApiUtil.post("auth/login", data)
      .then((response) => {
        if (response.data.result === "ok") {
          showSuccess("LOGIN_SUCCESS");
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

<main role="main">
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-auto">
        <h1 class="text-center mb-4">Login</h1>

        <SuccessAlert />
        <ErrorAlert />

        <form on:submit|preventDefault="{submit}">
          <div class="form-group mb-4">
            <label for="usernameOrEmail" class="u-font-size-90">
              Username / E-mail
            </label>
            <input
              type="text"
              class="form-control"
              id="usernameOrEmail"
              aria-describedby="emailHelp"
              placeholder="Username / E-mail"
              bind:value="{data.usernameOrEmail}"
            />
          </div>

          <div class="form-group mb-4">
            <label for="password" class="u-font-size-90">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              aria-describedby="password"
              placeholder="Password"
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
              Remember Me
            </label>
          </div>

          <div class="container-fluid mt-3">
            <div class="row">
              <div class="col-auto pl-0">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg"
                  class:disabled="{buttonsLoading}"
                  disabled="{buttonsLoading}"
                >Login
                  <i class="fas fa-chevron-right ml-2"></i>
                </button>
              </div>
              <div class="col-auto pr-0">
                <a
                  href="/register"
                  class="btn btn-link btn-lg"
                  class:disabled="{buttonsLoading}"
                  disabled="{buttonsLoading}"
                >Create Account
                </a>
              </div>
            </div>
            <div class="container-fluid mt-3">
              <div class="row justify-content-center">
                <div class="col-auto text-center mt-3">
                  <a
                    href="/forgotten-password"
                    class="btn btn-outline-primary"
                    class:disabled="{buttonsLoading}"
                    disabled="{buttonsLoading}"
                  >Reset Password
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
      </div>
    </div>
  </div>
</main>
