import { useCallback, useState } from "react";
import type { Role } from "../types/Role";

interface UseRoleDeleteModalProps {
  role: Role | null;
  onConfirm: (roleId: number) => Promise<void>;
  onClose: () => void;
}

interface UseRoleDeleteModalReturn {
  deleting: boolean;
  handleConfirm: () => Promise<void>;
}

export const useRoleDeleteModal = ({
  role,
  onConfirm,
  onClose,
}: UseRoleDeleteModalProps): UseRoleDeleteModalReturn => {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = useCallback(async () => {
    if (!role) return;

    try {
      setDeleting(true);
      await onConfirm(role.id);
      onClose();
    } catch (err) {
      // Erreur gérée par le parent
    } finally {
      setDeleting(false);
    }
  }, [role, onConfirm, onClose]);

  return {
    deleting,
    handleConfirm,
  };
};
