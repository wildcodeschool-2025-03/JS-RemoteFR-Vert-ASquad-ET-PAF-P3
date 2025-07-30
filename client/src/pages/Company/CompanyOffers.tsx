import { useCallback, useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "../../assets/styles/Company/CompanyOffer.css";
import type { Offer } from "../../types/OffersType";
import CompanyAddOffer from "./CompanyAddOffer";

const CompanyOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [discover, setDiscover] = useState<number | undefined>(undefined);

  const fetchCompaniesOffers = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/offers`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des offres");
      }
      const data = await response.json();
      setOffers(data);
    } catch (error) {
      alert("Aucune offre disponible");
    }
  }, []);

  useEffect(() => {
    fetchCompaniesOffers();
  }, [fetchCompaniesOffers]);

  return (
    <DashboardLayout userRole={2} activeItem="dashboard">
      <h1>Dashboard Offres</h1>
      <div>
        <CompanyAddOffer onAdd={fetchCompaniesOffers} />
      </div>

      {/* Conteneur global avec la grille */}
      <div className="container_offers">
        {offers.map((offer) => (
          <div className="company_offers" key={offer.id}>
            <h1 className="company_title">{offer.jobTitle}</h1>
            <p>{offer.contractType}</p>

            <button
              className="offer_button"
              type="button"
              onClick={() =>
                setDiscover(discover === offer.id ? undefined : offer.id)
              }
            >
              {discover === offer.id ? "Réduire" : "Découvrir plus"}
            </button>

            {discover === offer.id && (
              <div className="company_description">
                <p>
                  <strong>Description de l'offre :</strong> {offer.description}
                </p>
                <p>
                  <strong>Les attendus: </strong>
                  {offer.requirements}
                </p>
                <p>
                  <strong>Domaine:</strong> {offer.metier}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default CompanyOffers;
