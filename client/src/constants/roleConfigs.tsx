import {
  Briefcase,
  BriefcaseIcon,
  Building2,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Mail,
  Trash2,
  User,
  Users,
  UsersRound,
} from "lucide-react";

import type { RoleConfig, UserRole } from "../types/SidebarTypes";

export const candidateConfig: RoleConfig = {
  navItems: [
    {
      id: "dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
      label: "Tableau de bord",
    },
    {
      id: "profile",
      path: "/profile",
      icon: <User size={18} />,
      label: "Profil",
    },
    {
      id: "applications",
      path: "/applications",
      icon: <Briefcase size={18} />,
      label: "Candidatures",
    },
    {
      id: "documents",
      path: "/documents",
      icon: <FolderOpen size={18} />,
      label: "Documents",
    },
    {
      id: "messagerie",
      path: "/messagerie",
      icon: <Mail size={18} />,
      label: "Messages",
    },
    {
      id: "companies",
      path: "/companies",
      icon: <Building2 size={18} />,
      label: "Entreprises",
    },
  ],
  showDeleteAccount: true,
  logoSize: "medium",
  color: "#CA2061",
};

export const companyConfig: RoleConfig = {
  navItems: [
    {
      id: "dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
      label: "Tableau de bord",
    },
    {
      id: "profile",
      path: "/profile",
      icon: <Building2 size={18} />,
      label: "Profil",
    },
    {
      id: "offers",
      path: "/offers",
      icon: <BriefcaseIcon size={18} />,
      label: "Offres",
    },
    {
      id: "documents",
      path: "/documents",
      icon: <FolderOpen size={18} />,
      label: "Dossiers",
    },
    {
      id: "messagerie",
      path: "/messagerie",
      icon: <Mail size={18} />,
      label: "Messages",
    },
    {
      id: "trombinoscope",
      path: "/trombinoscope",
      icon: <UsersRound size={18} />,
      label: "Trombinoscope",
    },
  ],
  showDeleteAccount: false,
  logoSize: "medium",
  color: "#FF8639",
};

export const adminConfig: RoleConfig = {
  navItems: [
    {
      id: "dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
      label: "Tableau de bord",
    },
    {
      id: "candidates",
      path: "/candidates",
      icon: <Users size={18} />,
      label: "Candidats",
    },
    {
      id: "companies",
      path: "/companies",
      icon: <Building2 size={18} />,
      label: "Entreprises",
    },
    {
      id: "offers",
      path: "/offers",
      icon: <BriefcaseIcon size={18} />,
      label: "Offres",
    },
    {
      id: "messages",
      path: "/messages",
      icon: <Mail size={18} />,
      label: "Messages",
    },
  ],
  showDeleteAccount: false,
  logoSize: "large",
  color: "#851342",
};

export const commonActions = {
  logout: {
    icon: <LogOut size={18} />,
    label: "Déconnexion",
  },
  deleteAccount: {
    icon: <Trash2 size={18} />,
    label: "Supprimer le compte",
  },
} as const;

export const roleConfigs: Record<UserRole, RoleConfig> = {
  candidate: candidateConfig,
  company: companyConfig,
  admin: adminConfig,
};

export const getRoleConfig = (role: UserRole): RoleConfig => {
  return roleConfigs[role];
};
