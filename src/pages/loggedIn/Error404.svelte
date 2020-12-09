<script>
  import {onMount} from "svelte"
  import { isPageInitialized } from "../../Store";

  onMount(() => {
    isPageInitialized.set(true);
  })
</script>

<h1>Error 404 page!</h1>