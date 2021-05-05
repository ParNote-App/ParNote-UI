<script>
  import { _ } from "svelte-i18n";
  import Note from "./Note.svelte";

  export let count;
  export let notes;
  export let status;
  export let checkTime;
</script>

{#if count > 0}
  <div class="card-columns">
    {#each notes as note, index (note)}
      {#if status === 4 || note.status === status}
        <Note note="{note}" checkTime="{checkTime}" />
      {/if}
    {/each}
  </div>
{:else}
  {#if status === 4}
    <div class="text-center py-4">
      <h4 class="font-weight-bolder"><i class="fas fa-search mr-1"></i></h4>
      <p>{$_('pages.logged-in.home.here-is-empty')}</p>
    </div>
  {:else if status === 3}
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
