<script>
  import { onDestroy, onMount } from "svelte";
  import { route } from "routve";

  import { isPageInitialized } from "../../Store";
  import ApiUtil from "../../util/api.util";
  import Note from "../../components/Note.svelte";

  export let token = "";

  let note = {};
  let checkTime = 0;
  let interval;

  function getBasicData(handler = () => {}) {
    ApiUtil.post("shareLink/get", { token })
      .then((response) => {
        if (response.data.result === "ok") {
          note = response.data.note;

          isPageInitialized.set(true);

          handler();
        } else {
          route("/error-404");
        }
      })
      .catch(() => {
        setTimeout(() => {
          getData(handler);
        }, 500);
      });
  }

  onMount(() => {
    getBasicData();

    interval = setInterval(() => {
      checkTime += 1;
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<Note note="{note}" onlyView="{true}" checkTime="{checkTime}" />
