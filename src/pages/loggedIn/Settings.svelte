<script>
  import { onMount } from "svelte";
  import { isPageInitialized } from "../../Store";

  import { userData } from "../../Store";

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onMount(() => {
    isPageInitialized.set(true);
  });
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

    <div class="row">
      <div class="col-lg-6 col-12 mb-3">
        <div class="card-body">
          <h6 class="font-weight-bolder pb-3">Change password</h6>

          <!-- Title Here -->

          <form action="">
            <div class="form-row align-items-end">
              <div class="form-group col-md-4">
                <label for="oldPassword">Current Password</label>
                <input type="password" class="form-control" id="oldPassword" />
              </div>
              <div class="form-group col-md-4">
                <label for="newPassword">New Password</label>
                <input type="password" class="form-control" id="newPassword" />
              </div>
              <div class="form-group col-md-4">
                <label for="repeatPassword">Repeat Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="repeatPassword"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="btn btn-primary" type="submit">Save</div>
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
