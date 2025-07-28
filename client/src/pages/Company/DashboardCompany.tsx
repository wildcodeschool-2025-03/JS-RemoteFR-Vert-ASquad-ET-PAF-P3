import { useContext } from "react";
import { useParams } from "react-router";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { AuthContext } from "../../context/AuthContext";
import { useRoles } from "../../hooks/useRoles";

const DashboardPageCompany = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const { getRoleById, loading } = useRoles();

  const auth = useContext(AuthContext);
  if (!auth) return <div>Chargement...</div>;

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
      <p>Bienvenue dashboard company</p>
    </DashboardLayout>
  );
};

export default DashboardPageCompany;
