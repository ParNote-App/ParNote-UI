<script>
  import { onMount } from "svelte";

  import { isPageInitialized } from "../../Store";

  import NoteModal from "../../components/modals/NoteModal.svelte";
  import ApiUtil from "../../util/api.util";

  let notes = [];

  onMount(() => {
    (function getData() {
      ApiUtil.post("user/getNotes", {})
        .then((response) => {
          if (response.data.result === "ok") {
            notes = [];

            response.data.notes.forEach((note) => {
              notes.push(note);
            });

            isPageInitialized.set(true);
          } else {
            console.log(response.data);
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
  });
</script>

<ul class="nav nav-tabs pt-3" id="pills-tab" role="tablist">
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

<div class="tab-content tab-content--v1 mb-5" id="pills-tabContent">
  <div
    class="tab-pane fade active show"
    id="pills-notes"
    role="tabpanel"
    aria-labelledby="pills-home-tab-1"
  >
    <div class="container">
      <!-- Note Layout Starts Here -->

      {#if notes.length > 1}
        <div class="card-columns">
          <a
            href="javascript:void(0);"
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
      {:else}
        <div class="text-center py-4">
          <h4 class="font-weight-bolder">Not yok.</h4>
          <p>Not bulanamadı.</p>
          <br />
          <a class="btn btn-outline-primary" href="javascript:void(0);"><i
              class="fas fa-plus mr-1"
            ></i>
            Yeni Not</a>
        </div>
      {/if}
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
      license. The UI Kit comes with 5 beautiful complete pages and includes
      over 20 reusable and customizable UI Blocks. It’s lightweight and only
      ~17kb when minified.
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
      license. The UI Kit comes with 5 beautiful complete pages and includes
      over 20 reusable and customizable UI Blocks. It’s lightweight and only
      ~17kb when minified.
    </p>
  </div>
</div>

<NoteModal />
