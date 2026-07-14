import { NavLink } from "react-router-dom";
import { User, Lock } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/context/AuthContext";
import "@/styles/member.css";

export default function MemberSidebar() {
  const { user } = useAuth();

  return (
    <aside className="member-sidebar">
      <div className="member-sidebar-user">
        <UserAvatar user={user} size="md" />
        <span className="member-sidebar-name">{user?.name}</span>
      </div>

      <nav className="member-sidebar-nav" aria-label="Member menu">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `member-sidebar-link${isActive ? " member-sidebar-link--active" : ""}`
          }
        >
          <User size={18} aria-hidden="true" />
          Profile
        </NavLink>

        <NavLink
          to="/reset-password"
          className={({ isActive }) =>
            `member-sidebar-link${isActive ? " member-sidebar-link--active" : ""}`
          }
        >
          <Lock size={18} aria-hidden="true" />
          Reset password
        </NavLink>
      </nav>
    </aside>
  );
}
