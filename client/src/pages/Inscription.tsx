import { Link } from "react-router";

import { Lock, Mail } from "lucide-react";
import {
  type ChangeEventHandler,
  type FormEventHandler,
  useRef,
  useState,
} from "react";
import user from "../assets/images/user.png";
import "../assets/styles/inscription.css";

import { useNavigate } from "react-router";

import { Bounce, ToastContainer, toast } from "react-toastify";

export default function Candidat() {
  const emailRef = useRef<HTMLInputElement>(null);
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const documentRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roleId, setRoleId] = useState<number | undefined>(undefined);

  const navigate = useNavigate();

  const handlePassword: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPassword(event.target.value);
  };
  const confirmHandlePassword: ChangeEventHandler<HTMLInputElement> = (
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role_id: roleId,
            email: (emailRef.current as HTMLInputElement).value,
            password,
            firstname: (firstnameRef.current as HTMLInputElement).value,
            lastname: (lastnameRef.current as HTMLInputElement).value,
            address: (addressRef.current as HTMLInputElement).value,
            number: (numberRef.current as HTMLInputElement).value,
            document: (documentRef.current as HTMLInputElement).value,
          }),
        },
      );

      if (!roleId) {
        toast.error("Veuillez sélectionner votre profil");
        return;
      }
      if (response.status === 201) {
        toast.success(
          "Vous êtes inscrit, redirection vers la page de connexion !",
        );
        setTimeout(() => {
          navigate("/connexion");
        }, 2000);
      } else {
        toast.error("Erreur : vérifiez vos coordonnées !");
      }
    } catch (err) {
      console.error("Les coordonnées sont déjà existantes !");
    }
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

      <div className="inscription_page">
        <div className="filter_inscription" />
      </div>
      <div className="form_card_inscription">
        <h2>Inscription</h2>
        <p>Vous avez déjà un compte !</p>
        <p>
          Cliquez sur{" "}
          <Link to="/connexion" className="link_connexion">
            {" "}
            se connecter
          </Link>
        </p>

        <div className="profil_role">
          <legend> Quel est votre profil ? </legend>
          <div>
            <input
              type="radio"
              id="candidate"
              name="profil"
              value="1"
              onChange={() => setRoleId(1)}
              required
            />
            <label htmlFor="candidate">Postulant</label>
          </div>
          <div>
            <input
              type="radio"
              id="company"
              name="profil"
              value="2"
              onChange={() => setRoleId(2)}
              required
            />
            <label htmlFor="company">Recruteur</label>
          </div>
        </div>

        <form className="inscription_form" onSubmit={handleSubmit}>
          <Mail size={24} />
          {/* <label htmlFor="picture"></label> */}
          {/* <img src={user} alt="Je n'ai pas d'image profil" className="profil_image" /> */}

          <div className="firstname-lastname">
            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              ref={firstnameRef}
              placeholder="Votre prénom"
              required
            />

            <label htmlFor="lastname">Nom</label>
            <input
              type="text"
              ref={lastnameRef}
              placeholder="Votre nom"
              required
            />
          </div>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            placeholder="Votre adresse mail"
            required
          />
          <label htmlFor="password">Mot de passe</label>
          <Lock size={24} />
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
            placeholder="Entrez votre mot de passe"
            required
            minLength={8}
          />

          <label htmlFor="confirm-password">Confirmez votre mot de passe</label>
          <Lock size={24} />
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirmez votre mot de passe"
            value={confirmPassword}
            onChange={confirmHandlePassword}
            required
            minLength={8}
          />

          <label htmlFor="number">Numéro téléphone</label>
          <input
            type="tel"
            ref={numberRef}
            placeholder="Entrez votre numéro de téléphone"
            minLength={10}
          />

          <label htmlFor="address">Addresse postale</label>
          <input
            type="text"
            ref={addressRef}
            placeholder="Renseignez votre addresse"
          />

          <label htmlFor="document">Ajout de documents</label>
          <input
            type="text"
            ref={documentRef}
            placeholder="Ajouter un document"
          />

          <button type="submit" className="button_inscription">
            Valider mon compte
          </button>
        </form>
      </div>
    </>
  );
}
