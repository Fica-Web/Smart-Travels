// src/data/adminNavOptions.js
import { Home, Users, Briefcase, Flag, FileText, Settings } from "lucide-react";
import { TbMailSearch } from "react-icons/tb";

const adminNavOptions = [
  { label: "Dashboard", to: "/admin", icon: Home, end: true },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Inquiries", to: "/admin/inquiries", icon: TbMailSearch },
  { label: "Destinations", to: "/admin/destination", icon: Flag },
  { label: "Blog", to: "/admin/blog", icon: FileText },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

export default adminNavOptions;