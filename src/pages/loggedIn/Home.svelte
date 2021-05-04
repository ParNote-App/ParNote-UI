<script>
  import { onMount, onDestroy } from "svelte";
  import jQuery from "jquery";
  import { _ } from "svelte-i18n";

  import { isPageInitialized } from "../../Store";

  import { setSuccessCallback as setNoteModalSuccessCallback } from "../../components/modals/NoteModal.svelte";
  import Notes from "../../components/Notes.svelte";

  import ApiUtil from "../../util/api.util";

  let notes = [];
  let checkTime = 0;
  let interval;

  function getData(handler = () => {}) {
    ApiUtil.post("user/getNotes", {})
      .then((response) => {
        if (response.data.result === "ok") {
          notes = [];

          response.data.notes.forEach((note) => {
            notes.push(note);
          });

          isPageInitialized.set(true);
          handler();
        } else {
          setTimeout(() => {
            getData(handler);
          }, 500);
        }
      })
      .catch(() => {
        setTimeout(() => {
          getData(handler);
        }, 500);
      });
  }

  function getCountOfNormalNotes(notes) {
    let count = 0;

    notes.forEach((note) => {
      if (note.status === 1) {
        count += 1;
      }
    });

    return count;
  }

  function getCountOfArchivedNotes(notes) {
    let count = 0;

    notes.forEach((note) => {
      if (note.status === 2) {
        count += 1;
      }
    });

    return count;
  }

  function getCountOfTrashNotes(notes) {
    let count = 0;

    notes.forEach((note) => {
      if (note.status === 3) {
        count += 1;
      }
    });

    return count;
  }

  onMount(() => {
    getData();

    interval = setInterval(() => {
      checkTime += 1;
    }, 1000);
  });

  setNoteModalSuccessCallback((note, dismiss) => {
    getData(() => {
      dismiss();
      jQuery("#pills-tab li:nth-child(1) a").tab("show");
    });
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<ul class="nav nav-tabs pt-3 d-flex flex-row" id="pills-tab" role="tablist">
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
      {$_('pages.logged-in.home.my-notes')}
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
      {$_('pages.logged-in.home.archive')}
    </a>
  </li>
  <!--  <li class="nav-item ml-auto">-->
  <!--    <a-->
  <!--      class="nav-link"-->
  <!--      id="pills-search-tab"-->
  <!--      data-toggle="pill"-->
  <!--      href="#pills-search"-->
  <!--      role="tab"-->
  <!--      aria-controls="pills-search"-->
  <!--      aria-selected="false"-->
  <!--    >-->
  <!--      <i class="fas fa-search mr-2"></i>-->
  <!--      Search-->
  <!--    </a>-->
  <!--  </li>-->
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
      {$_('pages.logged-in.home.trash')}
    </a>
  </li>
</ul>

<div class="tab-content tab-content--v1 mb-5" id="pills-tabContent">
  <div
    class="tab-pane fade active show"
    id="pills-notes"
    role="tabpanel"
    aria-labelledby="pills-notes-tab-1"
  >
    <!-- Note Layout Starts Here -->
    <Notes
      count="{getCountOfNormalNotes(notes)}"
      notes="{notes}"
      status="{1}"
      checkTime="{checkTime}"
    />
  </div>

  <div
    class="tab-pane fade"
    id="pills-archive"
    role="tabpanel"
    aria-labelledby="pills-archive-tab-1"
  >
    <div class="container">
      <!-- Note Layout Starts Here -->
      <Notes
        count="{getCountOfArchivedNotes(notes)}"
        notes="{notes}"
        status="{2}"
        checkTime="{checkTime}"
      />
    </div>
  </div>

  <!--  <div-->
  <!--    class="tab-pane fade"-->
  <!--    id="pills-search"-->
  <!--    role="tabpanel"-->
  <!--    aria-labelledby="pills-search-tab-1"-->
  <!--  >-->
  <!--    <div class="container">search</div>-->
  <!--  </div>-->

  <div
    class="tab-pane fade"
    id="pills-trash"
    role="tabpanel"
    aria-labelledby="pills-trash-tab-1"
  >
    <div class="container">
      <!-- Note Layout Starts Here -->
      <Notes
        count="{getCountOfTrashNotes(notes)}"
        notes="{notes}"
        status="{3}"
        checkTime="{checkTime}"
      />
    </div>
  </div>
</div>
