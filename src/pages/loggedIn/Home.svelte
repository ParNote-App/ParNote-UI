<script>
  import {onMount} from "svelte"
  import { isPageInitialized } from "../../Store";

  onMount(() => {
    isPageInitialized.set(true);
  })
</script>

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
      <ul class="nav nav-tabs" id="pills-tab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active show"
            id="pills-notes-tab"
            data-toggle="pill"
            href="#pills-notes"
            role="tab"
            aria-controls="pills-notes"
            aria-selected="true"
          >
            <i class="far fa-sticky-note mr-2"></i>
            My Notes
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="pills-archive-tab"
            data-toggle="pill"
            href="#pills-archive"
            role="tab"
            aria-controls="pills-archive"
            aria-selected="false"
          >
            <i class="fas fa-archive mr-2"></i>
            Archive
          </a>
        </li>
        <li class="nav-item ml-auto">
          <a
            class="nav-link"
            id="pills-trash-tab"
            data-toggle="pill"
            href="#pills-trash"
            role="tab"
            aria-controls="pills-trash"
            aria-selected="false"
          >
            <i class="far fa-trash-alt mr-2"></i>
            Trash
          </a>
        </li>
      </ul>

      <div class="tab-content tab-content--v1" id="pills-tabContent">
        <div
          class="tab-pane fade active show"
          id="pills-notes"
          role="tabpanel"
          aria-labelledby="pills-home-tab-1"
        >
          <div class="container">
            <!-- Note Layout Starts Here -->

            <div class="card-columns">
              <a
                href="#"
                class="text-dark"
                data-toggle="modal"
                data-target="#noteModal"
              >
                <div class="card note-card">
                  <div class="card-body">
                    <h5 class="card-title font-weight-bolder">Note title</h5>
                    <p class="card-text">
                      Note content here lorem impsum dolor sit amet. Bla bla bla
                    </p>
                    <p class="card-text">
                      <small class="text-muted">Last updated 3 mins ago</small>
                    </p>
                  </div>
                </div>
              </a>
            </div>

            <div class="text-center py-4">
              <h4 class="font-weight-bolder">Not yok.</h4>
              <p>Not bulanamadı.</p>
              <br />
              <a class="btn btn-sm btn-outline-primary" href="#"><i
                  class="fas fa-plus mr-1"
                ></i>
                Yeni Not</a>
            </div>
          </div>
        </div>

        <div
          class="tab-pane fade"
          id="pills-archive"
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
          id="pills-trash"
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

  <div
    class="modal"
    id="noteModal"
    tabindex="-1"
    aria-labelledby="noteModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <input
            type="text"
            class="form-control form-control-lg bg-transparent border-0 font-weight-bolder p-1 modal-note-content"
            placeholder="Note title"
          />
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <input
            type="text"
            class="form-control bg-transparent border-0 font-weight-normal p-1 modal-note-content"
            placeholder="..."
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-link" data-dismiss="modal">
            <i class="fas fa-archive mr-2"></i>
            Arşiv</button>
          <button type="button" class="btn btn-danger">
            <i class="far fa-trash-alt mr-2"></i>
            Çöp</button>
        </div>
      </div>
    </div>
  </div>

  <footer>
    <div class="container d-flex">
      <a href="/TermsAndPolicy">Terms & Policy</a>
      <p class="ml-auto">&copy; Parnote - 2020</p>
    </div>
  </footer>
</div>
