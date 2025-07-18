import { useParams } from "react-router";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { useRoles } from "../../hooks/useRoles";

const DashboardPage = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const { getRoleById, loading } = useRoles();
  const currentRoleId = roleId ? Number.parseInt(roleId, 10) : 1;
  const currentRole = getRoleById(currentRoleId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentRole) {
    return <div>Role not found</div>;
  }

  return (
    <DashboardLayout userRole={currentRoleId} activeItem="dashboard">
      <h1>Dashboard {currentRole.label}</h1>
      <p>Interface dédiée au rôle {currentRole.label}</p>
    </DashboardLayout>
  );
};

export default DashboardPage;
