import { Link } from "react-router-dom";
import { Menu, User, Lock, LayoutDashboard, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationBell from "@/components/NotificationBell";
import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/context/AuthContext";
import "@/styles/navbar.css";

function UserMenu() {
  const { user, logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="navbar-user-trigger">
          <UserAvatar user={user} size="sm" />
          <span className="navbar-user-name">{user?.name}</span>
          <ChevronDown className="h-4 w-4 text-gray-500" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
        <DropdownMenuItem asChild>
          <Link to="/profile" className="navbar-menu-link">
            <User size={16} aria-hidden="true" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/reset-password" className="navbar-menu-link">
            <Lock size={16} aria-hidden="true" />
            Reset password
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/admin" className="navbar-menu-link">
            <LayoutDashboard size={16} aria-hidden="true" />
            Admin panel
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={logout}
          className="rounded-lg px-3 py-2.5 text-sm font-medium"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar() {
  const { isLoggedIn } = useAuth();

  return (
    <nav className="flex justify-between items-center py-5 px-6 md:px-16 border-b border-gray-200 bg-[#FAFAFA]">
      <Link to="/" className="text-3xl font-bold tracking-tighter">
        hh<span className="text-green-500">.</span>
      </Link>

      {isLoggedIn ? (
        <div className="navbar-actions">
          <NotificationBell />
          <UserMenu />
        </div>
      ) : (
        <>
          <div className="hidden md:flex space-x-4">
            <Link
              to="/login"
              className="bg-white rounded-full border border-gray-500 px-6 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
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
