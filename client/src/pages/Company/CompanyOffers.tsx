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
      {offers.map((offers) => (
        <section className="container_offers" key={offers.id}>
          <div key={offers.id} className="company_offers">
            <h1 className="company_title">{offers.jobTitle}</h1>
            <p>{offers.contractType}</p>
          </div>
          <button
            type="button"
            onClick={() =>
              setDiscover(discover === offers.id ? undefined : offers.id)
            }
          >
            {discover === offers.id ? "Réduire" : "Découvrir plus"}
          </button>
          {discover === offers.id && (
            <>
              <p>{offers.description}</p>
              <p>{offers.requirements}</p>
              <p>{offers.metier}</p>
            </>
          )}
        </section>
      ))}
    </DashboardLayout>
  );
};

export default CompanyOffers;
