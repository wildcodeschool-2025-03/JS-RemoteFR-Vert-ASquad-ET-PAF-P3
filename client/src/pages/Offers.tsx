import { useEffect, useState } from "react";

import "../styles/Offers.css";

type Offer = {
  id: number;
  jobTitle: string;
  metier: string;
  contractType: string;
  description: string;
  salary: string;
  requirements: string;
  city_id: number;
  company_id: number;
  city: City[];
  company: Company[];
};

type City = {
  name: string;
  departementId: number;
};

type Company = {
  siret: string;
};

export default function Offers() {
  const [options, setOptions] = useState<Offer[]>([]);
  const [filter, setfilter] = useState<Offer[]>([]);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setlocation] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/offers`)
      .then((response) => response.json())
      .then((data: Offer[]) => {
        setOptions(data);
      });
  }, []);

  const metiers = [...new Set(options.map((o) => o.metier))];
  const salaries = [...new Set(options.map((s) => s.salary))];

  const handleSearch = () => {
    let result = options;

    if (search.trim() !== "" || undefined) {
      result = result.filter((o) =>
        o.jobTitle
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "")
          .toLowerCase()
          .includes(
            search
              .normalize("NFD")
              .replace(/\p{Diacritic}/gu, "")
              .toLowerCase(),
          ),
      );
    }

    if (select !== "") {
      result = result.filter((s) => s.metier === select);
    }

    if (salary !== "") {
      result = result.filter((s) => s.salary === salary);
    }
    setfilter(result);
  };

  const handlereset = () => {
    setSearch("");
    setSelect("");
    setSalary("");
  };

  return (
    <>
      <h1 className="title">Nos offres d'emploi</h1>

      <div className="formulaire" aria-label="filter_bar">
        <span className="input_search">
          <label htmlFor="Recherche"> Recherche</label>
          <input
            type="text"
            id="search"
            placeholder=" 🔎 Rechercher votre métier"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </span>
        <span className="select_categories">
          <p> Catégories</p>
          <select value={select} onChange={(e) => setSelect(e.target.value)}>
            <option value="">Domaine(s)</option>
            {metiers.map((a) => (
              <option value={a} key={a}>
                {a}
              </option>
            ))}
          </select>
        </span>
        <span className="select_salary">
          <p> Salaires </p>
          <select value={salary} onChange={(e) => setSalary(e.target.value)}>
            <option value=""> Salaire(s) / année</option>
            {salaries.sort().map((s) => (
              <option value={s} key={s}>
                {s}/année
              </option>
            ))}
          </select>
        </span>
        <span className="select_dpt">
          <p> Départements</p>
          <select
            value={location}
            onChange={(e) => setlocation(e.target.value)}
          >
            <option value=""> 📍Départements</option>
            <option value="" />
          </select>
        </span>
        <span className="submit">
          <button
            type="submit"
            onClick={handleSearch}
            key={search}
            className="button_filter"
          >
            Filtrer
          </button>
          <button type="button" className="reset" onClick={handlereset}>
            Réinitialiser
          </button>
        </span>
      </div>

      {(filter.length > 0 ? filter : options).map((o) => (
        <div className="offres" key={o.id}>
          <h2>{o.jobTitle}</h2>
          <h3>
            {o.contractType} - {o.metier}
          </h3>
          <p>{o.description}</p>
        </div>
      ))}
    </>
  );
}
