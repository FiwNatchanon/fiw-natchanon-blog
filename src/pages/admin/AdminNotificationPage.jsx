import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { adminNotifications } from "@/data/adminMockData";

export default function AdminNotificationPage() {
  return (
    <AdminLayout>
      <header>
        <h1 className="member-title">Notification</h1>
        <p className="member-subtitle">View your recent notifications.</p>
      </header>

      <ul className="admin-notification-list">
        {adminNotifications.map((item) => (
          <li key={item.id} className="admin-notification-item">
            <div className="admin-notification-content">
              <img
                src={item.userAvatar}
                alt={item.userName}
                className="admin-notification-avatar"
              />
              <div>
                <p className="admin-notification-text">
                  <span className="admin-notification-name">{item.userName}</span>{" "}
                  {item.message}
                </p>
                <p className="admin-notification-time">{item.time}</p>
              </div>
            </div>
            <Link to={item.link} className="admin-action-button">
              View
            </Link>
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
}
