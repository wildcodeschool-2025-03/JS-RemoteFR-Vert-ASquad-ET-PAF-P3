import { useCallback, useEffect, useState } from "react";
import {
  createRole,
  deleteRole,
  getAllRoles,
  updateRole,
} from "../services/roleService";
import type { CreateRoleData, Role, UpdateRoleData } from "../types/Role";

interface ExtendedRole extends Role, Record<string, unknown> {}

interface UseRolesManagerReturn {
  // Data state
  roles: ExtendedRole[];
  loading: boolean;
  error: string | null;

  // Form modal state
  isFormModalOpen: boolean;
  modalMode: "create" | "edit";
  selectedRole: Role | null;
  roleLabel: string;
  roleColor: string;
  submitting: boolean;

  // Delete modal state
  isDeleteModalOpen: boolean;
  roleToDelete: Role | null;
  deleting: boolean;

  // Form actions
  setRoleLabel: (label: string) => void;
  setRoleColor: (color: string) => void;
  openCreateModal: () => void;
  openEditModal: (role: Role) => void;
  closeFormModal: () => void;
  handleSubmit: () => Promise<void>;

  // Delete actions
  openDeleteModal: (role: Role) => void;
  closeDeleteModal: () => void;
  handleDeleteRole: () => Promise<void>;

  // Data actions
  refreshRoles: () => Promise<void>;
}

export const useRolesManager = (): UseRolesManagerReturn => {
  // Data state
  const [roles, setRoles] = useState<ExtendedRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form modal state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roleLabel, setRoleLabel] = useState("");
  const [roleColor, setRoleColor] = useState("#6B7280");
  const [submitting, setSubmitting] = useState(false);

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch roles function
  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const rolesData = await getAllRoles();
      setRoles(rolesData as ExtendedRole[]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors du chargement",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh roles function
  const refreshRoles = useCallback(async () => {
    await fetchRoles();
  }, [fetchRoles]);

  // Form modal actions
  const openCreateModal = useCallback(() => {
    setModalMode("create");
    setSelectedRole(null);
    setRoleLabel("");
    setRoleColor("#6B7280");
    setIsFormModalOpen(true);
  }, []);

  const openEditModal = useCallback((role: Role) => {
    setModalMode("edit");
    setSelectedRole(role);
    setRoleLabel(role.label);
    setRoleColor(role.color);
    setIsFormModalOpen(true);
  }, []);

  const closeFormModal = useCallback(() => {
    setIsFormModalOpen(false);
    setSelectedRole(null);
    setRoleLabel("");
    setRoleColor("#6B7280");
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!roleLabel.trim()) return;

    try {
      setSubmitting(true);

      if (modalMode === "create") {
        const createData: CreateRoleData = {
          label: roleLabel.trim(),
          color: roleColor,
        };
        const result = await createRole(createData);

        const newRole: ExtendedRole = {
          id: result.insertId,
          label: roleLabel.trim(),
          color: roleColor,
        };

        setRoles((prevRoles) => [...prevRoles, newRole]);
      } else if (modalMode === "edit" && selectedRole) {
        const updateData: UpdateRoleData = {
          id: selectedRole.id,
          label: roleLabel.trim(),
          color: roleColor,
        };

        await updateRole(updateData);

        setRoles((prevRoles) =>
          prevRoles.map((role) =>
            role.id === selectedRole.id
              ? { ...role, label: roleLabel.trim(), color: roleColor }
              : role,
          ),
        );
      }

      closeFormModal();
    } catch (err) {
      alert("Erreur lors de la sauvegarde du rôle");
    } finally {
      setSubmitting(false);
    }
  }, [roleLabel, roleColor, modalMode, selectedRole, closeFormModal]);

  // Delete modal actions
  const openDeleteModal = useCallback((role: Role) => {
    setRoleToDelete(role);
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setRoleToDelete(null);
  }, []);

  const handleDeleteRole = useCallback(async () => {
    if (!roleToDelete) return;

    try {
      setDeleting(true);
      await deleteRole(roleToDelete.id);
      setRoles((prevRoles) =>
        prevRoles.filter((role) => role.id !== roleToDelete.id),
      );
      closeDeleteModal();
    } catch (err) {
      alert("Erreur lors de la suppression du rôle");
    } finally {
      setDeleting(false);
    }
  }, [roleToDelete, closeDeleteModal]);

  // Initial fetch
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return {
    // Data state
    roles,
    loading,
    error,

    // Form modal state
    isFormModalOpen,
    modalMode,
    selectedRole,
    roleLabel,
    roleColor,
    submitting,

    // Delete modal state
    isDeleteModalOpen,
    roleToDelete,
    deleting,

    // Form actions
    setRoleLabel,
    setRoleColor,
    openCreateModal,
    openEditModal,
    closeFormModal,
    handleSubmit,

    // Delete actions
    openDeleteModal,
    closeDeleteModal,
    handleDeleteRole,

    // Data actions
    refreshRoles,
  };
};
