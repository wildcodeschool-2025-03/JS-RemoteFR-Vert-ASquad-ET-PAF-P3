import type { ReactNode } from "react";
import type { RoleId } from "./Role";

export type UserRole = RoleId;

export interface NavItem {
  id: string;
  path: string;
  icon: ReactNode;
  label: string;
}

export interface SidebarProps {
  activeItem: string;
  userRole: UserRole;
}

export interface RoleConfig {
  navItems: NavItem[];
  color: string;
}
