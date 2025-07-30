import { type FormEventHandler, useState } from "react";
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

  const fetchCompaniesOffers = async () => {
    try{
      const [citiesRes, companiesRes] = await Promise.all([
      fetch(`${API_URL}/cities`),
      fetch(`${API_URL}/companies`),
    ]);
    const [cities, companies] = await Promise.all([
      citiesRes.json(),
      companiesRes.json(),
    ]); setCities(cities);
    setCompanies(companies);
  }catch(error){
console.error
  }
  fetchCompaniesOffers();
  []};

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
            aria-label="Nom de l'offre"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            placeholder="Remplir le nom de l'offre"
          />
          <input
            type="text"
            name="contractType"
            aria-label="Type de contrat"
            value={formData.contractType}
            onChange={handleChange}
            required
            placeholder="Quel type de contrat ?"
          />
          <select
            name="company_id"
            aria-label="Nom de l'enteprise"
            defaultValue={formData.company_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Choisir une entreprise --</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>

          <select
            name="city_id"
            defaultValue={formData.city_id}
            aria-label="Nom de département"
            onChange={handleChange}
            required
          >
            <option value="">-- Choisir un département --</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.departementId}-{city.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="metier"
            aria-label="Domaine de l'offre"
            value={formData.metier}
            onChange={handleChange}
            required
            placeholder="Remplir le secteur activité"
            title="Décrivez au minimum 10 caractères votre projet"
          />
          <input
            type="text"
            name="description"
            aria-label="Description de l'offre"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Remplir une synthèse de l'offre"
            title="Décrivez au minimum 10 caractères votre projet"
          />
          <input
            type="text"
            name="requirements"
            aria-label="Critères de demandés pour l'offre"
            value={formData.requirements}
            onChange={handleChange}
            required
            placeholder="Si des spécificités demandés "
            title="Décrivez au minimum 10 caractères votre projet"
          />
          <input
            type="text"
            name="salary"
            aria-label="Salaire à l'année"
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
