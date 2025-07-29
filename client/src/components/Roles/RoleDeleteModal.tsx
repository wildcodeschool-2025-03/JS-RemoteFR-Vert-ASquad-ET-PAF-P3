import { useRoleDeleteModal } from "../../hooks/useRoleDeleteModal";
import type { Role } from "../../types/Role";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import "../../assets/styles/RoleDeleteModal.css";

interface RoleDeleteModalProps {
  isOpen: boolean;
  role: Role | null;
  onClose: () => void;
  onConfirm: (roleId: number) => Promise<void>;
}

const RoleDeleteModal = ({
  isOpen,
  role,
  onClose,
  onConfirm,
}: RoleDeleteModalProps) => {
  const { deleting, handleConfirm } = useRoleDeleteModal({
    role,
    onConfirm,
    onClose,
  });

  const modalFooter = (
    <>
      <Button variant="cancel" onClick={onClose} disabled={deleting}>
        Annuler
      </Button>
      <Button variant="danger" onClick={handleConfirm} loading={deleting}>
        Supprimer
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Supprimer le rôle"
      footer={modalFooter}
    >
      {role && (
        <div className="role-delete-modal-content">
          <p className="delete-warning">
            Êtes-vous sûr de vouloir supprimer le rôle{" "}
            <strong>"{role.label}"</strong> ?
          </p>

          <div className="role-preview">
            <span>Rôle à supprimer :</span>
            <div className="role-info">
              <div
                className="color-preview"
                style={{ backgroundColor: role.color }}
              />
              <span className="role-name">{role.label}</span>
            </div>
          </div>

          <p className="warning-text">Cette action est irréversible.</p>
        </div>
      )}
    </Modal>
  );
};

export default RoleDeleteModal;
