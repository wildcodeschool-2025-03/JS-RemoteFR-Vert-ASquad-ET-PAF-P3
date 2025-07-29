import { useCallback, useEffect, useState } from "react";
import type { CreateRoleData, Role, UpdateRoleData } from "../types/Role";

interface UseRoleFormModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  role?: Role | null;
  onSubmit: (data: CreateRoleData | UpdateRoleData) => Promise<void>;
  onClose: () => void;
}

interface UseRoleFormModalReturn {
  roleLabel: string;
  roleColor: string;
  submitting: boolean;
  isFormValid: boolean;
  setRoleLabel: (label: string) => void;
  setRoleColor: (color: string) => void;
  handleSubmit: () => Promise<void>;
}

export const useRoleFormModal = ({
  isOpen,
  mode,
  role,
  onSubmit,
  onClose,
}: UseRoleFormModalProps): UseRoleFormModalReturn => {
  const [roleLabel, setRoleLabel] = useState("");
  const [roleColor, setRoleColor] = useState("#6B7280");
  const [submitting, setSubmitting] = useState(false);

  // Initialiser les champs quand la modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && role) {
        setRoleLabel(role.label);
        setRoleColor(role.color);
      } else {
        setRoleLabel("");
        setRoleColor("#6B7280");
      }
      setSubmitting(false);
    }
  }, [isOpen, mode, role]);

  const handleSubmit = useCallback(async () => {
    if (!roleLabel.trim()) return;

    try {
      setSubmitting(true);

      if (mode === "create") {
        const createData: CreateRoleData = {
          label: roleLabel.trim(),
          color: roleColor,
        };
        await onSubmit(createData);
      } else if (mode === "edit" && role) {
        const updateData: UpdateRoleData = {
          id: role.id,
          label: roleLabel.trim(),
          color: roleColor,
        };
        await onSubmit(updateData);
      }

      onClose();
    } catch (err) {
      // Erreur gérée par le parent
    } finally {
      setSubmitting(false);
    }
  }, [roleLabel, roleColor, mode, role, onSubmit, onClose]);

  const isFormValid = roleLabel.trim().length > 0;

  return {
    roleLabel,
    roleColor,
    submitting,
    isFormValid,
    setRoleLabel,
    setRoleColor,
    handleSubmit,
  };
};
