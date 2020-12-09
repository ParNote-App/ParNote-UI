<script>
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
  let changePasswordButtonLoading = false;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onMount(() => {
    isPageInitialized.set(true);
  });

  function changePassword() {
    hideError();
    hideSuccess();

    changePasswordButtonLoading = true;

    (function change() {
      ApiUtil.post("user/settings/changePassword", changePasswordData)
        .then((response) => {
          if (response.data.result === "ok") {
            changePasswordButtonLoading = false;

            changePasswordData.currentPassword = "";
            changePasswordData.newPassword = "";
            changePasswordData.newPasswordRepeat = "";

            showSuccess("SUCCESSFULLY_CHANGED_PASSWORD");
          } else if (response.data.result === "error") {
            changePasswordButtonLoading = false;

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
</script>

<div class="pt-3">
  <h4 class="font-weight-bolder">Ayarlar</h4>
  <hr />
  <div class="container">
    <div class="d-block my-3">
      <i class="fas fa-user mr-2 text-muted"></i>
      <b>
        {capitalizeFirstLetter($userData.name)}
        {capitalizeFirstLetter($userData.surname)}
      </b>
      olarak giriş yapıldı.
    </div>

    <SuccessAlert />
    <ErrorAlert />

    <div class="row">
      <div class="col-lg-6 col-12 mb-3">
        <div class="card-body">
          <h6 class="font-weight-bolder pb-3">Change password</h6>

          <!-- Title Here -->

          <form on:submit|preventDefault="{changePassword}">
            <div class="form-row align-items-end">
              <div class="form-group col-md-4">
                <label for="oldPassword">Current Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="oldPassword"
                  bind:value="{changePasswordData.currentPassword}"
                />
              </div>
              <div class="form-group col-md-4">
                <label for="newPassword">New Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="newPassword"
                  bind:value="{changePasswordData.newPassword}"
                />
              </div>
              <div class="form-group col-md-4">
                <label for="repeatPassword">Repeat Password</label>
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
                class:disabled="{changePasswordButtonLoading}"
                disabled="{changePasswordButtonLoading}"
              >Save</button>
            </div>
          </form>
        </div>
      </div>

      <div class="col-lg-6 col-12 mb-3 d-none">
        <div class="card-body">
          <h6 class="font-weight-bolder pb-3">Change email</h6>

          <!-- Title Here -->

          <form action="">
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
              <div class="btn btn-primary" type="submit">Save</div>
            </div>
          </form>
        </div>
      </div>

      <div class="w-100"></div>

      <div class="col-lg-6 col-12 mb-3">
        <div class="card-body">
          <h6 class="font-weight-bolder pb-3">Delete account</h6>

          <!-- Title Here -->

          <form action="">
            <div class="form-group col-md-6">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="deleteAccount"
                />
                <label class="custom-control-label" for="deleteAccount">Delete
                  my account and all data
                  <b>permanently</b></label>
              </div>
            </div>
            <div class="form-group">
              <div class="btn btn-outline-danger" type="submit">Confirm</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
