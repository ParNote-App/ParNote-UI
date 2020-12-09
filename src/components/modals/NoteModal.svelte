<div
  class="modal"
  id="noteModal"
  tabindex="-1"
  aria-labelledby="noteModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
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
        <input
          type="text"
          class="form-control bg-transparent border-0 font-weight-normal p-1 modal-note-content"
          placeholder="..."
        />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-link" data-dismiss="modal">
          <i class="fas fa-archive mr-2"></i>
          Arşiv</button>
        <button type="button" class="btn btn-danger">
          <i class="far fa-trash-alt mr-2"></i>
          Çöp</button>
      </div>
    </div>
  </div>
</div>
