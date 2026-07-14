import { useState } from "react";
import { X } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const initialForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function AdminResetPasswordPage() {
  const { updatePassword } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  function handleChange(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setForm({
      ...form,
      [fieldName]: fieldValue,
    });

    setErrors({
      ...errors,
      [fieldName]: "",
    });
  }

  function validateForm() {
    const nextErrors = {};

    if (!form.currentPassword.trim()) {
      nextErrors.currentPassword = "Current password is required.";
    }

    if (!form.newPassword.trim()) {
      nextErrors.newPassword = "New password is required.";
    } else if (form.newPassword.length < 6) {
      nextErrors.newPassword = "Password must be at least 6 characters.";
    }

    if (!form.confirmPassword.trim()) {
      nextErrors.confirmPassword = "Please confirm your new password.";
    } else if (form.confirmPassword !== form.newPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setShowConfirmDialog(true);
  }

  function handleCloseDialog() {
    setShowConfirmDialog(false);
  }

  function handleConfirmReset() {
    const result = updatePassword(form.currentPassword, form.newPassword);

    if (result.error === "currentPassword") {
      setErrors({ currentPassword: result.message });
      setShowConfirmDialog(false);
      return;
    }

    if (result.error) {
      setShowConfirmDialog(false);
      return;
    }

    setForm(initialForm);
    setShowConfirmDialog(false);
    toast.success("Your password has been reset successfully.");
  }

  return (
    <AdminLayout>
      <header>
        <h1 className="member-title">Reset password</h1>
        <p className="member-subtitle">
          Choose a new password for your account.
        </p>
      </header>

      <form className="member-form" onSubmit={handleSubmit} noValidate>
        <div className="member-field">
          <label className="member-label" htmlFor="currentPassword">
            Current password
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={form.currentPassword}
            onChange={handleChange}
            className="member-input"
            placeholder="Current password"
          />
          {errors.currentPassword && (
            <p className="member-field-error">{errors.currentPassword}</p>
          )}
        </div>

        <div className="member-field">
          <label className="member-label" htmlFor="newPassword">
            New password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={handleChange}
            className="member-input"
            placeholder="New password"
          />
          {errors.newPassword && (
            <p className="member-field-error">{errors.newPassword}</p>
          )}
        </div>

        <div className="member-field">
          <label className="member-label" htmlFor="confirmPassword">
            Confirm new password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="member-input"
            placeholder="Confirm new password"
          />
          {errors.confirmPassword && (
            <p className="member-field-error">{errors.confirmPassword}</p>
          )}
        </div>

        <button type="submit" className="member-submit">
          Reset password
        </button>
      </form>

      {showConfirmDialog && (
        <>
          <button
            type="button"
            className="member-dialog-overlay"
            onClick={handleCloseDialog}
            aria-label="Close dialog overlay"
          />
          <section
            className="member-dialog-box"
            role="alertdialog"
            aria-labelledby="admin-reset-dialog-title"
            aria-describedby="admin-reset-dialog-desc"
          >
            <button
              type="button"
              onClick={handleCloseDialog}
              className="member-dialog-close"
              aria-label="Close dialog"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <h2 id="admin-reset-dialog-title" className="member-dialog-title">
              Reset password
            </h2>
            <p id="admin-reset-dialog-desc" className="member-dialog-desc">
              Do you want to reset your password?
            </p>

            <div className="member-dialog-actions">
              <button
                type="button"
                onClick={handleCloseDialog}
                className="member-dialog-cancel"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="member-dialog-reset"
              >
                Reset
              </button>
            </div>
          </section>
        </>
      )}
    </AdminLayout>
  );
}
