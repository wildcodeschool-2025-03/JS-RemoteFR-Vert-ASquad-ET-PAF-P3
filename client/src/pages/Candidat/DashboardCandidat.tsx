import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { useRoles } from "../../hooks/useRoles";

const DashboardPageCompany = () => {
  const { user } = useAuth();
  const { getRoleById, loading } = useRoles();

  if (loading) return <div>Chargement...</div>;
  if (!user) return <div>Utilisateur non connecté</div>;

  const currentRole = getRoleById(user.role_id);
  if (!currentRole) return <div>Rôle non trouvé</div>;

  return (
    <DashboardLayout userRole={user.role_id} activeItem="dashboard">
      <h1>Dashboard {currentRole.label}</h1>
      <p>Interface dédiée au rôle {currentRole.label}</p>
    </DashboardLayout>
  );
};

export default DashboardPageCompany;
