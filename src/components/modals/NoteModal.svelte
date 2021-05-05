<script context="module">
  import jquery from "jquery";
  import { writable, get } from "svelte/store";

  const modalID = "noteModal";
  const note = writable({ id: -1, title: "", text: "", status: 0 });

  let callback = (note, dismiss) => {};

  export function show(newNote = { id: -1, title: "", text: "", status: 0 }) {
    note.set(newNote);

    jquery("#" + modalID).modal({ backdrop: "static", keyboard: false });
  }

  export function dismiss() {
    jquery("#" + modalID).modal("hide");
  }

  export function setSuccessCallback(newCallback) {
    callback = newCallback;
  }
</script>

<script>
  import { _ } from "svelte-i18n";
  import copy from "copy-to-clipboard";

  import ApiUtil from "../../util/api.util";
  import tooltip from "../../util/tooltip.util";

  import ConfirmDeleteNoteModal, {
    show as showConfirmDeleteNoteModal,
  } from "./ConfirmDeleteNoteModal.svelte";

  let shareLoading = false;
  let buttonsLoading = false;
  let shareLinkCopied = false;
  let shareLinkDeleted = false;

  function submit() {
    buttonsLoading = true;

    ApiUtil.post(get(note).id === -1 ? "user/addNote" : "user/editNote", {
      id: get(note).id,
      title: get(note).title,
      text: get(note).text,
    })
      .then((response) => {
        if (response.data.result === "ok") {
          callback(get(note), () => {
            dismiss();

            buttonsLoading = false;
          });
        } else location.reload();
      })
      .catch(() => {
        location.reload();
      });
  }

  function moveTrash() {
    buttonsLoading = true;

    ApiUtil.post("user/moveNoteTrash", {
      id: get(note).id,
    })
      .then((response) => {
        if (response.data.result === "ok") {
          callback(get(note), () => {
            dismiss();

            buttonsLoading = false;
          });
        } else location.reload();
      })
      .catch(() => {
        location.reload();
      });
  }

  function moveArchive() {
    buttonsLoading = true;

    ApiUtil.post("user/moveNoteArchive", {
      id: get(note).id,
    })
      .then((response) => {
        if (response.data.result === "ok") {
          callback(get(note), () => {
            dismiss();

            buttonsLoading = false;
          });
        } else location.reload();
      })
      .catch(() => {
        location.reload();
      });
  }

  function deleteNote() {
    ApiUtil.post("user/deleteNote", {
      id: get(note).id,
    })
      .then((response) => {
        if (response.data.result === "ok") {
          callback(get(note), () => {
            dismiss();

            buttonsLoading = false;
          });
        } else location.reload();
      })
      .catch(() => {
        location.reload();
      });
  }

  function deleteNoteClick() {
    buttonsLoading = true;

    showConfirmDeleteNoteModal(
      get(note),
      () => {
        deleteNote();
      },
      () => {
        buttonsLoading = false;
      }
    );
  }

  function shareNoteClick() {
    buttonsLoading = true;
    shareLoading = true;

    ApiUtil.post(
      get(note).shared ? "shareLink/delete" : "shareLink/create",
      get(note).shared
        ? {
            token: get(note).sharedToken,
          }
        : {
            id: get(note).id,
          }
    )
      .then((response) => {
        if (response.data.result === "ok") {
          const deleted = get(note).shared === true;

          note.update((note) => {
            note.shared = !note.shared;

            return note;
          });

          if (!deleted) {
            note.update((note) => {
              note.sharedToken = response.data.token;

              return note;
            });

            copy("http://localhost:5000/shared-note/" + response.data.token);
          }

          if (deleted) shareLinkDeleted = true;
          else shareLinkCopied = true;

          shareLoading = false;
          buttonsLoading = false;

          setTimeout(() => {
            shareLinkCopied = false;
            shareLinkDeleted = false;
          }, 2000);
        } else location.reload();
      })
      .catch(() => {
        location.reload();
      });
  }
</script>

<div
  class="modal fade"
  id="{modalID}"
  tabindex="-1"
  aria-labelledby="noteModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <form on:submit|preventDefault="{submit}">
        <div class="modal-header border-bottom-0">
          <input
            type="text"
            class="form-control form-control-lg bg-transparent border-0 font-weight-bolder p-1 modal-note-content"
            placeholder="{$_('modals.note-modal.note-title')}"
            bind:value="{$note.title}"
          />

          <i
            class="fas mr-2 p-1 mt-2"
            class:text-success="{$note.shared}"
            class:text-danger="{!$note.shared}"
            class:fa-globe-americas="{$note.shared}"
            class:fa-lock="{!$note.shared}"
            use:tooltip="{['bottom', $note.shared ? 'Note is Public' : 'Note is Private']}"
          ></i>

          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="{$_('modals.note-modal.close')}"
            class:disabled="{buttonsLoading}"
            disabled="{buttonsLoading}"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-floating">
            <textarea
              class="form-control bg-transparent border-0 font-weight-normal p-1 modal-note-content"
              placeholder="{$_('modals.note-modal.note-text')}"
              id="noteNote"
              style="height: 100px"
              bind:value="{$note.text}"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer border-top-0">
          {#if $note.status !== 0}
            <button
              type="button"
              class="btn btn-link text-primary"
              class:disabled="{buttonsLoading}"
              disabled="{buttonsLoading}"
              on:click="{shareNoteClick}"
              use:tooltip="{['bottom', shareLinkDeleted ? 'Link deleted, now note is private!' : shareLinkCopied ? 'Share link copied to clipboard!' : shareLoading ? 'Loading...' : $note.shared ? 'Publicly Shared - Click to close sharing...' : 'Click to share this note and copy the link']}"
            >
              <i class="fas fa-share mr-2"></i>
              Share
            </button>
          {/if}
          {#if $note.status === 1 || $note.status === 2}
            <button
              type="button"
              class="btn btn-link text-danger"
              class:disabled="{buttonsLoading}"
              disabled="{buttonsLoading}"
              on:click="{moveTrash}"
            >
              <i class="far fa-trash-alt mr-2"></i>
              {$_('modals.note-modal.trash')}
            </button>
          {/if}
          {#if $note.status === 3}
            <button
              type="button"
              class="btn btn-link text-danger"
              class:disabled="{buttonsLoading}"
              disabled="{buttonsLoading}"
              on:click="{deleteNoteClick}"
            >
              <i class="fas fa-trash-alt mr-2"></i>
              {$_('modals.note-modal.delete-permanent')}
            </button>
          {/if}
          {#if $note.status === 1 || $note.status === 3}
            <button
              type="button"
              class="btn btn-link text-primary"
              class:disabled="{buttonsLoading}"
              disabled="{buttonsLoading}"
              on:click="{moveArchive}"
            >
              <i class="fas fa-archive mr-2"></i>
              {$_('modals.note-modal.archive')}
            </button>
          {/if}

          <button
            type="submit"
            class="btn btn-primary"
            class:disabled="{buttonsLoading || $note.title.length === 0 || $note.text.length === 0}"
            disabled="{buttonsLoading || $note.title.length === 0 || $note.text.length === 0}"
          >
            {$_('modals.note-modal.save')}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<ConfirmDeleteNoteModal />
