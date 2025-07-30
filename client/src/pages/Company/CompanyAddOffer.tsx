import { type FormEventHandler, useCallback, useEffect, useState } from "react";
import type { cityType } from "../../types/CitiesType";
import "../../assets/styles/Company/CompanyAdd.css";
import type Company from "../../../../server/src/types/CompaniesType";

export default function CompanyAddOffer({ onAdd }: { onAdd: () => void }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [cities, setCities] = useState<cityType[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);

  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    metier: "",
    contractType: "",
    description: "",
    salary: "",
    requirements: "",
    company_id: "",
    city_id: "",
  });

  useEffect(() => {
    fetch(`${API_URL}/cities`)
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch(console.error);
  }, []);
  useEffect(() => {
    fetch(`${API_URL}/companies`)
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch(console.error);
  }, []);

  const fetchCompaniesOffers = useCallback(async () => {
    const res = await fetch(`${API_URL}/offers`);
     await res.json();
  }, []);

  useEffect(() => {
    fetchCompaniesOffers();
  }, [fetchCompaniesOffers]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    if (formData.description.length < 10) {
      alert("La description est trop courte!(au minimum 10 caractères)");
      return;
    }

    if (!confirm("Voulez-vous vraiment ajouter ce projet ?")) {
      alert("Ajout annulé !");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/offers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errMessage = await res.text();
        throw new Error(`Erreur ${res.status}: ${errMessage}`);
      }
      setFormData({
        jobTitle: "",
        metier: "",
        contractType: "",
        description: "",
        salary: "",
        requirements: "",
        company_id: "",
        city_id: "",
      });
      setFormVisible(false);
      await onAdd();
    } catch (error) {
      console.error("Erreur add de projet :", error);
    }
  };

  return (
    <div className="add-offer-container">
      <button
        type="button"
        onClick={() => setFormVisible((prev) => !prev)}
        className="add_button"
      >
        {formVisible ? "Annuler" : "Ajouter un projet"}
      </button>

      {formVisible && (
        <form onSubmit={handleSubmit} className="form_add_offer">
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            placeholder="Remplir le nom de l'offre"
          />
          <input
            type="text"
            name="contractType"
            value={formData.contractType}
            onChange={handleChange}
            required
            placeholder="Quel type de contrat ?"
          />
          <select
            name="company_id"
            defaultValue={formData.company_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Choisir une entreprise --</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.siret}-{company.name}
              </option>
            ))}
          </select>

          <select
            name="city_id"
            defaultValue={formData.city_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Choisir une ville --</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.departementId}-{city.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="metier"
            value={formData.metier}
            onChange={handleChange}
            required
            placeholder="Remplir le secteur activité"
            title="Décrivez au minimum 10 caractères votre projet"
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Remplir une synthèse de l'offre"
            title="Décrivez au minimum 10 caractères votre projet"
          />
          <input
            type="text"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            required
            placeholder="Si des spécificités demandés "
            title="Décrivez au minimum 10 caractères votre projet"
          />
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            placeholder="Salaire par année"
            title="Décrivez au minimum 10 caractères votre projet"
          />
          <button type="submit">Enregistrer</button>
        </form>
      )}
    </div>
  );
}
