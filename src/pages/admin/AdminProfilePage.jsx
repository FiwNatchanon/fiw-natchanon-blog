import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "@/components/AdminLayout";
import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/context/AuthContext";
import { isValidEmail } from "@/lib/authStorage";

export default function AdminProfilePage() {
  const { user, updateProfile } = useAuth();
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    profilePicture: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture || "",
      });
    }
  }, [user]);

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

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm({
        ...form,
        profilePicture: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  function validateForm() {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!form.username.trim()) {
      nextErrors.username = "Username is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!isValidEmail(form.email)) {
      nextErrors.email = "Email must be a valid email.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = updateProfile(form);

    if (result.error === "email" || result.error === "username") {
      setErrors({ [result.error]: result.message });
      return;
    }

    if (result.error) {
      return;
    }

    toast.success("Saved profile", {
      description: "Your profile has been updated successfully.",
    });
  }

  const previewUser = {
    name: form.name,
    profilePicture: form.profilePicture,
  };

  return (
    <AdminLayout>
      <header>
        <h1 className="member-title">Profile</h1>
        <p className="member-subtitle">Manage your account information.</p>
      </header>

      <section className="member-avatar-row">
        <UserAvatar user={previewUser} size="lg" />
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="member-file-input"
            aria-label="Upload profile picture"
          />
          <button
            type="button"
            onClick={handleUploadClick}
            className="member-upload-button"
          >
            Upload profile picture
          </button>
        </div>
      </section>

      <form className="member-form" onSubmit={handleSubmit} noValidate>
        <div className="member-field">
          <label className="member-label" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="member-input"
            placeholder="Name"
          />
          {errors.name && <p className="member-field-error">{errors.name}</p>}
        </div>

        <div className="member-field">
          <label className="member-label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            className="member-input"
            placeholder="Username"
          />
          {errors.username && (
            <p className="member-field-error">{errors.username}</p>
          )}
        </div>

        <div className="member-field">
          <label className="member-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="member-input"
            placeholder="Email"
          />
          {errors.email && <p className="member-field-error">{errors.email}</p>}
        </div>

        <button type="submit" className="member-submit">
          Save
        </button>
      </form>
    </AdminLayout>
  );
}
