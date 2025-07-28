import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "../../assets/styles/MembersList.css";

interface Member {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role_label: string;
  company_name: string;
  company_siret: string;
}

const MembersListPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/members`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setMembers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erreur lors du chargement",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <DashboardLayout userRole={3} activeItem="members">
        <div className="members-page-active" />
        <div className="members-loading">
          <div className="loading-spinner" />
          <p>Chargement des membres...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout userRole={3} activeItem="members">
        <div className="members-page-active" />
        <div className="members-page-container">
          <div className="members-error">
            <h2>Erreur de chargement</h2>
            <p>{error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (members.length === 0) {
    return (
      <DashboardLayout userRole={3} activeItem="members">
        <div className="members-page-active" />
        <div className="members-page-container">
          <div className="members-empty">
            <h2>Aucun membre trouvé</h2>
            <p>Il n'y a actuellement aucun membre dans la base de données.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole={3} activeItem="members">
      <div className="members-page-active" />
      <div className="members-page-container">
        <div className="members-header">
          <div className="members-badge">
            <h1>Membres</h1>
          </div>
        </div>

        <div className="members-table-wrapper">
          <div className="members-table-container">
            <table className="members-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Noms</th>
                  <th>Email</th>
                  <th>Rôles</th>
                  <th>Entreprise</th>
                  <th>SIRET</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id}>
                    <td>{member.id}</td>
                    <td>
                      {member.firstname} {member.lastname}
                    </td>
                    <td>{member.email}</td>
                    <td>{member.role_label}</td>
                    <td>
                      {member.company_name === "Non renseigné"
                        ? "—"
                        : member.company_name}
                    </td>
                    <td>
                      {member.company_siret === "Non renseigné"
                        ? "—"
                        : member.company_siret}
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button
                          type="button"
                          className="action-btn edit"
                          onClick={() => console.log("Modifier", member.id)}
                          title="Modifier"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          className="action-btn delete"
                          onClick={() => console.log("Supprimer", member.id)}
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MembersListPage;
