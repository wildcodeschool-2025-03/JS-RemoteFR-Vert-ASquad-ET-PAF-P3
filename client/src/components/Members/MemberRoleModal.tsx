import { useState } from "react";
import type { Member } from "../../types/Member";
import type { Role } from "../../types/Role";
import FormField from "../UI/Form/FormField";
import Modal from "../UI/Modal/Modal";
import "../../assets/styles/MemberRoleModal.css";

interface MemberRoleModalProps {
  isOpen: boolean;
  member: Member | null;
  roles: Role[];
  onClose: () => void;
  onUpdate: (memberId: number, roleId: number) => Promise<void>;
}

const MemberRoleModal = ({
  isOpen,
  member,
  roles,
  onClose,
  onUpdate,
}: MemberRoleModalProps) => {
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [updating, setUpdating] = useState(false);

  const handleClose = () => {
    setSelectedRoleId("");
    onClose();
  };

  const handleUpdate = async () => {
    if (!member || !selectedRoleId) return;

    try {
      setUpdating(true);
      await onUpdate(member.id, Number(selectedRoleId));
      handleClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      alert("Erreur lors de la mise à jour du rôle");
    } finally {
      setUpdating(false);
    }
  };

  const roleOptions = roles.map((role) => ({
    value: role.id.toString(),
    label: role.label,
  }));

  const modalFooter = (
    <>
      <button
        type="button"
        className="modal-btn modal-btn-cancel"
        onClick={handleClose}
        disabled={updating}
      >
        Annuler
      </button>
      <button
        type="button"
        className="modal-btn modal-btn-primary"
        onClick={handleUpdate}
        disabled={!selectedRoleId || updating}
      >
        {updating ? "Mise à jour..." : "Confirmer"}
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Modifier le rôle"
      footer={modalFooter}
    >
      {member && (
        <div className="member-role-modal-content">
          <div className="member-info">
            <strong className="member-name">
              {member.firstname} {member.lastname}
            </strong>
            <div className="member-email">{member.email}</div>
            <div className="current-role">
              Rôle actuel : <span>{member.role_label || "Non défini"}</span>
            </div>
          </div>

          <FormField
            label="Nouveau rôle"
            type="select"
            value={selectedRoleId}
            onChange={setSelectedRoleId}
            placeholder="Sélectionner un rôle"
            options={roleOptions}
            required
          />
        </div>
      )}
    </Modal>
  );
};

export default MemberRoleModal;
