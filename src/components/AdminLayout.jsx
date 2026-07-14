import { Navigate } from "react-router-dom";
import { Navbar } from "@/components/WebSections/Navbar";
import { Footer } from "@/components/WebSections/Footer";
import AdminSidebar from "@/components/AdminSidebar";
import { useAuth } from "@/context/AuthContext";
import "@/styles/member.css";
import "@/styles/admin.css";

export default function AdminLayout({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 flex flex-col justify-between">
      <Navbar />
      <main className="member-page">
        <div className="member-container">
          <AdminSidebar />
          <section className="member-content">{children}</section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
