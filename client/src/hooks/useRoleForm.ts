import { useCallback, useState } from "react";
import type { CreateRoleData, Role, UpdateRoleData } from "../types/Role";

interface UseRoleFormProps {
  createNewRole: (data: CreateRoleData) => Promise<Role>;
  updateExistingRole: (data: UpdateRoleData) => Promise<void>;
}

interface UseRoleFormReturn {
  // Modal state
  isFormModalOpen: boolean;
  modalMode: "create" | "edit";
  selectedRole: Role | null;

  // Modal actions
  openCreateModal: () => void;
  openEditModal: (role: Role) => void;
  closeFormModal: () => void;
  handleFormSubmit: (data: CreateRoleData | UpdateRoleData) => Promise<void>;
}

export const useRoleForm = ({
  createNewRole,
  updateExistingRole,
}: UseRoleFormProps): UseRoleFormReturn => {
  // Modal state only
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // Modal actions
  const openCreateModal = useCallback(() => {
    setModalMode("create");
    setSelectedRole(null);
    setIsFormModalOpen(true);
  }, []);

  const openEditModal = useCallback((role: Role) => {
    setModalMode("edit");
    setSelectedRole(role);
    setIsFormModalOpen(true);
  }, []);

  const closeFormModal = useCallback(() => {
    setIsFormModalOpen(false);
    setSelectedRole(null);
  }, []);

  const handleFormSubmit = useCallback(
    async (data: CreateRoleData | UpdateRoleData) => {
      if ("id" in data) {
        // UpdateRoleData
        await updateExistingRole(data);
      } else {
        // CreateRoleData
        await createNewRole(data);
      }
      closeFormModal();
    },
    [createNewRole, updateExistingRole, closeFormModal],
  );

  return {
    // Modal state
    isFormModalOpen,
    modalMode,
    selectedRole,

    // Modal actions
    openCreateModal,
    openEditModal,
    closeFormModal,
    handleFormSubmit,
  };
};
