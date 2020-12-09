<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import jQuery from "jquery";

  import { isPageInitialized } from "../../Store";

  import NoteModal, {
    show as showNoteModal,
    setSuccessCallback as setNoteModalSuccessCallback,
  } from "../../components/modals/NoteModal.svelte";
  import ApiUtil from "../../util/api.util";

  let notes = [];

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
  });

  setNoteModalSuccessCallback((note, dismiss) => {
    getData(() => {
      dismiss();
      jQuery("#pills-tab li:nth-child(1) a").tab("show");
    });
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
      Trash
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

    {#if getCountOfNormalNotes(notes) > 0}
      <div class="card-columns">
        {#each notes as note, index (note)}
          {#if note.status === 1}
            <a
              href="javascript:void(0);"
              class="text-dark"
              on:click="{() => showNoteModal(note)}"
            >
              <div class="card note-card" in:fade>
                <div class="card-body">
                  <h5 class="card-title font-weight-bolder">{note.title}</h5>
                  <p class="card-text">{note.text}</p>
                  <p class="card-text">
                    <small class="text-muted">Last updated 3 mins ago</small>
                  </p>
                </div>
              </div>
            </a>
          {/if}
        {/each}
      </div>
    {:else}
      <div class="text-center py-4">
        <h4 class="font-weight-bolder"> <i class="fas fa-sticky-note mr-1"></i></h4>
        <p>Burası boş.</p>
        <br />
        <button
          type="button"
          class="btn btn-outline-primary"
          on:click="{() => showNoteModal()}"
        >
          <i class="fas fa-plus mr-1"></i>
          Yeni Not
        </button>
      </div>
    {/if}
  </div>

  <div
    class="tab-pane fade"
    id="pills-archive"
    role="tabpanel"
    aria-labelledby="pills-archive-tab-1"
  >
    <div class="container">
      <!-- Note Layout Starts Here -->

      {#if getCountOfArchivedNotes(notes) > 0}
        <div class="card-columns">
          {#each notes as note, index (note)}
            {#if note.status === 2}
              <a
                href="javascript:void(0);"
                class="text-dark"
                on:click="{() => showNoteModal(note)}"
              >
                <div class="card note-card" in:fade>
                  <div class="card-body">
                    <h5 class="card-title font-weight-bolder">{note.title}</h5>
                    <p class="card-text">{note.text}</p>
                    <p class="card-text">
                      <small class="text-muted">Last updated 3 mins ago</small>
                    </p>
                  </div>
                </div>
              </a>
            {/if}
          {/each}
        </div>
      {:else}
        <div class="text-center py-4">
          <h4 class="font-weight-bolder"> <i class="fas fa-archive mr-1"></i></h4>
          <p>Burası boş.</p>
        </div>
      {/if}
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

      {#if getCountOfTrashNotes(notes) > 0}
        <div class="card-columns">
          {#each notes as note, index (note)}
            {#if note.status === 3}
              <a
                href="javascript:void(0);"
                class="text-dark"
                on:click="{() => showNoteModal(note)}"
              >
                <div class="card note-card" in:fade>
                  <div class="card-body">
                    <h5 class="card-title font-weight-bolder">{note.title}</h5>
                    <p class="card-text">{note.text}</p>
                    <p class="card-text">
                      <small class="text-muted">Last updated 3 mins ago</small>
                    </p>
                  </div>
                </div>
              </a>
            {/if}
          {/each}
        </div>
      {:else}
        <div class="text-center py-4">
          <h4 class="font-weight-bolder"> <i class="fas fa-trash mr-1"></i></h4>
          <p>Burası boş.</p>
        </div>
      {/if}
    </div>
  </div>
</div>

<NoteModal />
