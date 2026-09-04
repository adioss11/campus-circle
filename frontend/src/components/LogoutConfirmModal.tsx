type LogoutConfirmModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

export function LogoutConfirmModal({
  onCancel,
  onConfirm,
}: LogoutConfirmModalProps) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onCancel}>
      <div
        className="modal logout-modal"
        role="dialog"
        aria-labelledby="logout-title"
        aria-describedby="logout-copy"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="logout-title">Log out?</h2>
        <p id="logout-copy" className="auth-copy">
          Are you sure you want to log out?
        </p>
        <div className="modal-actions">
          <button type="button" className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="primary-button" onClick={onConfirm}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
