import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ViewPostPage from "./pages/ViewPostPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminArticleListPage from "./pages/admin/AdminArticleListPage";
import AdminArticleFormPage from "./pages/admin/AdminArticleFormPage";
import AdminCategoryListPage from "./pages/admin/AdminCategoryListPage";
import AdminCategoryFormPage from "./pages/admin/AdminCategoryFormPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import AdminNotificationPage from "./pages/admin/AdminNotificationPage";
import AdminResetPasswordPage from "./pages/admin/AdminResetPasswordPage";
import HealthTestPage from "./pages/HealthTestPage";  

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/post/:postId" element={<ViewPostPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/test-health" element={<HealthTestPage />} />
      <Route path="/admin" element={<AdminArticleListPage />} />
      <Route path="/admin/create-article" element={<AdminArticleFormPage />} />
      <Route path="/admin/edit-article/:articleId" element={<AdminArticleFormPage />} />
      <Route path="/admin/category" element={<AdminCategoryListPage />} />
      <Route path="/admin/create-category" element={<AdminCategoryFormPage />} />
      <Route path="/admin/edit-category/:categoryId" element={<AdminCategoryFormPage />} />
      <Route path="/admin/profile" element={<AdminProfilePage />} />
      <Route path="/admin/notification" element={<AdminNotificationPage />} />
      <Route path="/admin/reset-password" element={<AdminResetPasswordPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
