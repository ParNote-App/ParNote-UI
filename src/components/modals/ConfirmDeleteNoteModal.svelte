<script context="module">
  import jquery from "jquery";
  import { writable, get } from "svelte/store";

  const modalID = "confirmDeleteNoteModal";
  const note = writable({ id: -1, title: "", text: "", status: 0 });

  let confirmHandler = (note, dismiss) => {};
  let cancelHandler = (note, dismiss) => {};

  export function show(newNote, newConfirmHandler, newCancelHandler) {
    note.set(newNote);

    confirmHandler = newConfirmHandler;
    cancelHandler = newCancelHandler;

    jquery("#" + modalID).modal({ backdrop: "static", keyboard: false });
  }

  export function dismiss() {
    jquery("#" + modalID).modal("hide");
  }
</script>

<script>
  import { _ } from "svelte-i18n";

  function onConfirm() {
    dismiss();
    confirmHandler();
  }

  function onClose() {
    dismiss();
    cancelHandler();
  }
</script>

<div
  class="modal fade"
  id="confirmDeleteNoteModal"
  tabindex="-1"
  aria-labelledby="confirmDeleteNoteModal"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" on:click="{onClose}">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        {@html $_('modals.confirm-delete-note-modal.title', {
          values: { note_title: "<b>" +$note.title + "</b>" },
        })}
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-link text-danger"
          on:click="{onClose}"
        >
          {$_('modals.confirm-delete-note-modal.cancel')}</button>
        <button type="button" class="btn btn-danger" on:click="{onConfirm}">
          <i class="fas fa-trash-alt mr-2"></i>
          {$_('modals.confirm-delete-note-modal.yes')}
        </button>
      </div>
    </div>
  </div>
</div>
