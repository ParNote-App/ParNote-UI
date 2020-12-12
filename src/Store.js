import {writable} from "svelte/store"

export const isPageInitialized = writable(false);
export const isBasicDataInitialized = writable(false);
export const forceNotLoggedInView = writable(false);

export const userData = writable({ name: "", surname: "", username: "", email: "" });