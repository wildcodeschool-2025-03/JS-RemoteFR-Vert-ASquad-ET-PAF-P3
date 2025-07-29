import { Edit, Plus, Trash2 } from "lucide-react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import RoleDeleteModal from "../../components/Roles/RoleDeleteModal";
import RoleFormModal from "../../components/Roles/RoleFormModal";
import Button from "../../components/UI/Button/Button";
import PageHeader from "../../components/UI/Layout/PageHeader";
import DataTable from "../../components/UI/Table/DataTable";
import type { Column } from "../../components/UI/Table/DataTable";
import { useRolesManager } from "../../hooks/useRolesManager";
import type { Role } from "../../types/Role";
import "../../assets/styles/common.css";

interface ExtendedRole extends Role, Record<string, unknown> {}

const RolesListPage = () => {
  const {
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
  } = useRolesManager();

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
          <Button
            variant="icon-edit"
            onClick={() => openEditModal(role)}
            aria-label="Modifier le rôle"
          >
            <Edit size={16} />
          </Button>
          <Button
            variant="icon-delete"
            onClick={() => openDeleteModal(role)}
            aria-label="Supprimer le rôle"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout userRole={3} activeItem="roles">
      <div className="page-container">
        <PageHeader
          title="Gestion des rôles"
          actionButton={{
            icon: <Plus size={20} />,
            label: "Nouveau rôle",
            onClick: openCreateModal,
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

        <RoleFormModal
          isOpen={isFormModalOpen}
          mode={modalMode}
          role={selectedRole}
          roleLabel={roleLabel}
          roleColor={roleColor}
          submitting={submitting}
          onClose={closeFormModal}
          onSubmit={handleSubmit}
          onLabelChange={setRoleLabel}
          onColorChange={setRoleColor}
        />

        <RoleDeleteModal
          isOpen={isDeleteModalOpen}
          role={roleToDelete}
          deleting={deleting}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteRole}
        />
      </div>
    </DashboardLayout>
  );
};

export default RolesListPage;
