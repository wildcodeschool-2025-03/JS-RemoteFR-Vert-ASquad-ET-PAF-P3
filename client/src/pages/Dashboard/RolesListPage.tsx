import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import TextInput from "../../components/UI/Form/TextInput";
import PageHeader from "../../components/UI/Layout/PageHeader";
import Modal from "../../components/UI/Modal/Modal";
import DataTable from "../../components/UI/Table/DataTable";
import type { Column } from "../../components/UI/Table/DataTable";
import {
  createRole,
  deleteRole,
  getAllRoles,
  updateRole,
} from "../../services/roleService";
import type { CreateRoleData, Role, UpdateRoleData } from "../../types/Role";
import "../../assets/styles/common.css";

interface ExtendedRole extends Role, Record<string, unknown> {}

const RolesListPage = () => {
  const [roles, setRoles] = useState<ExtendedRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roleLabel, setRoleLabel] = useState("");
  const [roleColor, setRoleColor] = useState("#6B7280");
  const [submitting, setSubmitting] = useState(false);

  // Delete confirmation state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
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
    };

    fetchRoles();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedRole(null);
    setRoleLabel("");
    setRoleColor("#6B7280");
    setIsModalOpen(true);
  };

  const openEditModal = (role: Role) => {
    setModalMode("edit");
    setSelectedRole(role);
    setRoleLabel(role.label);
    setRoleColor(role.color);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRole(null);
    setRoleLabel("");
    setRoleColor("#6B7280");
  };

  const handleSubmit = async () => {
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

      closeModal();
    } catch (err) {
      alert("Erreur lors de la sauvegarde du rôle");
    } finally {
      setSubmitting(false);
    }
  };

  const openDeleteModal = (role: Role) => {
    setRoleToDelete(role);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setRoleToDelete(null);
  };

  const handleDeleteRole = async () => {
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
  };

  // Define table columns
  const columns: Column<ExtendedRole>[] = [
    {
      key: "id",
      label: "ID",
      width: "10%",
    },
    {
      key: "label",
      label: "Label",
      width: "35%",
    },
    {
      key: "color",
      label: "Couleur",
      width: "20%",
    },
    {
      key: "preview",
      label: "Aperçu",
      width: "15%",
      align: "center",
      render: (_, role) => (
        <div
          className="color-preview"
          style={{ backgroundColor: role.color }}
        />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      width: "20%",
      align: "center",
      render: (_, role) => (
        <div className="actions-cell">
          <button
            type="button"
            className="action-btn edit"
            onClick={() => openEditModal(role)}
            title="Modifier le rôle"
          >
            <Edit size={16} />
          </button>
          <button
            type="button"
            className="action-btn delete"
            onClick={() => openDeleteModal(role)}
            title="Supprimer le rôle"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  // Form modal footer
  const formModalFooter = (
    <>
      <button
        type="button"
        className="modal-btn modal-btn-cancel"
        onClick={closeModal}
        disabled={submitting}
      >
        Annuler
      </button>
      <button
        type="button"
        className="modal-btn modal-btn-primary"
        onClick={handleSubmit}
        disabled={!roleLabel.trim() || submitting}
      >
        {submitting
          ? "Enregistrement..."
          : modalMode === "create"
            ? "Créer"
            : "Modifier"}
      </button>
    </>
  );

  // Delete modal footer
  const deleteModalFooter = (
    <>
      <button
        type="button"
        className="modal-btn modal-btn-cancel"
        onClick={closeDeleteModal}
        disabled={deleting}
      >
        Annuler
      </button>
      <button
        type="button"
        className="modal-btn modal-btn-danger"
        onClick={handleDeleteRole}
        disabled={deleting}
      >
        {deleting ? "Suppression..." : "Supprimer"}
      </button>
    </>
  );

  return (
    <DashboardLayout userRole={3} activeItem="roles">
      <div className="page-container">
        <PageHeader
          title="Rôles"
          actionButton={{
            label: "Nouveau rôle",
            icon: <Plus size={18} />,
            onClick: openCreateModal,
            variant: "primary",
          }}
        />

        <DataTable<ExtendedRole>
          data={roles}
          columns={columns}
          loading={loading}
          error={error}
          emptyMessage="Aucun rôle trouvé"
          getRowKey={(role) => role.id}
        />

        {/* Create/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={
            modalMode === "create"
              ? "Créer un nouveau rôle"
              : "Modifier le rôle"
          }
          footer={formModalFooter}
        >
          <TextInput
            label="Label du rôle"
            value={roleLabel}
            onChange={setRoleLabel}
            placeholder="Ex: Administrateur"
            required
          />

          <div className="form-field">
            <label htmlFor="role-color" className="form-label">
              Couleur <span className="form-required">*</span>
            </label>
            <div className="color-input-group">
              <input
                id="role-color"
                type="color"
                value={roleColor}
                onChange={(e) => setRoleColor(e.target.value)}
                className="color-input"
              />
              <input
                type="text"
                value={roleColor}
                onChange={(e) => setRoleColor(e.target.value)}
                className="color-text-input"
                placeholder="#000000"
              />
            </div>
          </div>

          <div className="role-preview">
            <span>Aperçu :</span>
            <div
              className="preview-badge"
              style={{ backgroundColor: roleColor }}
            >
              {roleLabel || "Aperçu du rôle"}
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={closeDeleteModal}
          title="Confirmer la suppression"
          footer={deleteModalFooter}
          size="sm"
        >
          {roleToDelete && (
            <div>
              <p>
                Êtes-vous sûr de vouloir supprimer le rôle{" "}
                <strong>"{roleToDelete.label}"</strong> ?
              </p>
              <p className="warning-text">Cette action est irréversible.</p>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default RolesListPage;
