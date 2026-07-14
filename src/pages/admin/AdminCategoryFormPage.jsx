import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import AdminLayout from "@/components/AdminLayout";
import {
  createCategory,
  getCategoryById,
  updateCategory,
} from "@/lib/adminStorage";

export default function AdminCategoryFormPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(categoryId);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditMode) {
      const category = getCategoryById(categoryId);

      if (category) {
        setName(category.name);
      }
    }
  }, [categoryId, isEditMode]);

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }

    const result = isEditMode
      ? updateCategory(categoryId, name)
      : createCategory(name);

    if (result.error) {
      setError(result.error);
      return;
    }

    toast.success(
      isEditMode
        ? "Category updated successfully."
        : "Category created successfully."
    );
    navigate("/admin/category");
  }

  return (
    <AdminLayout>
      <header>
        <h1 className="member-title">
          {isEditMode ? "Edit category" : "Create category"}
        </h1>
        <p className="member-subtitle">
          {isEditMode
            ? "Update category name."
            : "Add a new category for your articles."}
        </p>
      </header>

      <form className="member-form" onSubmit={handleSubmit} noValidate>
        <div className="member-field">
          <label className="member-label" htmlFor="name">
            Category name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setError("");
            }}
            className="member-input"
            placeholder="Category name"
          />
          {error && <p className="member-field-error">{error}</p>}
        </div>

        <button type="submit" className="member-submit">
          Save
        </button>
      </form>
    </AdminLayout>
  );
}
