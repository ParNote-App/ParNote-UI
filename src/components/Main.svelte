<script>
  import Router from "routve";
  import md5 from "md5";

  import {
    checkLogin,
    loginStatus,
    LoginStates,
    setLogout,
  } from "../util/login.util";
  import ApiUtil from "../util/api.util";

  import RouterConfig from "../router.config";
  import RouterConfigLoggedIn from "../router.config.loggedIn";

  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import PageLoading from "./PageLoading.svelte";

  import {
    isPageInitialized,
    isBasicDataInitialized,
    userData,
  } from "../Store";

  import { show as showNoteModal } from "./modals/NoteModal.svelte";

  const showLoadingAlways = false;

  function showLoading(showLoadingAlways, isPageInitialized) {
    return showLoadingAlways || !isPageInitialized;
  }

  function logout() {
    loginStatus.set(LoginStates.LOADING);

    ApiUtil.post("auth/logout")
      .then(() => {
        setLogout();
        window.location = "/";
      })
      .catch(() => {
        setLogout();
        window.location = "/";
      });
  }

  function getBasicLoggedInData() {
    (function getData() {
      ApiUtil.post("loggedIn/initialData", {})
        .then((response) => {
          if (response.data.result === "ok") {
            userData.update((userData) => {
              userData.name = response.data.name;
              userData.surname = response.data.surname;
              userData.username = response.data.username;
              userData.email = response.data.email;

              return userData;
            });

            isBasicDataInitialized.set(true);
          } else {
            setTimeout(() => {
              getData();
            }, 500);
          }
        })
        .catch(() => {
          setTimeout(() => {
            getData();
          }, 500);
        });
    })();
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  checkLogin(() => {
    getBasicLoggedInData();
  });

  function getMd5Hash(text) {
    return md5(text.toLowerCase());
  }

  function showNewNote() {
    showNoteModal();
  }

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
          <div
            class="w-100 d-flex flex-row align-items-between align-items-center"
          >
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

            <button
              type="button"
              class="btn btn-link mr-2"
              on:click="{showNewNote}"
            >
              <i class="fa fa-plus"></i>
              <span class="ml-2 d-md-inline d-none">New Note</span>
            </button>
            <input
              class="form-control border-0 bg-light rounded text-center text-primary search-input"
              type="search"
              placeholder="Find a note..."
            />

            <div class="dropdown">
              <a
                href="javascript:void(0);"
                class="nav-item ml-auto"
                id="userMenu"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src="https://www.gravatar.com/avatar/{getMd5Hash($userData.email)}"
                  alt="{$userData.username}"
                  title="{$userData.username}"
                  width="32"
                  height="32"
                  class="border rounded-circle"
                />
              </a>
              <div
                class="dropdown-menu dropdown-menu-right shadow-sm"
                aria-labelledby="userMenu"
              >
                <h6 class="dropdown-header mb-0">
                  {capitalizeFirstLetter($userData.name)}
                  {capitalizeFirstLetter($userData.surname)}
                </h6>
                <h8 class="dropdown-header mb-1">@{$userData.username}</h8>
                <a class="dropdown-item" href="/settings"><i
                    class="fas fa-cog mr-2"
                  ></i>
                  Ayarlar</a>
                <a
                  class="dropdown-item text-danger"
                  href="javascript:void(0);"
                  on:click="{() => logout()}"
                >
                  <i class="fas fa-sign-out-alt mr-2"></i>
                  Çıkış</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main class="flex-fill">
        <div class="container">
          {#if showLoading(showLoadingAlways, $isPageInitialized)}
            <PageLoading />
          {/if}

          <Router
            hidden="{showLoading(showLoadingAlways, $isPageInitialized)}"
            routerConfig="{RouterConfigLoggedIn}"
          />
        </div>
      </main>

      <footer>
        <div class="container d-flex">
          <a href="/terms-and-policy">Terms & Policy</a>
          <p class="ml-auto">ParNote &copy; 2020</p>
        </div>
      </footer>
    </div>
  </div>
{/if}
