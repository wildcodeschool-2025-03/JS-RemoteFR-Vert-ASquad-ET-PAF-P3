import { Edit, Plus, Trash2 } from "lucide-react";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import RoleDeleteModal from "../../../components/Roles/RoleDeleteModal";
import RoleFormModal from "../../../components/Roles/RoleFormModal";
import Button from "../../../components/UI/Button/Button";
import PageHeader from "../../../components/UI/Layout/PageHeader";
import DataTable from "../../../components/UI/Table/DataTable";
import type { Column } from "../../../components/UI/Table/DataTable";
import { usePageModal } from "../../../hooks/usePageModal";
import { useRolesList } from "../../../hooks/useRolesList";
import type { Role } from "../../../types/Role";
import "../../../assets/styles/common.css";

interface ExtendedRole extends Role, Record<string, unknown> {}

const RolesListPage = () => {
  const { roles, loading, error, formState, deleteState } = useRolesList();

  const { getActionButton } = usePageModal();

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
            onClick={() => formState.openEditModal(role)}
            aria-label="Modifier le rôle"
          >
            <Edit size={16} />
          </Button>
          <Button
            variant="icon-delete"
            onClick={() => deleteState.openDeleteModal(role)}
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
            ...getActionButton("Nouveau rôle", <Plus size={20} />),
            onClick: formState.openCreateModal,
          }}
        />

        <DataTable<ExtendedRole>
          data={roles as ExtendedRole[]}
          columns={columns}
          loading={loading}
          error={error}
          emptyMessage="Aucun rôle trouvé"
          getRowKey={(role) => role.id}
        />

        <RoleFormModal
          isOpen={formState.isFormModalOpen}
          mode={formState.modalMode}
          role={formState.selectedRole}
          onClose={formState.closeFormModal}
          onSubmit={formState.handleFormSubmit}
        />

        <RoleDeleteModal
          isOpen={deleteState.isDeleteModalOpen}
          role={deleteState.roleToDelete}
          onClose={deleteState.closeDeleteModal}
          onConfirm={deleteState.handleDeleteSubmit}
        />
      </div>
    </DashboardLayout>
  );
};

export default RolesListPage;
