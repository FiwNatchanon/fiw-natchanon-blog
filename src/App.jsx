import React from 'react';
import { Navbar } from './components/WebSections/Navbar';
import { HeroSection } from './components/WebSections/HeroSection';
import { Footer } from './components/WebSections/Footer';
import ArticleSection from './components/WebSections/ArticleSection';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 flex flex-col justify-between">
      {/* เพิ่ม flex-grow ตรงนี้ เพื่อบังคับให้ส่วนเนื้อหาตรงกลางขยายตัวดัน Footer ลงไปข้างล่างสุด */}
      <div className="grow">
        <Navbar />
        <HeroSection />
        <ArticleSection />
      </div>
      <Footer />
    </div>
  );
}

