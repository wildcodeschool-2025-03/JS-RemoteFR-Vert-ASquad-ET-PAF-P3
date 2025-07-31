import { useEffect, useState } from "react";
import type UsersType from "../../../../server/src/types/UserType";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { useAuth } from "../../context/AuthContext";

export default function CompanyProfile() {
  const [profile, setProfile] = useState<UsersType | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !user?.id || Number.isNaN(Number(user.id))) {
      console.warn("ID utilisateur invalide ou non défini:", user?.id);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${user.id}`,
        );
        if (!res.ok) throw new Error("Erreur de récupération");

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        alert("Impossible de charger le profil.");
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <>
      <DashboardLayout userRole={2} activeItem="dashboard">
        <div>
          {profile ? (
            <>
              <h2>
                Bienvenue {profile.firstname}
                {profile.lastname}
              </h2>
              <p>Votre Email : {profile.email}</p>
            </>
          ) : (
            <p>Chargement ou aucun profil trouvé.</p>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}
