import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import type { Offer } from "../../types/about";

import "../../assets/styles/CompanyOffer.css";

const CompanyOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchCompaniesOffers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/offers`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des offres");
        }
        const data: Offer[] = await response.json();
        setOffers(data);
      } catch (error) {
        alert("Aucune offres disponibles");
      }
    };

    fetchCompaniesOffers();
  }, []);

  return (
    <DashboardLayout userRole={2} activeItem="dashboard">
      <h1>Dashboard Offres</h1>
      <section className="container_offers">
        {offers.map((offers) => (
          <div key={offers.id} className="company_offers">
            <h1 className="company_title">{offers.jobTitle}</h1>
            <p>{offers.city_name}</p>
          </div>
        ))}
      </section>
    </DashboardLayout>
  );
};

export default CompanyOffers;
