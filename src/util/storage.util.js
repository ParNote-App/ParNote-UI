const LOGIN_SESSION = "login_session";

export const LoginSessionStorageUtil = {
  getStatus() {
    return localStorage.getItem(LOGIN_SESSION) === "LOGGED_IN";
  },

  setLoginSession() {
    localStorage.setItem(LOGIN_SESSION, "LOGGED_IN");
  },

  deleteSession() {
    localStorage.removeItem(LOGIN_SESSION);
  },

  isSessionSaved() {
    return !!localStorage.getItem(LOGIN_SESSION);
  },
};
