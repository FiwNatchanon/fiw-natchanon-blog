import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center py-5 px-6 md:px-16 border-b border-gray-200 bg-white">
      <Link to="/" className="text-3xl font-bold tracking-tighter">
        hh<span className="text-green-500">.</span>
      </Link>

      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <span className="hidden text-sm font-medium text-gray-700 md:inline">
            {user?.name}
          </span>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Log out
          </button>
        </div>
      ) : (
        <>
          <div className="hidden md:flex space-x-4">
            <Link
              to="/login"
              className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-[#2A2A2A] px-6 py-2.5 text-sm font-medium text-white hover:bg-black transition-colors"
            >
              Sign up
            </Link>
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
                  <Link
                    to="/login"
                    className="w-full rounded-full border border-gray-300 px-6 py-3 text-center text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full rounded-full bg-[#2A2A2A] px-6 py-3 text-center text-sm font-medium text-white hover:bg-black transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </nav>
  );
}
