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

export function checkLogin(handler) {
  if (!LoginSessionStorageUtil.isSessionSaved()) {
    setLogout();
  } else {
    (function check() {
      ApiUtil.post("auth/checkLoggedIn", {})
        .then((response) => {
          if (response.data.result === "ok") {
            setLoggedIn();

            handler();
          } else if (response.data.error === "NOT_LOGGED_IN") setLogout();
          else {
            setTimeout(() => {
              check();
            }, 500);
          }
        })
        .catch(() => {
          setTimeout(() => {
            check();
          }, 500);
        });
    })();
  }
}
