<script>
  import {onMount} from "svelte"
  import { isPageInitialized } from "../../Store";

  onMount(() => {
    isPageInitialized.set(true);
  })
</script>

<div class="d-flex flex-column min-vh-100">
  <nav class="navbar">
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

        <div class="input-group">
          <input
            class="form-control search-input border-0 bg-light mx-5 rounded text-center text-primary"
            type="search"
            placeholder="Find a note..."
          />
        </div>
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
      <ul class="nav nav-tabs nav-tabs--v1" id="pills-tab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active show"
            id="pills-home-tab-1"
            data-toggle="pill"
            href="#pills-home-1"
            role="tab"
            aria-controls="pills-home-1"
            aria-selected="true"
          >
            <i class="far fa-sticky-note"></i>
            My Notes
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="pills-profile-tab-1"
            data-toggle="pill"
            href="#pills-profile-1"
            role="tab"
            aria-controls="pills-profile-1"
            aria-selected="false"
          >
            <i class="fas fa-archive"></i>
            Archive
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="pills-contact-tab-1"
            data-toggle="pill"
            href="#pills-contact-1"
            role="tab"
            aria-controls="pills-contact-1"
            aria-selected="false"
          >
            <i class="far fa-trash-alt"></i>
            Trash
          </a>
        </li>
      </ul>

      <div class="tab-content tab-content--v1" id="pills-tabContent">
        <div
          class="tab-pane fade active show"
          id="pills-home-1"
          role="tabpanel"
          aria-labelledby="pills-home-tab-1"
        >
          <p>
            Stream UI Kit is beautiful Open Source Bootstrap 4 UI Kit under MIT
            license. The UI Kit comes with 5 beautiful complete pages and
            includes over 20 reusable and customizable UI Blocks. It’s
            lightweight and only ~17kb when minified.
          </p>
        </div>

        <div
          class="tab-pane fade"
          id="pills-profile-1"
          role="tabpanel"
          aria-labelledby="pills-profile-tab-1"
        >
          <p>
            Stream UI Kit is beautiful Open Source Bootstrap 4 UI Kit under MIT
            license. The UI Kit comes with 5 beautiful complete pages and
            includes over 20 reusable and customizable UI Blocks. It’s
            lightweight and only ~17kb when minified.
          </p>
        </div>

        <div
          class="tab-pane fade"
          id="pills-contact-1"
          role="tabpanel"
          aria-labelledby="pills-contact-tab-1"
        >
          <p>
            Stream UI Kit is beautiful Open Source Bootstrap 4 UI Kit under MIT
            license. The UI Kit comes with 5 beautiful complete pages and
            includes over 20 reusable and customizable UI Blocks. It’s
            lightweight and only ~17kb when minified.
          </p>
        </div>
      </div>
    </div>
  </main>

  <footer>
    <div class="container d-flex">
      <a href="/TermsAndPolicy">Terms & Policy</a>
      <p class="ml-auto">&copy; Parnote - 2020</p>
    </div>
  </footer>
</div>
