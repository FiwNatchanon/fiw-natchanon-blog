import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/WebSections/Navbar";
import { Footer } from "@/components/WebSections/Footer";
import { useAuth } from "@/context/AuthContext";
import { isValidEmail } from "@/lib/authStorage";
import "@/styles/auth.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setFormError("");
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!isValidEmail(form.email)) {
      nextErrors.email = "Email must be a valid email.";
    }

    if (!form.password.trim()) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError("");

    if (!validateForm()) return;

    const result = login(form.email, form.password);

    if (result.error) {
      setFormError(result.error);
      return;
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 flex flex-col justify-between">
      <Navbar />
      <main className="auth-page">
        <section className="auth-card">
          <h1 className="auth-title">Log in</h1>
          <p className="auth-subtitle">Welcome back! Please enter your details.</p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {formError && <p className="auth-form-error">{formError}</p>}

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

            <button type="submit" className="auth-submit">
              Log in
            </button>
          </form>

          <p className="auth-footer-text">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="auth-footer-link">
              Sign up
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
