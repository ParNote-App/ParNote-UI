<style global>
  .grecaptcha-badge {
    visibility: hidden;
  }
</style>

<script context="module">
  let lastID = 0;
  const recaptcha = "recaptcha-";
  const list = [];

  export function execute(id) {
    window.grecaptcha.execute(list[id]);
  }

  export function reset(id) {
    window.grecaptcha.reset(list[id]);
  }
</script>

<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { writable } from "svelte/store";

  const dispatch = createEventDispatcher();
  const id = lastID + 1;

  export let recaptchaID = writable(0);

  recaptchaID.set(id);

  lastID += 1;

  function dataCallback(token) {
    dispatch("callback", { token: token });
  }

  function dataErrorCallback() {
    dispatch("errorCallback");
  }

  onMount(() => {
    window.grecaptcha.ready(() => {
      list[id] = window.grecaptcha.render(recaptcha + id, {
        sitekey: process.env.RECAPTCHA_API_KEY,
        size: "invisible",
        callback: dataCallback,
        "error-callback": dataErrorCallback
      });
    });
  });

  onDestroy(() => {
    list[id] = null;
  });
</script>

<!--This site is protected by reCAPTCHA and the Google-->
<!--<a href="https://policies.google.com/privacy" target="_blank">Privacy Policy</a>-->
<!--and-->
<!--<a href="https://policies.google.com/terms" target="_blank">Terms of Service</a>-->
<!--apply.-->

<div id="{recaptcha + id}"></div>
