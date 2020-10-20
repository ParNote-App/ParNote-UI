import jquery from "jquery";
import Popper from "popper.js";
import "bootstrap";

import { ApiUtil } from "./util/api.util";

import App from "./App.svelte";

ApiUtil.init(process.env.API_URL);

window.jQuery = window.jquery = window.$ = jquery;
window.Popper = Popper;

const app = new App({
  target: document.body,
});

export default app;
