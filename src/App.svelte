<style lang="scss" global>
  @import "styles/style";
</style>

<script>
  import "./util/language.util";
  import Splash from "./components/Splash.svelte";

  const showSplash = false;
</script>

{#if showSplash}
  <Splash />
{/if}

<!-- Main Contents Hidden -->
{#await import('./components/Main.svelte') then MainComponent}
  <svelte:component this="{MainComponent.default}" hidden="{showSplash}" />
{/await}
