// src/data/adminNavOptions.js
import { Home, Users, Briefcase, FileText, Image, Settings } from "lucide-react";

const adminNavOptions = [
  { label: "Dashboard", to: "/admin", icon: Home, end: true },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Services", to: "/admin/services", icon: Briefcase },
  { label: "Blog", to: "/admin/blog", icon: FileText },
  { label: "Carousel", to: "/admin/carousel", icon: Image },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

export default adminNavOptions;