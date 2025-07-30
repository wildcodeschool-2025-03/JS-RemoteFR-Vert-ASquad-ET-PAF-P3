import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import PageHeader from "../../../components/UI/Layout/PageHeader";
import { useCandidateDashboard } from "../../../hooks/useCandidateDashboard";
import "../../../assets/styles/CandidateDashboard.css";

const CandidateDashboardPage = () => {
  const { user, isAuthenticated } = useCandidateDashboard();

  if (!isAuthenticated || !user) {
    return <div>Chargement...</div>;
  }

  return (
    <DashboardLayout userRole={1} activeItem="dashboard">
      <div className="page-container">
        <PageHeader
          title={`Bienvenue, ${user.firstname} ${user.lastname}`}
          badge={true}
        />
      </div>
    </DashboardLayout>
  );
};

export default CandidateDashboardPage;
