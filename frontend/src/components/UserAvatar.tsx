import { motion } from "framer-motion";
import useAuth from "@/context/AuthContext";

function getInitials(name?: string) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function getBgColor(name?: string) {
  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];
  if (!name) return colors[0];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export default function UserAvatar({
  size = "w-16 h-16 text-xl", // default size, can override
  onClick,
}: {
  size?: string;
  onClick?: () => void;
}) {
  const { user } = useAuth();
  const initials = getInitials(user?.name);
  const bgColor = getBgColor(user?.name);

  if (!user) {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`${size} flex items-center justify-center rounded-full bg-gray-500 text-white cursor-pointer transition-all`}
      >
        U
      </motion.div>
    );
  }

  return user.avatar ? (
    <motion.img
      whileHover={{ scale: 1.1, rotate: 3 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      src={user.avatar}
      alt="User Avatar"
      className={`${size} rounded-full border-2 border-white shadow-md object-cover cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-indigo-400 transition-all`}
    />
  ) : (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 3 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${size} flex items-center justify-center rounded-full border-2 border-white shadow-md ${bgColor} cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-indigo-400 transition-all`}
    >
      <span className="font-bold text-white">{initials}</span>
    </motion.div>
  );
}
