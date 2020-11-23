<main role="main">
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-auto">
        <h1 class="text-center mb-4">Login</h1>

        <form>
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

          <div class="container-fluid mt-3">
            <div class="row">
              <div class="col-auto pl-0">
                <button type="submit" class="btn btn-primary btn-lg">Login
                  <i class="fas fa-chevron-right ml-2"></i>
                </button>
              </div>
              <div class="col-auto pr-0">
                <a href="/register" class="btn btn-link btn-lg">Create
                  Account
                </a>
              </div>
            </div>
            <div class="container-fluid mt-3">
              <div class="row justify-content-center">
                <div class="col-auto text-center mt-3">
                  <a
                    href="/forgotten-password"
                    class="btn btn-outline-primary"
                  >Reset Password
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</main>
