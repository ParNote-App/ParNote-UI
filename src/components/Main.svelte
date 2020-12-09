<script>
  import Router from "routve";

  import { loginStatus, LoginStates } from "../util/login.util";

  import RouterConfig from "../router.config";
  import RouterConfigLoggedIn from "../router.config.loggedIn";

  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";

  export let hidden;
</script>

{#if $loginStatus === LoginStates.LOGGED_OUT}
  <Header />

  <div class="container-fluid h-100">
    <div class="row h-100">
      <div
        class="col-lg-6 col-12 h-100 d-flex h-100 flex-column justify-content-center"
      >
        <Router routerConfig="{RouterConfig}" />
      </div>
      <div class="col-6 h-100 bg-primary d-lg-flex d-none"></div>
    </div>
  </div>
  <Footer />
{/if}
{#if $loginStatus === LoginStates.LOGGED_IN}
  <div hidden="{hidden}">

    <div class="d-flex flex-column min-vh-100">
      <nav class="navbar py-3">
        <div class="container">
          <div class="w-100 d-flex flex-row align-items-between align-items-center">
            <a class="navbar-brand" href="/">
              <img
                src="/assets/img/logo.svg"
                width="30"
                height="30"
                class="d-inline-block align-top"
                alt="Parnote"
                title="Parnote"
              />
            </a>

            <input
              class="form-control border-0 bg-light rounded text-center text-primary search-input"
              type="search"
              placeholder="Find a note..."
            />
            <div class="dropdown">
              <a
                href="/"
                class="nav-item ml-auto"
                id="userMenu"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src="https://www.gravatar.com/avatar/00000000000000000000000000000000"
                  alt="Username"
                  title="Username"
                  width="32"
                  height="32"
                  class="border rounded-circle"
                />
              </a>
              <div
                class="dropdown-menu dropdown-menu-right shadow-sm"
                aria-labelledby="userMenu"
              >
                <h6 class="dropdown-header mb-1">Username</h6>
                <a class="dropdown-item" href="/settings"><i
                  class="fas fa-cog mr-2"
                ></i>
                  Ayarlar</a>
                <a class="dropdown-item text-danger" href="/logout">
                  <i class="fas fa-sign-out-alt mr-2"></i>
                  Çıkış</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main class="flex-fill">
        <div class="container">
          <Router routerConfig="{RouterConfigLoggedIn}" />
        </div>
      </main>

      <footer>
        <div class="container d-flex">
          <a href="/TermsAndPolicy">Terms & Policy</a>
          <p class="ml-auto">&copy; Parnote - 2020</p>
        </div>
      </footer>
    </div>
  </div>
{/if}
