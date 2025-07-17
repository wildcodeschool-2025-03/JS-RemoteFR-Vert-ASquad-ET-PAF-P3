import { useEffect, useState } from "react";
import { getAllRoles } from "../services/roleService";
import type { Role, RoleId } from "../types/Role";
import { roleExistsInList } from "../types/Role";

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRoles() {
      try {
        setLoading(true);
        setError(null);

        const rolesData = await getAllRoles();
        setRoles(rolesData); // Roles now include color from database
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch roles");
      } finally {
        setLoading(false);
      }
    }

    fetchRoles();
  }, []);

  const getRoleById = (id: RoleId): Role | undefined => {
    return roles.find((role) => role.id === id);
  };

  const getRoleColor = (id: RoleId): string => {
    const role = roles.find((role) => role.id === id);
    return role?.color || "#6B7280"; // Default gray if role not found
  };

  const hasRole = (id: RoleId): boolean => {
    return roles.some((role) => role.id === id);
  };

  const isValidRoleId = (id: number): id is RoleId => {
    return roleExistsInList(id, roles);
  };

  return {
    roles,
    loading,
    error,
    getRoleById,
    getRoleColor,
    hasRole,
    isValidRoleId,
    refetch: () => {
      setLoading(true);
      setError(null);
    },
  };
}
