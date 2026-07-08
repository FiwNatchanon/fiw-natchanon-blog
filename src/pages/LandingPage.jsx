import { Navbar } from "@/components/WebSections/Navbar";
import { HeroSection } from "@/components/WebSections/HeroSection";
import { Footer } from "@/components/WebSections/Footer";
import ArticleSection from "@/components/WebSections/ArticleSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 flex flex-col justify-between">
      <div className="grow">
        <Navbar />
        <HeroSection />
        <ArticleSection />
      </div>
      <Footer />
    </div>
  );
}
