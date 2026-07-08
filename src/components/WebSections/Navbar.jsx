import { Link } from "react-router-dom";
import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
    return (
      <nav className="flex justify-between items-center py-5 px-6 md:px-16 border-b border-gray-200 bg-white">
          <Link to="/" className="text-3xl font-bold tracking-tighter">
            hh<span className="text-green-500">.</span>
          </Link>
          <div className="hidden md:flex space-x-4">
            <button type="button" className="px-6 py-2.5 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors">
              Log in
            </button>
            <button type="button" className="px-6 py-2.5 rounded-full bg-[#2A2A2A] text-white text-sm font-medium hover:bg-black transition-colors">
              Sign up
            </button>
          </div>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" aria-label="Open menu" className="p-1">
                  <Menu className="w-6 h-6 text-gray-800" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[calc(100vw-3rem)] max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-lg"
              >
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    className="w-full px-6 py-3 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Log in
                  </button>
                  <button
                    type="button"
                    className="w-full px-6 py-3 rounded-full bg-[#2A2A2A] text-white text-sm font-medium hover:bg-black transition-colors"
                  >
                    Sign up
                  </button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
    )
  }
