import { useContext } from "react";
import { useParams } from "react-router";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { AuthContext } from "../../context/AuthContext";
import { useRoles } from "../../hooks/useRoles";
import { isValidRoleId } from "../../types/Role";

const DashboardPage = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const { getRoleById, loading } = useRoles();

  const auth = useContext(AuthContext);
  if (!auth || !auth.user) return <div>Chargement...</div>;

  // Convertir roleId en nombre et vérifier sa validité (si tu veux utiliser roleId de l'URL)
  let roleIdNumber: number | undefined;
  if (roleId) {
    roleIdNumber = Number.parseInt(roleId, 10);
    if (Number.isNaN(roleIdNumber) || !isValidRoleId(roleIdNumber)) {
      return <div>Role invalide</div>;
    }
  }

  const effectiveRoleId = auth.user.role_id ?? roleIdNumber;

  if (loading) {
    return <div>Loading...</div>;
  }

  const currentRole = effectiveRoleId ? getRoleById(effectiveRoleId) : null;

  if (!currentRole) {
    return <div>Role not found</div>;
  }

  return (
    <DashboardLayout userRole={effectiveRoleId} activeItem="dashboard">
      <h1>Dashboard {currentRole.label}</h1>
      <p>Interface dédiée au rôle {currentRole.label}</p>
    </DashboardLayout>
  );
};

export default DashboardPage;
