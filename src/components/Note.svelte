<script>
  import moment from "moment";
  import { fade } from "svelte/transition";
  import { _, locale as currentLocale } from "svelte-i18n";

  export let note;
  export let checkTime;
  export let onlyView = false;

  import { show as showNoteModal } from "./modals/NoteModal.svelte";

  function getTime(check, time, locale) {
    return moment(time).fromNow();
  }
</script>

<a
  href="javascript:void(0);"
  class="text-dark"
  on:click="{onlyView ? () => {} : () => showNoteModal(note)}"
>
  <div class="card note-card" in:fade>
    <div class="card-body">
      <h5 class="card-title font-weight-bolder">{note.title}</h5>
      <p class="card-text">{note.text}</p>
      <p class="card-text">
        <small
          class="text-muted"
        >{getTime(checkTime, parseInt(note.last_modified), $currentLocale)}</small>
      </p>
    </div>
  </div>
</a>
