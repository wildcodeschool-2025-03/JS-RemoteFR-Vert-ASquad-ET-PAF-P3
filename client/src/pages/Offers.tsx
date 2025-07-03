import { ListFilter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import "../assets/styles/Offers.css";

type Offer = {
  offer_id: number;
  jobTitle: string;
  metier: string;
  contractType: string;
  description: string;
  salary: string;
  requirements: string;
  city_id: number;
  company_id: number;
  city_name: string;
  company_siret: string;
  departementId: number;
};

export default function Offers() {
  const [options, setOptions] = useState<Offer[]>([]);
  const [filter, setfilter] = useState<Offer[]>([]);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/offers`)
      .then((response) => response.json())
      .then((data: Offer[]) => {
        setOptions(data);
        setfilter(data);
      });
  }, []);
  console.log(options);

  const metiers = [...new Set(options.map((o) => o.metier))];
  const salaries = [...new Set(options.map((s) => s.salary))];
  const cities = [...new Set(options.map((s) => s.city_name))];

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
    if (location !== "") {
      result = result.filter((s) => s.city_name === location);
    }
    setfilter(result);
  };

  const handlereset = () => {
    setSearch("");
    setSelect("");
    setSalary("");
    setLocation("");
    return setfilter(options);
  };

  return (
    <>
      <h1 className="title">Nos offres d'emploi</h1>

      <div className="formulaire" aria-label="filter_bar">
        <span className="recherche">
          <p className="search_label"> Recherche</p>
          <Search size={16} />
          <input
            type="text"
            id="search"
            placeholder="Rechercher votre métier"
            value={search}
            aria-label="recherche emploi"
            onChange={(e) => setSearch(e.target.value)}
            className="search_input"
          />
        </span>

        <span className="catégories">
          <p> Catégories</p>
          <select
            value={select}
            aria-label="recherche par catégories de domaines"
            onChange={(e) => setSelect(e.target.value)}
          >
            <option value="">Domaine(s)</option>
            {metiers.map((a) => (
              <option value={a} key={a} className="options_values">
                {a}
              </option>
            ))}
          </select>
        </span>

        <span className="salaires">
          <p> Salaires </p>
          <select
            value={salary}
            aria-label="recherche par tranches de salaires"
            onChange={(e) => setSalary(e.target.value)}
          >
            <option value=""> Salaire(s)</option>
            {salaries.sort().map((s) => (
              <option value={s} key={s}>
                {s}/année
              </option>
            ))}
          </select>
        </span>

        <span className="départements">
          <p>Départements</p>
          <select
            value={location}
            aria-label="recherche par départements"
            onChange={(e) => setLocation(e.target.value)}
            className="dpt"
          >
            <option value="">Départements</option>
            {cities.map((c) => (
              <option value={c} key={c}>
                {c}
              </option>
            ))}
          </select>
        </span>

        <span className="submit">
          <button
            type="submit"
            onClick={handleSearch}
            key={search}
            className="button_filter"
          >
            <ListFilter size={16} /> Filtrer
          </button>
          <button type="button" className="reset" onClick={handlereset}>
            Réinitialiser
          </button>
        </span>
      </div>

      {(filter.length > 0 ? filter : options).map((o) => (
        <div className="offres" key={o.offer_id}>
          <h2>{o.jobTitle}</h2>
          <h3>
            {o.departementId} - {o.city_name}
          </h3>
          <h4>{o.contractType}</h4>
        </div>
      ))}
    </>
  );
}
