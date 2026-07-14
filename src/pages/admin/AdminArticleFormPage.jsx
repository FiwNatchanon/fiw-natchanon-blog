import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import AdminLayout from "@/components/AdminLayout";
import {
  createArticle,
  getArticleById,
  getCategories,
  updateArticle,
} from "@/lib/adminStorage";

const emptyForm = {
  title: "",
  description: "",
  content: "",
  category: "",
  image: "",
};

export default function AdminArticleFormPage() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const isEditMode = Boolean(articleId);
  const categories = getCategories();

  const [form, setForm] = useState({
    ...emptyForm,
    category: categories[0]?.name || "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const article = getArticleById(articleId);

      if (article) {
        setForm({
          title: article.title,
          description: article.description,
          content: article.content,
          category: article.category,
          image: article.image,
        });
      }
    }
  }, [articleId, isEditMode]);

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
        image: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  function validateForm() {
    const nextErrors = {};

    if (!form.title.trim()) {
      nextErrors.title = "Title is required.";
    }

    if (!form.description.trim()) {
      nextErrors.description = "Description is required.";
    }

    if (!form.content.trim()) {
      nextErrors.content = "Content is required.";
    }

    if (!form.category) {
      nextErrors.category = "Category is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSave(status) {
    if (!validateForm()) {
      return;
    }

    const articleData = {
      title: form.title,
      description: form.description,
      content: form.content,
      category: form.category,
      image: form.image,
      status: status,
    };

    if (isEditMode) {
      updateArticle(articleId, articleData);
      toast.success("Article updated successfully.");
    } else {
      createArticle(articleData);
      toast.success(
        status === "draft"
          ? "Article saved as draft."
          : "Article published successfully."
      );
    }

    navigate("/admin");
  }

  return (
    <AdminLayout>
      <header>
        <h1 className="member-title">
          {isEditMode ? "Edit article" : "Create article"}
        </h1>
        <p className="member-subtitle">
          {isEditMode
            ? "Update your article information."
            : "Fill in the details to create a new article."}
        </p>
      </header>

      <form
        className="member-form admin-form-wide"
        onSubmit={(event) => event.preventDefault()}
        noValidate
      >
        <div className="member-field">
          <label className="member-label" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            className="member-input"
            placeholder="Article title"
          />
          {errors.title && (
            <p className="member-field-error">{errors.title}</p>
          )}
        </div>

        <div className="member-field">
          <label className="member-label" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            value={form.description}
            onChange={handleChange}
            className="member-input"
            placeholder="Short description"
          />
          {errors.description && (
            <p className="member-field-error">{errors.description}</p>
          )}
        </div>

        <div className="member-field">
          <label className="member-label" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            className="admin-textarea"
            placeholder="Article content"
          />
          {errors.content && (
            <p className="member-field-error">{errors.content}</p>
          )}
        </div>

        <div className="member-field">
          <label className="member-label" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="admin-select"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="member-field-error">{errors.category}</p>
          )}
        </div>

        <div className="member-field">
          <span className="member-label">Thumbnail image</span>
          <div className="admin-thumbnail-row">
            {form.image ? (
              <img
                src={form.image}
                alt="Article thumbnail preview"
                className="admin-thumbnail-preview"
              />
            ) : (
              <div className="admin-thumbnail-preview" />
            )}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="member-file-input"
                aria-label="Upload thumbnail"
              />
              <button
                type="button"
                onClick={handleUploadClick}
                className="member-upload-button"
              >
                Upload thumbnail
              </button>
            </div>
          </div>
        </div>

        <div className="admin-form-actions">
          <button
            type="button"
            onClick={() => handleSave("draft")}
            className="admin-secondary-button"
          >
            Save as draft
          </button>
          <button
            type="button"
            onClick={() => handleSave("published")}
            className="member-submit"
          >
            Save and publish
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
