import { useCallback, useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "../../assets/styles/CompanyOffer.css";
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
      {offers.map((offer) => (
        <section className="container_offers" key={offer.id}>
          <div className="company_offers">
            <h1 className="company_title">{offer.jobTitle}</h1>
            <p>{offer.contractType}</p>
          </div>
          <button
            type="button"
            onClick={() =>
              setDiscover(discover === offer.id ? undefined : offer.id)
            }
          >
            {discover === offer.id ? "Réduire" : "Découvrir plus"}
          </button>
          {discover === offer.id && (
            <>
              <p>Description de l'offre : {offer.description}</p>
              <p>Les attendus: {offer.requirements}</p>
              <p>Domaine: {offer.metier}</p>
            </>
          )}
        </section>
      ))}
    </DashboardLayout>
  );
};

export default CompanyOffers;
