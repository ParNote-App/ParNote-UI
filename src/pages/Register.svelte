<script>
  import { writable, get } from "svelte/store";

  import Recaptcha, {
    execute as executeRecaptcha,
    reset as resetRecaptcha,
  } from "../components/Recaptcha.svelte";
  import ApiUtil from "../util/api.util";

  const recaptchaID = writable(0);
  const data = {
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    termsBox: false,
    recaptcha: "",
  };

  function submit() {
    resetRecaptcha(get(recaptchaID));
    executeRecaptcha(get(recaptchaID));
  }

  function recaptchaCallback(event) {
    const token = event.detail.token;

    data.recaptcha = token;

    register(token);
  }

  function register(token) {
    ApiUtil.post("auth/register", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
</script>

<main role="main">
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-6">
        <h1 class="text-center">Create An Account</h1>
        <div class="alert bg-danger text-white fade show" role="alert">
          <div class="d-flex">
            <div class="alert__icon mr-3">
              <i class="fas fa-exclamation-circle"></i>
            </div>

            <div class="align-self-center mr-3">
              This is a primary alert — check it out!
            </div>

            <div class="ml-auto">
              <button
                type="button"
                class="alert__close alert__close--light"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
        </div>
        <form on:submit|preventDefault="{submit}">
          <div class="form-group mb-4">
            <label for="name" class="u-font-size-90">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              aria-describedby="name"
              placeholder="Name"
              bind:value="{data.name}"
            />
          </div>

          <div class="form-group mb-4">
            <label for="surname" class="u-font-size-90">Surname</label>
            <input
              type="text"
              class="form-control"
              id="surname"
              aria-describedby="surname"
              placeholder="Surname"
              bind:value="{data.surname}"
            />
          </div>

          <div class="form-group mb-4">
            <label for="username" class="u-font-size-90">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              aria-describedby="username"
              placeholder="Username"
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
              placeholder="Email"
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
              placeholder="Password"
              bind:value="{data.password}"
            />
          </div>

          <div class="custom-control custom-checkbox mb-2">
            <input
              type="checkbox"
              class="custom-control-input"
              id="termsBox"
              bind:value="{data.termsBox}"
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
                <button type="submit" class="btn btn-primary">Create Account</button>
              </div>
              <div class="col-auto justify-content-end d-flex pr-0 ml-auto">
                <a href="/login" class="btn btn-link font-weight-bold">
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
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</main>
