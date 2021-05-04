<script>
  import moment from "moment";
  import { fade } from "svelte/transition";
  import { _, locale as currentLocale } from "svelte-i18n";

  import NoteModal, { show as showNoteModal } from "./modals/NoteModal.svelte";

  export let count;
  export let notes;
  export let status;
  export let checkTime;

  function getTime(check, time, locale) {
    return moment(time).fromNow();
  }
</script>

{#if count > 0}
  <div class="card-columns">
    {#each notes as note, index (note)}
      {#if note.status === status}
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
                <small
                  class="text-muted"
                >{getTime(checkTime, parseInt(note.last_modified), $currentLocale)}</small>
              </p>
            </div>
          </div>
        </a>
      {/if}
    {/each}
  </div>
{:else}
  {#if status === 3}
    <div class="text-center py-4">
      <h4 class="font-weight-bolder"><i class="fas fa-trash mr-1"></i></h4>
      <p>{$_('pages.logged-in.home.here-is-empty')}</p>
    </div>
  {:else if status === 2}
    <div class="text-center py-4">
      <h4 class="font-weight-bolder"><i class="fas fa-archive mr-1"></i></h4>
      <p>{$_('pages.logged-in.home.here-is-empty')}</p>
    </div>
  {:else}
    <div class="text-center py-4">
      <h4 class="font-weight-bolder">
        <i class="fas fa-sticky-note mr-1"></i>
      </h4>
      <p>{$_('pages.logged-in.home.here-is-empty')}</p>
      <br />
      <button
        type="button"
        class="btn btn-outline-primary"
        on:click="{() => showNoteModal()}"
      >
        <i class="fas fa-plus mr-1"></i>
        {$_('pages.logged-in.home.new-note')}
      </button>
    </div>
  {/if}
{/if}
