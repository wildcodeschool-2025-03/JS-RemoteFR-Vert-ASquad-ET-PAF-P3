import { Edit } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import MemberRoleModal from "../../components/Members/MemberRoleModal";
import PageHeader from "../../components/UI/Layout/PageHeader";
import DataTable from "../../components/UI/Table/DataTable";
import type { Column } from "../../components/UI/Table/DataTable";
import { useMembersData } from "../../hooks/useMembersData";
import { useRolesData } from "../../hooks/useRolesData";
import type { Member } from "../../types/Member";
import "../../assets/styles/common.css";

const MembersListPage = () => {
  // Data hooks
  const { roles } = useRolesData();
  const { members, loading, error, updateMemberRole } = useMembersData(roles);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const openRoleModal = (member: Member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  // Define table columns
  const columns: Column<Member>[] = [
    {
      key: "id",
      label: "ID",
      width: "10%",
    },
    {
      key: "firstname",
      label: "Prénom",
      width: "15%",
    },
    {
      key: "lastname",
      label: "Nom",
      width: "15%",
    },
    {
      key: "email",
      label: "Email",
      width: "20%",
    },
    {
      key: "role_label",
      label: "Rôle",
      width: "15%",
    },
    {
      key: "company_name",
      label: "Entreprise",
      width: "15%",
    },
    {
      key: "company_siret",
      label: "SIRET",
      width: "10%",
    },
    {
      key: "actions",
      label: "Actions",
      width: "10%",
      align: "center",
      render: (_, member) => (
        <button
          type="button"
          className="action-btn edit"
          onClick={() => openRoleModal(member)}
          title="Modifier le rôle"
        >
          <Edit size={16} />
        </button>
      ),
    },
  ];

  return (
    <DashboardLayout userRole={3} activeItem="members">
      <div className="page-container">
        <PageHeader title="Membres" />

        <DataTable<Member>
          data={members}
          columns={columns}
          loading={loading}
          error={error}
          emptyMessage="Aucun membre trouvé"
          getRowKey={(member) => member.id}
        />

        <MemberRoleModal
          isOpen={isModalOpen}
          member={selectedMember}
          roles={roles}
          onClose={closeModal}
          onUpdate={updateMemberRole}
        />
      </div>
    </DashboardLayout>
  );
};

export default MembersListPage;
