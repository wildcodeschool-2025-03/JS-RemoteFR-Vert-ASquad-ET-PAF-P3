import type { Role } from "../../types/Role";
import Button from "../UI/Button/Button";
import TextInput from "../UI/Form/TextInput";
import Modal from "../UI/Modal/Modal";
import "../../assets/styles/RoleFormModal.css";

interface RoleFormModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  role: Role | null;
  roleLabel: string;
  roleColor: string;
  submitting: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  onLabelChange: (label: string) => void;
  onColorChange: (color: string) => void;
}

const RoleFormModal = ({
  isOpen,
  mode,
  roleLabel,
  roleColor,
  submitting,
  onClose,
  onSubmit,
  onLabelChange,
  onColorChange,
}: RoleFormModalProps) => {
  const title = mode === "create" ? "Créer un rôle" : "Modifier le rôle";

  const modalFooter = (
    <>
      <Button variant="cancel" onClick={onClose} disabled={submitting}>
        Annuler
      </Button>
      <Button
        variant="primary"
        onClick={onSubmit}
        disabled={!roleLabel.trim()}
        loading={submitting}
      >
        {mode === "create" ? "Créer" : "Modifier"}
      </Button>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} footer={modalFooter}>
      <div className="role-form-modal-content">
        <TextInput
          label="Nom du rôle"
          value={roleLabel}
          onChange={onLabelChange}
          placeholder="Entrez le nom du rôle"
          required
        />

        <div className="color-input-group">
          <label htmlFor="role-color" className="color-label">
            Couleur
          </label>
          <div className="color-input-container">
            <input
              id="role-color"
              type="color"
              value={roleColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="color-input"
            />
            <input
              type="text"
              value={roleColor}
              onChange={(e) => onColorChange(e.target.value)}
              placeholder="#6B7280"
              className="color-text-input"
            />
          </div>
        </div>

        {roleColor && (
          <div className="role-preview">
            <span>Aperçu :</span>
            <div
              className="preview-badge"
              style={{ backgroundColor: roleColor }}
            >
              {roleLabel || "Aperçu du rôle"}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default RoleFormModal;
