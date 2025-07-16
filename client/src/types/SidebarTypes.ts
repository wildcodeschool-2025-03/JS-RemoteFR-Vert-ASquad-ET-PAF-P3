import type { ReactNode } from "react";
import type { RoleLabel } from "./Role";

export type UserRole = RoleLabel;

export interface NavItem {
  id: string;
  path: string;
  icon: ReactNode;
  label: string;
  roles?: UserRole[];
}

export interface SidebarProps {
  activeItem: string;
  userRole: UserRole;
}

export type CandidateNavId =
  | "dashboard"
  | "profile"
  | "applications"
  | "documents"
  | "messagerie"
  | "companies";
export type CompanyNavId =
  | "dashboard"
  | "profile"
  | "offers"
  | "documents"
  | "messagerie"
  | "trombinoscope";
export type AdminNavId =
  | "dashboard"
  | "candidates"
  | "companies"
  | "offers"
  | "messagerie";

export type NavItemId = CandidateNavId | CompanyNavId | AdminNavId;

export interface SidebarHandlers {
  onLogout: () => void;
  onDeleteAccount: () => void;
}

export interface RoleConfig {
  navItems: NavItem[];
  showDeleteAccount: boolean;
  logoSize?: "small" | "medium" | "large";
  color: string;
}
