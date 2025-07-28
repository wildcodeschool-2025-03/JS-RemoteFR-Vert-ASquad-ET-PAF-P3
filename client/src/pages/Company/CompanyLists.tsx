import { User } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import type { Member } from "../../types/Member";
import "../../assets/styles/Company/CandidatLists.css";

export default function CompanyLists() {
  const [candidatsLists, setCandidatsLists] = useState<Member[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users?type=members`)
      .then((response) => response.json())
      .then((data: Member[]) => {
        setCandidatsLists(data);
      });
  }, []);

  return (
    <DashboardLayout userRole={2} activeItem="company">
      <h1>Listes des candidats</h1>

      <div className="container_candidatsLists">
        {candidatsLists.map((candidat) => (
          <section key={candidat.id} className="Company_candidatsLists">
            <section className="candidats_infos">
              <section>
                {" "}
                <User size={48} />
                <h2>
                  {candidat.firstname} {candidat.lastname}
                </h2>
              </section>
              <section className="candidats_content">
                <button type="button" className="more_info_candidat">
                  Découvrir le profil
                </button>
                <h2 className="creation_date_account">
                  Inscrit le :{" "}
                  {new Date(candidat.created_at).toLocaleDateString()}
                </h2>
              </section>
            </section>
          </section>
        ))}
      </div>
    </DashboardLayout>
  );
}
