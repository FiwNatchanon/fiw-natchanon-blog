import { X } from "lucide-react";
import "@/styles/member.css";

export default function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "Delete",
  onClose,
  onConfirm,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="member-dialog-overlay"
        onClick={onClose}
        aria-label="Close dialog overlay"
      />
      <section
        className="member-dialog-box"
        role="alertdialog"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-desc"
      >
        <button
          type="button"
          onClick={onClose}
          className="member-dialog-close"
          aria-label="Close dialog"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <h2 id="confirm-dialog-title" className="member-dialog-title">
          {title}
        </h2>
        <p id="confirm-dialog-desc" className="member-dialog-desc">
          {description}
        </p>

        <div className="member-dialog-actions">
          <button type="button" onClick={onClose} className="member-dialog-cancel">
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="member-dialog-reset"
          >
            {confirmLabel}
          </button>
        </div>
      </section>
    </>
  );
}
