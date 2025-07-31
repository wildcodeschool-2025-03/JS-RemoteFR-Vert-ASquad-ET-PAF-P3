import {
  Briefcase,
  Building2,
  FolderOpen,
  LayoutDashboard,
  Mail,
  User,
} from "lucide-react";

import type { Role } from "../types/Role";
import type { RoleConfig, UserRole } from "../types/SidebarTypes";

// Base configurations for known roles
const candidateBaseConfig: Omit<RoleConfig, "color"> = {
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
};

const companyBaseConfig: Omit<RoleConfig, "color"> = {
  navItems: [
    {
      id: "dashboard",
      path: "/dashboard/recruteur",
      icon: <LayoutDashboard size={18} />,
      label: "Tableau de bord",
    },
    {
      id: "profile",
      path: "/recruteur/profile",
      icon: <Building2 size={18} />,
      label: "Profil",
    },
    {
      id: "offers",
      path: "/recruteur/offers",
      icon: <Briefcase size={18} />,
      label: "Offres",
    },
  ],
};

const adminBaseConfig: Omit<RoleConfig, "color"> = {
  navItems: [
    {
      id: "dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
      label: "Tableau de bord",
    },
    {
      id: "roles",
      path: "/dashboard/admin/roles",
      icon: <Building2 size={18} />,
      label: "Rôles",
    },
    {
      id: "offers",
      path: "/offers",
      icon: <Briefcase size={18} />,
      label: "Offres",
    },
  ],
};

// Default configuration for unknown roles
const createDefaultRoleConfig = (role: Role): RoleConfig => ({
  navItems: [
    {
      id: "dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
      label: "Tableau de bord",
    },
  ],
  color: role.color,
});

// Dynamic role configuration generator
export const getRoleConfig = (
  roleId: UserRole,
  allRoles: Role[],
): RoleConfig => {
  const roleData = allRoles.find((r) => r.id === roleId);

  if (!roleData) {
    // Fallback for unknown roles
    return createDefaultRoleConfig({
      id: roleId,
      label: "Unknown",
      color: "#6B7280",
    });
  }

  // Specific configurations for known roles
  const specificConfigs: Record<number, Omit<RoleConfig, "color">> = {
    1: candidateBaseConfig,
    2: companyBaseConfig,
    3: adminBaseConfig,
  };

  const baseConfig = specificConfigs[roleId];

  if (baseConfig) {
    return {
      ...baseConfig,
      color: roleData.color, // Use color from database
    };
  }

  // Default configuration for new roles
  return createDefaultRoleConfig(roleData);
};

// Legacy exports for backward compatibility (but now dynamic)
export const getRoleConfigLegacy = (
  role: UserRole,
  allRoles: Role[],
): RoleConfig => {
  return getRoleConfig(role, allRoles);
};
