import { useCallback, useEffect, useState } from "react";
import { getAllRoles } from "../services/roleService";
import type { Role } from "../types/Role";

interface UseRolesDataReturn {
  roles: Role[];
  loading: boolean;
  error: string | null;
  refreshRoles: () => Promise<void>;
}

export const useRolesData = (): UseRolesDataReturn => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const rolesData = await getAllRoles();
      setRoles(rolesData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors du chargement des rôles",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshRoles = useCallback(async () => {
    await fetchRoles();
  }, [fetchRoles]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return {
    roles,
    loading,
    error,
    refreshRoles,
  };
};
