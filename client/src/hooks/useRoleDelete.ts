import { useCallback, useState } from "react";
import type { Role } from "../types/Role";

interface UseRoleDeleteProps {
  deleteExistingRole: (roleId: number) => Promise<void>;
}

interface UseRoleDeleteReturn {
  // Modal state
  isDeleteModalOpen: boolean;
  roleToDelete: Role | null;

  // Modal actions
  openDeleteModal: (role: Role) => void;
  closeDeleteModal: () => void;
  handleDeleteSubmit: (roleId: number) => Promise<void>;
}

export const useRoleDelete = ({
  deleteExistingRole,
}: UseRoleDeleteProps): UseRoleDeleteReturn => {
  // Modal state only
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  // Modal actions
  const openDeleteModal = useCallback((role: Role) => {
    setRoleToDelete(role);
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setRoleToDelete(null);
  }, []);

  const handleDeleteSubmit = useCallback(
    async (roleId: number) => {
      await deleteExistingRole(roleId);
      closeDeleteModal();
    },
    [deleteExistingRole, closeDeleteModal],
  );

  return {
    // Modal state
    isDeleteModalOpen,
    roleToDelete,

    // Modal actions
    openDeleteModal,
    closeDeleteModal,
    handleDeleteSubmit,
  };
};
