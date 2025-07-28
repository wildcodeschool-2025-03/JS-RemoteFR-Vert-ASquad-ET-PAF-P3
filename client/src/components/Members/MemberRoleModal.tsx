import { useState } from "react";
import type { Member } from "../../types/Member";
import type { Role } from "../../types/Role";
import Button from "../UI/Button/Button";
import SelectInput from "../UI/Form/SelectInput";
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
      <Button variant="cancel" onClick={handleClose} disabled={updating}>
        Annuler
      </Button>
      <Button
        variant="primary"
        onClick={handleUpdate}
        disabled={!selectedRoleId}
        loading={updating}
      >
        Confirmer
      </Button>
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

          <SelectInput
            label="Nouveau rôle"
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
