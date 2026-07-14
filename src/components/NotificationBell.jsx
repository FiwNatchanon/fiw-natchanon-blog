import { useState } from "react";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockNotifications } from "@/data/notifications";
import "@/styles/navbar.css";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const hasUnread = notifications.length > 0;

  function handleOpenChange(isOpen) {
    // ล้างแจ้งเตือนหลังจากผู้ใช้ปิด dropdown (ไม่ใช่ตอนเปิด)
    if (!isOpen) {
      setNotifications([]);
    }
  }

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="navbar-bell-button"
          aria-label="Notifications"
        >
          <Bell size={20} aria-hidden="true" />
          {hasUnread && <span className="navbar-bell-dot" aria-hidden="true" />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="navbar-notification-panel border border-gray-200 bg-white shadow-lg"
      >
        {notifications.length === 0 ? (
          <p className="px-3 py-4 text-center text-sm text-gray-500">
            No new notifications
          </p>
        ) : (
          notifications.map((item) => (
            <article key={item.id} className="navbar-notification-item">
              <img
                src={item.userAvatar}
                alt={item.userName}
                className="navbar-notification-avatar"
              />
              <div>
                <p className="navbar-notification-text">
                  <span className="navbar-notification-name">
                    {item.userName}
                  </span>{" "}
                  {item.message}
                </p>
                <p className="navbar-notification-time">{item.time}</p>
              </div>
            </article>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
