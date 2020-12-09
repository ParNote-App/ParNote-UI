<div
  class="modal"
  id="noteModal"
  tabindex="-1"
  aria-labelledby="noteModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header border-bottom-0">
        <input
          type="text"
          class="form-control form-control-lg bg-transparent border-0 font-weight-bolder p-1 modal-note-content"
          placeholder="Note title"
        />
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-floating">
          <textarea
            class="form-control bg-transparent border-0 font-weight-normal p-1 modal-note-content"
            placeholder="..."
            id="noteNote"
            style="height: 100px"
          ></textarea>
        </div>
      </div>
      <div class="modal-footer border-top-0">
        <button
          type="button"
          class="btn btn-link text-danger"
          data-dismiss="modal"
        >
          <i class="far fa-trash-alt mr-2"></i>
          Çöp</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal">
          <i class="fas fa-archive mr-2"></i>
          Arşiv</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal">
          <i class="fas fa-trash-alt mr-2"></i>
          Kalıcı Sil</button>
      </div>
    </div>
  </div>
</div>
