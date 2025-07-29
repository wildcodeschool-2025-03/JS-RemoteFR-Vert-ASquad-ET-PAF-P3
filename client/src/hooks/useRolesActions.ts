import { useCallback } from "react";
import { createRole, deleteRole, updateRole } from "../services/roleService";
import type { CreateRoleData, Role, UpdateRoleData } from "../types/Role";

interface UseRolesActionsProps {
  addRole: (role: Role) => void;
  updateRole: (roleId: number, updates: Partial<Role>) => void;
  removeRole: (roleId: number) => void;
}

interface UseRolesActionsReturn {
  createNewRole: (data: CreateRoleData) => Promise<Role>;
  updateExistingRole: (data: UpdateRoleData) => Promise<void>;
  deleteExistingRole: (roleId: number) => Promise<void>;
}

export const useRolesActions = ({
  addRole,
  updateRole: updateRoleLocal,
  removeRole,
}: UseRolesActionsProps): UseRolesActionsReturn => {
  const createNewRole = useCallback(
    async (data: CreateRoleData): Promise<Role> => {
      const result = await createRole(data);

      const newRole: Role = {
        id: result.insertId,
        label: data.label.trim(),
        color: data.color || "#6B7280",
      };

      addRole(newRole);
      return newRole;
    },
    [addRole],
  );

  const updateExistingRole = useCallback(
    async (data: UpdateRoleData): Promise<void> => {
      await updateRole(data);

      updateRoleLocal(data.id, {
        label: data.label.trim(),
        color: data.color,
      });
    },
    [updateRoleLocal],
  );

  const deleteExistingRole = useCallback(
    async (roleId: number): Promise<void> => {
      await deleteRole(roleId);
      removeRole(roleId);
    },
    [removeRole],
  );

  return {
    createNewRole,
    updateExistingRole,
    deleteExistingRole,
  };
};
