import { writable } from "svelte/store";

import { LoginSessionStorageUtil } from "./storage.util";
import ApiUtil from "./api.util";

export const LoginStates = {
  LOGGED_IN: "LOGGED_IN",
  LOGGED_OUT: "LOGGED_OUT",
  LOADING: "LOADING",
};
export const loginStatus = writable(LoginStates.LOADING);

export function setLoggedIn() {
  LoginSessionStorageUtil.setLoginSession();
  loginStatus.set(LoginStates.LOGGED_IN);
}

export function setLogout() {
  LoginSessionStorageUtil.deleteSession();
  loginStatus.set(LoginStates.LOGGED_OUT);
}

export function checkLogin() {
  if (!LoginSessionStorageUtil.isSessionSaved()) {
    setLogout();
  } else {
    ApiUtil.post("auth/checkLoggedIn", {})
      .then((response) => {
        if (response.data.result === "ok") setLoggedIn();
        else setLogout();
      })
      .catch(() => {
        setLogout();
      });
  }
}
