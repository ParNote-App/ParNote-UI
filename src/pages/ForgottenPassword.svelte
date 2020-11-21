<main role="main">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-auto">
        <h1 class="text-center">Reset Password</h1>

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

        <div class="form-group mb-4 ">
          <label for="defaultInput" class="u-font-size-90">Username / Email</label>
          <input
            type="email"
            class="form-control"
            id="defaultInput"
            aria-describedby="emailHelp"
            placeholder="Username or Email"
          />
        </div>

        <div class="text-center">
          <a
            href="/reset-password"
            class="btn btn-lg btn-primary"
            type="submit"
          >Reset Password
            <i class="fas fa-chevron-right"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</main>
