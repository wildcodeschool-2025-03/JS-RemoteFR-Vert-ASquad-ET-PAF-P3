import { useEffect, useState } from "react";
import { getAllRoles } from "../services/roleService";
import type { Role, RoleLabel } from "../types/Role";
import { roleToLabel } from "../types/Role";

interface RoleWithColor extends Role {
  color: string;
}

const ROLE_COLORS: Record<RoleLabel, string> = {
  candidate: "#CA2061", // Rose/Pink
  company: "#FF8639", // Orange
  admin: "#851342", // Burgundy/Dark Red
};

export function useRoles() {
  const [roles, setRoles] = useState<RoleWithColor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRoles() {
      try {
        setLoading(true);
        setError(null);

        const rolesData = await getAllRoles();

        const rolesWithColors = rolesData.map((role) => ({
          ...role,
          color: ROLE_COLORS[roleToLabel(role)],
        }));

        setRoles(rolesWithColors);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch roles");
      } finally {
        setLoading(false);
      }
    }

    fetchRoles();
  }, []);

  const getRoleByLabel = (label: RoleLabel): RoleWithColor | undefined => {
    return roles.find((role) => role.label === label);
  };

  const getRoleColor = (label: RoleLabel): string => {
    return ROLE_COLORS[label];
  };

  const hasRole = (label: RoleLabel): boolean => {
    return roles.some((role) => role.label === label);
  };

  return {
    roles,
    loading,
    error,
    getRoleByLabel,
    getRoleColor,
    hasRole,
    refetch: () => {
      setLoading(true);
      setError(null);
    },
  };
}
