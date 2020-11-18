<main role="main" class="px-9 mx-9">
  <div class="container-fluid px-9 mx-9">
    <div class="row">
      <div class="col-auto">
        <h1>Login page</h1>
        <form>
          <div class="form-group mb-4">
            <label for="usernameOrEmail" class="u-font-size-90">Username or
              Email</label>
            <input
              type="text"
              class="form-control"
              id="usernameOrEmail"
              aria-describedby="emailHelp"
              placeholder="Username or Email"
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

          <div class="container-fluid">
            <div class="row">
              <div class="col-auto">
                <form>
                  <a href="/login" class="btn btn-primary btn-lg mt-3">Login
                    <i class="fas fa-chevron-right pl-2"></i>
                  </a>
                </form>
              </div>
              <div class="col-auto">
                <form>
                  <a
                    href="/register"
                    class="btn btn-link btn-lg mt-3 pl-7"
                  >Create Account
                  </a>
                </form>
              </div>
            </div>
            <div class="container my-3">
              <div class="col-auto text-center mt-7">
                <form>
                  <a
                    href="/reset-password"
                    class="btn btn-outline-primary"
                  >Reset Password
                  </a>
                </form>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</main>
