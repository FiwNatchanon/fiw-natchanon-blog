import { Navigate } from "react-router-dom";
import { Navbar } from "@/components/WebSections/Navbar";
import { Footer } from "@/components/WebSections/Footer";
import MemberSidebar from "@/components/MemberSidebar";
import { useAuth } from "@/context/AuthContext";
import "@/styles/member.css";

export default function MemberLayout({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 flex flex-col justify-between">
      <Navbar />
      <main className="member-page">
        <div className="member-container">
          <MemberSidebar />
          <section className="member-content">{children}</section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
