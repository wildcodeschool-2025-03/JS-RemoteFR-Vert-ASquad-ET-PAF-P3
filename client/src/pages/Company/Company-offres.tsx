import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import type { Offer } from "../../types/about";

import "../../assets/styles/CompanyOffer.css";

const Company_offers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/offers`)
      .then((response) => response.json())
      .then((data: Offer[]) => {
        setOffers(data);
      });
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

export default Company_offers;
