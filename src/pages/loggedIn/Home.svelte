<script>
  import { isPageInitialized } from "../../Store";

  isPageInitialized.set(true);
</script>

<div class="d-flex flex-column min-vh-100">
  <nav class="navbar bg-light-primary">
    <div class="container">
      <a class="navbar-brand" href="/">
        <img
          src="/assets/img/logo.svg"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
        />
      </a>

      <form class="form-inline col-lg mr-auto my-2 my-lg-0">
        <input
          class="form-control w-75 mr-sm-2"
          type="search"
          placeholder="Find a note..."
        />
        <button
          class="btn btn-primary my-2 my-sm-0"
          type="submit"
        >Search</button>
      </form>

      <button type="button" class="btn btn-outline-primary">
        <i class="far fa-plus-square"></i>
        New Note
      </button>

      <button type="button" class="btn btn-outline-primary bg-transparent ml-5">
        <i class="fas fa-ellipsis-h"></i>
      </button>
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
