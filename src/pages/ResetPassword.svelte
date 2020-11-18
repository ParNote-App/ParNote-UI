<main role="main">
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-auto">
        <h1 class="text-center mx-auto">Reset Password</h1>
        <div
          class="alert bg-danger text-white fade show rounded-0"
          role="alert"
        >
          <div class="container d-flex">
            <div class="alert__icon mr-3">
              <i class="fas fa-exclamation-circle"></i>
            </div>

            <div class="align-self-center mr-3">
              This is a danger alert — check it out!
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
        <div class="form-group mb-4">
          <label for="newPassword" class="u-font-size-90">New Password</label>
          <input
            type="password"
            class="form-control"
            id="newPassword"
            aria-describedby="passwordHelp"
            placeholder="Enter new password"
          />
        </div>
        <div class="form-group mb-4">
          <label for="newPasswordRepeat" class="u-font-size-90">New Password
            Repeat</label>
          <input
            type="password"
            class="form-control"
            id="newPasswordRepeat"
            aria-describedby="passwordHelp"
            placeholder="Repeat new password"
          />
        </div>
        <div class="d-flex w-100">
          <button type="submit" class="btn btn-primary mx-auto">Reset Password
          </button>
        </div>
      </div>
    </div>
  </div>
</main>
