import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import ConfirmDialog from "@/components/ConfirmDialog";
import { deleteCategory, getCategories } from "@/lib/adminStorage";
import { toast } from "sonner";

export default function AdminCategoryListPage() {
  const [categories, setCategories] = useState(getCategories());
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredCategories = useMemo(() => {
    if (!search.trim()) {
      return categories;
    }

    const keyword = search.toLowerCase();

    return categories.filter((category) =>
      category.name.toLowerCase().includes(keyword)
    );
  }, [categories, search]);

  function handleDeleteConfirm() {
    if (!deleteTarget) {
      return;
    }

    deleteCategory(deleteTarget.id);
    setCategories(getCategories());
    setDeleteTarget(null);
    toast.success("Category deleted successfully.");
  }

  return (
    <AdminLayout>
      <header className="admin-header-row">
        <div>
          <h1 className="member-title">Category management</h1>
          <p className="member-subtitle">Manage blog categories.</p>
        </div>
        <Link to="/admin/create-category" className="admin-create-button">
          Create category
        </Link>
      </header>

      <section className="admin-toolbar">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="admin-search"
          placeholder="Search categories..."
          aria-label="Search categories"
        />
      </section>

      {filteredCategories.length === 0 ? (
        <p className="admin-empty">No categories found.</p>
      ) : (
        <ul className="admin-category-list">
          {filteredCategories.map((category) => (
            <li key={category.id} className="admin-category-item">
              <span className="admin-category-name">{category.name}</span>
              <div className="admin-actions">
                <Link
                  to={`/admin/edit-category/${category.id}`}
                  className="admin-action-button"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(category)}
                  className="admin-action-button admin-action-button--delete"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        isOpen={deleteTarget !== null}
        title="Delete category"
        description="Do you want to delete this category?"
        confirmLabel="Delete"
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </AdminLayout>
  );
}
