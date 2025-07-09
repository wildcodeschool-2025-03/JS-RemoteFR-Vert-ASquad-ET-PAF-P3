import { ArrowRight, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { aboutContent } from "../../data/about/content";

interface Offer {
  id: number;
  jobTitle: string;
  city_name: string;
}

export default function AboutJoin() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch("/api/offers/featured");
        if (response.ok) {
          const data = await response.json();
          setOffers(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des offres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);
  return (
    <section className="about-section about-join about-bg-join">
      <div className="about-join-content">
        <div className="about-join-mainblock">
          <div className="about-badge">
            <Briefcase size={18} style={{ marginRight: 8 }} />
            {aboutContent.join.badge}
          </div>
          <h2>
            {aboutContent.join.title}
            <span className="about-gradient-pink">
              {aboutContent.join.titleHighlight}
            </span>
          </h2>
          <p>{aboutContent.join.description}</p>
        </div>
        <ul className="about-list about-list-desktop">
          {aboutContent.join.avantages.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="about-join-jobs">
          {loading ? (
            <div className="about-join-loading">
              <p>Chargement des offres...</p>
            </div>
          ) : offers.length > 0 ? (
            offers.map((offer) => (
              <div className="about-join-job-card" key={offer.id}>
                <div className="about-join-job">
                  <span>{offer.jobTitle}</span>
                  <span>{offer.city_name}</span>
                  <ArrowRight size={18} />
                </div>
              </div>
            ))
          ) : (
            <div className="about-join-no-offers">
              <p>Aucune offre disponible</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
