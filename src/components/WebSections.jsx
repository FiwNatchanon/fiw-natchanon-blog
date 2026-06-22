import { FaLinkedin, FaGithub, FaGoogle } from 'react-icons/fa'; 
import { Search, Menu } from 'lucide-react';
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,  
  SelectValue,
} from "@/components/ui/select"

export function Navbar() {
  return (
    <nav className="flex justify-between items-center py-5 px-6 md:px-16 border-b border-gray-200 bg-white">
        <div className="text-3xl font-bold tracking-tighter">
          hh<span className="text-green-500">.</span>
        </div>
        {/* ซ่อนปุ่มในมือถือ และแสดงเฉพาะจอขนาด md ขึ้นไป */}
        <div className="hidden md:flex space-x-4">
          <button className="px-6 py-2.5 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors">
            Log in
          </button>
          <button className="px-6 py-2.5 rounded-full bg-[#2A2A2A] text-white text-sm font-medium hover:bg-black transition-colors">
            Sign up
          </button>
        </div>
        {/* แสดง Hamburger Menu เฉพาะในมือถือ */}
        <div className="md:hidden">
          <Menu className="w-6 h-6 text-gray-800 cursor-pointer" />
        </div>
      </nav>
  )
}
  
export function HeroSection() {
    return (
      <main className="max-w-9xl mx-auto px-6 md:px-12 mt-16 lg:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            
            {/* Left: Headline - ปรับให้อยู่ตรงกลางในมือถือ (items-center text-center) */}
            <div className="flex flex-col items-center text-center lg:items-end lg:text-right">
              <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-6 text-[#222]">
                Stay<br /> Informed,<br />Stay Inspired
              </h1>
              <p className="text-gray-500 max-w-[300px] text-lg font-medium leading-relaxed">
                Discover a World of Knowledge at Your Fingertips. Your Daily Dose of Inspiration and Information.
              </p>
            </div>
  
            {/* Center: Image */}
            <div className="flex justify-center">
              <div className="w-full max-w-[340px] h-[480px] rounded-4xl overflow-hidden shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Author with cat in autumn forest" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
  
            {/* Right: Author Info */}
            <div className="flex flex-col items-start pr-4 lg:pr-12">
              <span className="text-[10px] text-gray-500 font-semibold tracking-widest uppercase mb-1">
                -Author
              </span>
              <h2 className="text-3xl font-bold mb-4 text-[#222]">Natchano Y.</h2>
              <p className="text-gray-500 text-lg font-medium leading-relaxed mb-4">
                I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.
              </p>
              <p className="text-gray-500 text-lg font-medium leading-relaxed">
                When I'm not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes.
              </p>
            </div>
          </div>       
        </main>
    )
}

export default function ArticleSection() {
  return (
    <section className="w-full max-w-[1980px] mx-auto px-6 md:px-12 xl:px-20 mt-20">
      <h3 className="text-3xl font-bold text-[#222] mb-6">Latest articles</h3>
      
      {/* ---------------------------------------------------- */}
      {/* 1. UI สำหรับหน้าจอ Desktop (ซ่อนในมือถือ) */}
      {/* ---------------------------------------------------- */}
      <div className="hidden md:flex bg-[#F4F4F4] rounded-2xl p-3 justify-between items-center gap-4">
        {/* Tabs */}
        <div className="flex space-x-1">
          <button className="px-6 py-2 bg-[#E2E2E2] text-gray-800 rounded-xl text-sm font-semibold">
            Highlight
          </button>
          <button className="px-6 py-2 text-gray-500 hover:text-gray-800 rounded-xl text-sm font-medium transition-colors">
            Cat
          </button>
          <button className="px-6 py-2 text-gray-500 hover:text-gray-800 rounded-xl text-sm font-medium transition-colors">
            Inspiration
          </button>
          <button className="px-6 py-2 text-gray-500 hover:text-gray-800 rounded-xl text-sm font-medium transition-colors">
            General
          </button>
        </div>

        {/* Search */}
        <div className="relative w-[300px]">
          <Input 
            placeholder="Search" 
            className="w-full pl-4 pr-10 py-2.5 h-auto rounded-xl bg-white border border-gray-200 focus-visible:ring-2 focus-visible:ring-gray-200 text-sm shadow-sm" 
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. UI สำหรับหน้าจอ Mobile (ซ่อนใน Desktop) */}
      {/* ---------------------------------------------------- */}
      <div className="flex md:hidden bg-[#F4F4F4] rounded-2xl p-5 flex-col gap-5">
        
        {/* Search Bar (Mobile) */}
        <div className="relative w-full">
          <Input 
            placeholder="Search" 
            className="w-full pl-4 pr-12 py-3.5 h-auto rounded-xl bg-white border border-gray-200 focus-visible:ring-2 focus-visible:ring-gray-200 text-base shadow-sm" 
          />
          {/* แยก Icon ออกมาจัด Layout แบบ Absolute ต่างหาก */}
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
        </div>

        {/* Category Select (Mobile) */}
        <div>
          <label className="block text-gray-500 font-medium mb-2 text-[15px]">
            Category
          </label>
          <Select defaultValue="highlight">
            {/* ปรับเป็น py-6 ตามที่คุณต้องการ และปรับสี text เป็นสีเทา (text-gray-600) */}
            <SelectTrigger className="w-full bg-white h-auto py-6.5 px-4 rounded-xl border-gray-200 text-base font-medium text-gray-500 shadow-sm focus:ring-2 focus:ring-gray-200">
              <SelectValue /> 
            </SelectTrigger>
            {/* ใช้ w-[--radix-select-trigger-width] เพื่อบังคับให้เมนูมีความกว้างเท่ากับช่อง Trigger เป๊ะๆ */}
            <SelectContent className="rounded-xl w-[--radix-select-trigger-width]">
              <SelectGroup>
                {/* ใส่ text-gray-600 ให้ทุก Item เพื่อให้ตัวหนังสือเป็นสีเทาตามต้องการ */}
                <SelectItem value="highlight" className="text-base text-gray-600 rounded-lg py-2 cursor-pointer">Highlight</SelectItem>
                <SelectItem value="cat" className="text-base text-gray-600 rounded-lg py-2 cursor-pointer">Cat</SelectItem>
                <SelectItem value="inspiration" className="text-base text-gray-600 rounded-lg py-2 cursor-pointer">Inspiration</SelectItem>
                <SelectItem value="general" className="text-base text-gray-600 rounded-lg py-2 cursor-pointer">General</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-[#F4F4F4] py-8 px-6 md:px-12 mt-16 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center gap-6">
        <span className="text-sm font-semibold text-gray-800">Get in touch</span>
        
        {/* ส่วนแสดง Icons */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2A2A2A] text-white hover:bg-black transition-colors">
            <FaLinkedin size={15} />
          </a>
          <a href="https://github.com/FiwNatchanon" target='_blank' className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2A2A2A] text-white hover:bg-black transition-colors">
            <FaGithub size={15} />
          </a>
          <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2A2A2A] text-white hover:bg-black transition-colors">
            <FaGoogle size={15} />
          </a>
        </div>
      </div>

      <div className="mt-6 md:mt-0">
        <a href="#" className="text-sm font-semibold text-gray-800 underline decoration-1 underline-offset-4 hover:text-black">
          Home page
        </a>
      </div>
    </footer>
  );
}

