import { NavLink } from "react-router-dom";
import {
  FileText,
  FolderOpen,
  User,
  Bell,
  Lock,
} from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/context/AuthContext";
import "@/styles/member.css";

const adminLinks = [
  { to: "/admin", label: "Article management", icon: FileText, end: true },
  { to: "/admin/category", label: "Category management", icon: FolderOpen },
  { to: "/admin/profile", label: "Profile", icon: User },
  { to: "/admin/notification", label: "Notification", icon: Bell },
  { to: "/admin/reset-password", label: "Reset password", icon: Lock },
];

export default function AdminSidebar() {
  const { user } = useAuth();

  return (
    <aside className="member-sidebar">
      <div className="member-sidebar-user">
        <UserAvatar user={user} size="md" />
        <span className="member-sidebar-name">{user?.name}</span>
      </div>

      <nav className="member-sidebar-nav" aria-label="Admin menu">
        {adminLinks.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `member-sidebar-link${isActive ? " member-sidebar-link--active" : ""}`
              }
            >
              <Icon size={18} aria-hidden="true" />
              {link.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
