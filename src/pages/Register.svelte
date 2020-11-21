<main role="main">
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-auto">
        <h1>Create An Account</h1>
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
        <form>
          <div class="form-group mb-4">
            <label for="name" class="u-font-size-90">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              aria-describedby="name"
              placeholder="Name"
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
            />
          </div>

          <div class="custom-control custom-checkbox mb-2">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customCheck2"
              checked=""
            />
            <label
              class="custom-control-label u-font-size-90"
              for="customCheck2"
            >I accept
              <a
                href="/terms-and-policy"
                class="font-weight-bold"
              >terms.</a></label>
          </div>

          <div class="container-fluid mt-4">
            <div class="row">
              <div class="col-6 pl-0">
                <button type="submit" class="btn btn-primary">Create
                  Account</button>
              </div>
              <div class="col-6 justify-content-end d-flex pr-0">
                <a href="/login" class="btn btn-link font-weight-bold">
                  <i class="fas fa-arrow-left "></i>
                  Login
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</main>
