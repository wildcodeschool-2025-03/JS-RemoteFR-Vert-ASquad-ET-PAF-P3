import { Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router";
import "../assets/styles/inscription.css";
import { type ChangeEventHandler, type FormEventHandler, useRef, useState } from "react";

export default function Inscription() {
  const emailRef = useRef<HTMLInputElement>(null);
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handlePassword: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassword: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inscription`,
        {
          method: "POST",
          headers: { "content-type ": "application/json" },
          body: JSON.stringify({
            lastname: (lastnameRef.current as HTMLInputElement).value,
            firstname: (firstnameRef.current as HTMLInputElement).value,
            email: (emailRef.current as HTMLInputElement).value,
            password,
          }),
        },
      );
      if (response.status === 201) {
        navigate("/connexion");
      } else {
        console.error("Error");
      }
    } catch (err) {
      ("Erreur: vérifiez vos coordonnées!");
    }
  };

  return (
    <>
      <div className="inscription_page">
        <div className="filter_inscription" />
      </div>
      <div className="form_card_inscription">
        <h2>Inscription</h2>

        <form
          action="inscription_form"
          className="inscription_form"
          onSubmit={handleSubmit}
        >
          <div className="firstname-lastname">
            <label htmlFor="Nom">Nom</label>
            <label htmlFor="Prénom">Prénom</label>
            <input
              type="text"
              id="lastname"
              placeholder="Entrez votre nom"
              ref={lastnameRef}
            />
            <input
              type="text"
              id="firstname"
              placeholder="Entrez votre prénom"
              ref={firstnameRef}
            />
          </div>
          <label htmlFor="email">Email</label>
          <Mail size={24} />
          <input
            type="text"
            id="email"
            placeholder="Entrez votre adresse mail"
            ref={emailRef}
          />
          <label htmlFor="password">Mot de passe</label>
          <Lock size={24} />
          <input
            type="text"
            id="password"
            value={password}
            placeholder="Entrez votre mot de passe"
            onChange={handlePassword}
          />

          <label htmlFor="confirm-password">Confirmez votre mot de passe</label>
          <Lock size={24} />
          <input
            type="text"
            id="confirm-password"
            placeholder="Confirmez votre mot de passe"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />

          <input
            type="submit"
            value="Valider votre inscription"
            className="button_inscription"
          />
        </form>
        <p>
          Vous avez déjà un compte <br />
          Cliquez sur{" "}
          <Link to="/connexion" className="link_connexion">
            {" "}
            se connecter
          </Link>
        </p>
      </div>
    </>
  );
}
