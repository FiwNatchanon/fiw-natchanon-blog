import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/WebSections/Navbar";
import { Footer } from "@/components/WebSections/Footer";
import { useAuth } from "@/context/AuthContext";
import { isValidEmail } from "@/lib/authStorage";
import "@/styles/auth.css";

const initialForm = {
  name: "",
  username: "",
  email: "",
  password: "",
};

export default function SignUpPage() {
  const { register, loading } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

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
    setFormError("");
  }

  const validateForm = () => {
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

    if (!form.password.trim()) {
      nextErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!validateForm()) return;

    const result = await register(form);

    if (result?.error) {
      if (result.error === "email") {
        setErrors({ email: result.message });
      } else if (result.error === "username") {
        setErrors({ username: result.message });
      } else {
        setFormError(result.message || "Registration failed. Please try again.");
      }
      return;
    }

    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 flex flex-col justify-between">
      <Navbar />
      <main className="auth-page">
        <section className="auth-card">
          {isSuccess ? (
            <div className="auth-success">
              <h1 className="auth-success-title">Registration success</h1>
              <p className="auth-success-text">
                Your account has been created successfully.
              </p>
              <Link to="/login" className="auth-continue">
                Continue
              </Link>
            </div>
          ) : (
            <>
              <h1 className="auth-title">Sign up</h1>
              <p className="auth-subtitle">Create your account to join the community.</p>

              <form className="auth-form" onSubmit={handleSubmit} noValidate>
                {formError && <p className="auth-form-error">{formError}</p>}

                <div className="auth-field">
                  <label className="auth-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="Name"
                  />
                  {errors.name && <p className="auth-field-error">{errors.name}</p>}
                </div>

                <div className="auth-field">
                  <label className="auth-label" htmlFor="username">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="Username"
                  />
                  {errors.username && (
                    <p className="auth-field-error">{errors.username}</p>
                  )}
                </div>

                <div className="auth-field">
                  <label className="auth-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="Email"
                  />
                  {errors.email && <p className="auth-field-error">{errors.email}</p>}
                </div>

                <div className="auth-field">
                  <label className="auth-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="auth-field-error">{errors.password}</p>
                  )}
                </div>

                <button type="submit" className="auth-submit" disabled={loading}>
                  {loading ? "Signing up..." : "Sign up"}
                </button>
              </form>

              <p className="auth-footer-text">
                Already have an account?{" "}
                <Link to="/login" className="auth-footer-link">
                  Log in
                </Link>
              </p>
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
