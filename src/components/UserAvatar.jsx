import { User } from "lucide-react";

const sizeMap = {
  sm: { box: "h-8 w-8", icon: 16 },
  md: { box: "h-12 w-12", icon: 24 },
  lg: { box: "h-[120px] w-[120px]", icon: 48 },
};

export default function UserAvatar({ user, size = "sm", className = "" }) {
  const { box, icon } = sizeMap[size] || sizeMap.sm;

  if (user?.profilePicture) {
    return (
      <img
        src={user.profilePicture}
        alt={user.name || "User profile"}
        className={`rounded-full object-cover ${box} ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gray-200 ${box} ${className}`}
      aria-hidden={!user?.name}
    >
      <User size={icon} className="text-gray-400" />
    </div>
  );
}
