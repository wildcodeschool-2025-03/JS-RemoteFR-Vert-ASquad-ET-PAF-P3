import { Link } from "react-router";
import "../assets/styles/inscription.css";

import { useState } from "react";
import Candidat from "../components/Inscription/Candidat";

export default function Inscription() {
  const [roleId, setRoleId] = useState<number | null>(null);

  return (
    <>
      <div className="inscription_page">
        <div className="filter_inscription" />
      </div>
      <div className="form_card_inscription">
        <h2>Inscription</h2>
        <p>
          Vous avez déjà un compte Cliquez sur{" "}
          <Link to="/connexion" className="link_connexion">
            {" "}
            se connecter
          </Link>
        </p>

        <div>
          <legend> Quel est votre profil ? </legend>
          <input
            type="radio"
            id="candidat"
            name="profil"
            value={1}
            onChange={(e) => setRoleId(Number(e.target.value))}
            required
          />
          <label htmlFor="candidat">candidat</label>
          <input
            type="radio"
            id="entreprise"
            name="profil"
            value={2}
            onChange={(e) => setRoleId(Number(e.target.value))}
            required
          />
          <label htmlFor="entreprise">entreprise</label>
        </div>

        <Candidat roleId={roleId} />
      </div>
    </>
  );
}
