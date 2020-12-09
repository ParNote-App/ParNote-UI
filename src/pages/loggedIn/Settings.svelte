<script>
  import {onMount} from "svelte"
  import { isPageInitialized } from "../../Store";

  onMount(() => {
    isPageInitialized.set(true);
  })
</script>

Settings page