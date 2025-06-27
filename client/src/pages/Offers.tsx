import { useEffect, useState } from "react";

import "../styles/Offers.css";

import { Bounce, ToastContainer, toast } from "react-toastify";

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
};

export default function Offers() {
  const [options, setOptions] = useState<Offer[]>([]);
  const [filter, setfilter] = useState<Offer[]>([]);
  const [search, setSearch] = useState("");
  const [select, setselect] = useState("");
  const [salary, setsalary] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/offers`)
      .then((response) => response.json())
      .then((data: Offer[]) => {
        setOptions(data);
      });
  }, []);

  const metiers = [...new Set(options.map((o) => o.metier))];
  const yearly = [...new Set(options.map((s) => s.salary))];

  const handleSearch = () => {
    let result = options;

    if (search.trim() !== "" || undefined) {
      result = result.filter((o) =>
        o.jobTitle.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (select !== "") {
      result = result.filter((s) => s.metier === select);
    }

    if (salary !== "") {
      result = result.filter((s) => s.salary === salary);
    }
    setfilter(result);
    if (filter.length > 0) {
      toast.error("Réessaye ce que tu as cherché n'existe pas");
    }
    setfilter(result);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
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
          <select onChange={(e) => setselect(e.target.value)}>
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
          <select onChange={(e) => setsalary(e.target.value)}>
            <option value=""> Salaire(s) / année</option>
            {yearly.sort().map((s) => (
              <option value={s} key={s}>
                {s}/année
              </option>
            ))}
          </select>
        </span>
        <span className="select_dpt">
          <p> Départements</p>
          <select>
            <option value=""> 📍Departement</option>
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
          <input type="reset" className="reset" />
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
