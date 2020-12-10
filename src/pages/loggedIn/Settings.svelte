<script>
  import {_} from "svelte-i18n"
  import { onMount } from "svelte";

  import { isPageInitialized, userData } from "../../Store";
  import ApiUtil from "../../util/api.util";

  import SuccessAlert, {
    show as showSuccess,
    hide as hideSuccess,
  } from "../../components/SuccessAlert.svelte";
  import ErrorAlert, {
    show as showError,
    hide as hideError,
  } from "../../components/ErrorAlert.svelte";

  let changePasswordData = {
    currentPassword: "",
    newPassword: "",
    newPasswordRepeat: "",
  };
  let buttonsLoading = false;

  let deleteAccountData = {
    confirm: false,
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onMount(() => {
    isPageInitialized.set(true);
  });

  function changePassword() {
    hideError();
    hideSuccess();

    buttonsLoading = true;

    (function change() {
      ApiUtil.post("user/settings/changePassword", changePasswordData)
        .then((response) => {
          if (response.data.result === "ok") {
            buttonsLoading = false;

            changePasswordData.currentPassword = "";
            changePasswordData.newPassword = "";
            changePasswordData.newPasswordRepeat = "";

            showSuccess("SUCCESSFULLY_CHANGED_PASSWORD");
          } else if (response.data.result === "error") {
            buttonsLoading = false;

            showError(response.data.error);
          } else
            setTimeout(() => {
              change();
            }, 500);
        })
        .catch(() => {
          setTimeout(() => {
            change();
          }, 500);
        });
    })();
  }

  function deleteAccount() {
    hideError();
    hideSuccess();

    buttonsLoading = true;

    (function deleteAcc() {
      ApiUtil.post("user/settings/deleteAccount", deleteAccountData)
        .then((response) => {
          if (response.data.result === "ok") {
            window.location = "/";
          } else if (response.data.result === "error") {
            buttonsLoading = false;

            showError(response.data.error);
          } else
            setTimeout(() => {
              deleteAcc();
            }, 500);
        })
        .catch(() => {
          setTimeout(() => {
            deleteAcc();
          }, 500);
        });
    })();
  }
</script>

<div class="pt-3">
  <h4 class="font-weight-bolder">{$_("pages.logged-in.settings.title")}</h4>
  <hr />
  <div class="container">
    <div class="d-block my-3">
      <i class="fas fa-user mr-2 text-muted"></i>
      <b>
        {capitalizeFirstLetter($userData.name)}
        {capitalizeFirstLetter($userData.surname)}
      </b>
    </div>

    <SuccessAlert />
    <ErrorAlert />

    <div class="row">
      <div class="col-lg-6 col-12 mb-3">
        <div class="card-body">
          <h6 class="font-weight-bolder pb-3">{$_("pages.logged-in.settings.change-password-title")}</h6>

          <!-- Title Here -->

          <form on:submit|preventDefault="{changePassword}">
            <div class="form-row align-items-end">
              <div class="form-group col-md-4">
                <label for="oldPassword">{$_("pages.logged-in.settings.change-password-form.current-password")}</label>
                <input
                  type="password"
                  class="form-control"
                  id="oldPassword"
                  bind:value="{changePasswordData.currentPassword}"
                />
              </div>
              <div class="form-group col-md-4">
                <label for="newPassword">{$_("pages.logged-in.settings.change-password-form.new-password")}</label>
                <input
                  type="password"
                  class="form-control"
                  id="newPassword"
                  bind:value="{changePasswordData.newPassword}"
                />
              </div>
              <div class="form-group col-md-4">
                <label for="repeatPassword">{$_("pages.logged-in.settings.change-password-form.repeat-password")}</label>
                <input
                  type="password"
                  class="form-control"
                  id="repeatPassword"
                  bind:value="{changePasswordData.newPasswordRepeat}"
                />
              </div>
            </div>
            <div class="form-group">
              <button
                type="submit"
                class="btn btn-primary"
                class:disabled="{buttonsLoading}"
                disabled="{buttonsLoading}"
              >{$_("pages.logged-in.settings.change-password-form.save")}</button>
            </div>
          </form>
        </div>
      </div>

      <div class="col-lg-6 col-12 mb-3 d-none">
        <div class="card-body">
          <h6 class="font-weight-bolder pb-3">Change email</h6>

          <!-- Title Here -->

          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="oldEmail">Email</label>
                <input
                  type="email"
                  class="form-control bg-transparent"
                  id="oldEmail"
                  disabled
                />
              </div>
              <div class="form-group col-md-6">
                <label for="newEmail">New Email</label>
                <input type="email" class="form-control" id="newEmail" />
              </div>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>

      <div class="w-100"></div>

      <div class="col-lg-6 col-12 mb-3">
        <div class="card-body">
          <h6 class="font-weight-bolder pb-3">{$_("pages.logged-in.settings.delete-account-title")}</h6>

          <!-- Title Here -->

          <form on:submit|preventDefault="{deleteAccount}">
            <div class="form-group col-md-6">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="deleteAccount"
                  bind:checked="{deleteAccountData.confirm}"
                />
                <label class="custom-control-label" for="deleteAccount">{@html $_("pages.logged-in.settings.delete-account-form.delete-my-account-permanently")}</label>
              </div>
            </div>
            <div class="form-group">
              <button
                type="submit"
                class="btn btn-outline-danger"
                class:disabled="{buttonsLoading}"
                disabled="{buttonsLoading}"
              >{$_("pages.logged-in.settings.delete-account-form.confirm")}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
