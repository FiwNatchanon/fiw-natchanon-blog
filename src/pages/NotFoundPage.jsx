import { Link } from "react-router-dom";
import { CircleAlert } from "lucide-react";
import { Navbar } from "@/components/WebSections/Navbar";
import { Footer } from "@/components/WebSections/Footer";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 flex flex-col justify-between">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <CircleAlert className="mb-6 size-12 text-gray-400" aria-hidden="true" />
        <h1 className="text-3xl font-bold text-[#222] mb-8">Page Not Found</h1>
        <Link
          to="/"
          className="rounded-full bg-[#2A2A2A] px-8 py-3 text-sm font-medium text-white hover:bg-black transition-colors"
        >
          Go To Homepage
        </Link>
      </main>
      <Footer />
    </div>
  );
}
