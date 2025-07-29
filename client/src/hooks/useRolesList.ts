import { useRoleDelete } from "./useRoleDelete";
import { useRoleForm } from "./useRoleForm";
import { useRolesActions } from "./useRolesActions";
import { useRolesData } from "./useRolesData";

interface UseRolesListReturn {
  // Data
  roles: ReturnType<typeof useRolesData>["roles"];
  loading: boolean;
  error: string | null;
  refreshRoles: () => Promise<void>;

  // Form
  formState: ReturnType<typeof useRoleForm>;

  // Delete
  deleteState: ReturnType<typeof useRoleDelete>;
}

export const useRolesList = (): UseRolesListReturn => {
  // Data management
  const {
    roles,
    loading,
    error,
    refreshRoles,
    addRole,
    updateRole,
    removeRole,
  } = useRolesData();

  // CRUD operations
  const { createNewRole, updateExistingRole, deleteExistingRole } =
    useRolesActions({
      addRole,
      updateRole,
      removeRole,
    });

  // Form management
  const formState = useRoleForm({
    createNewRole,
    updateExistingRole,
  });

  // Delete management
  const deleteState = useRoleDelete({
    deleteExistingRole,
  });

  return {
    // Data
    roles,
    loading,
    error,
    refreshRoles,

    // Form
    formState,

    // Delete
    deleteState,
  };
};
