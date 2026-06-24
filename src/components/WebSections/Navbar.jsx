import { Menu } from 'lucide-react';

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