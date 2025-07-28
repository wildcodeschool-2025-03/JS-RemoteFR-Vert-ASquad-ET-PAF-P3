import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import type { Offer } from "../../types/about";

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
      {offers.map((offers) => (
        <div key={offers.id}>
          <h1>{offers.jobTitle}</h1>
          <p>{offers.city_name}</p>
        </div>
      ))}
    </DashboardLayout>
  );
};

export default Company_offers;
