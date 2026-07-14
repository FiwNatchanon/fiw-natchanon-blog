import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import ConfirmDialog from "@/components/ConfirmDialog";
import { deleteArticle, getArticles, getCategories } from "@/lib/adminStorage";
import { formatDate } from "@/utils/blogHelpers";
import { toast } from "sonner";

export default function AdminArticleListPage() {
  const [articles, setArticles] = useState(getArticles());
  const categories = getCategories();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredArticles = useMemo(() => {
    let result = articles;

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter((article) =>
        article.title.toLowerCase().includes(keyword)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((article) => article.status === statusFilter);
    }

    if (categoryFilter !== "all") {
      result = result.filter((article) => article.category === categoryFilter);
    }

    return result;
  }, [articles, search, statusFilter, categoryFilter]);

  function handleDeleteConfirm() {
    if (!deleteTarget) {
      return;
    }

    deleteArticle(deleteTarget.id);
    setArticles(getArticles());
    setDeleteTarget(null);
    toast.success("Article deleted successfully.");
  }

  return (
    <AdminLayout>
      <header className="admin-header-row">
        <div>
          <h1 className="member-title">Article management</h1>
          <p className="member-subtitle">Manage your blog articles.</p>
        </div>
        <Link to="/admin/create-article" className="admin-create-button">
          Create article
        </Link>
      </header>

      <section className="admin-toolbar">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="admin-search"
          placeholder="Search articles..."
          aria-label="Search articles"
        />
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="admin-select"
          aria-label="Filter by status"
        >
          <option value="all">All status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className="admin-select"
          aria-label="Filter by category"
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </section>

      {filteredArticles.length === 0 ? (
        <p className="admin-empty">No articles found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => (
                <tr key={article.id}>
                  <td>{article.title}</td>
                  <td>{article.category}</td>
                  <td>
                    <span
                      className={`admin-status admin-status--${article.status}`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td>{formatDate(article.date)}</td>
                  <td>
                    <div className="admin-actions">
                      <Link
                        to={`/admin/edit-article/${article.id}`}
                        className="admin-action-button"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(article)}
                        className="admin-action-button admin-action-button--delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteTarget !== null}
        title="Delete article"
        description="Do you want to delete this article?"
        confirmLabel="Delete"
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </AdminLayout>
  );
}
