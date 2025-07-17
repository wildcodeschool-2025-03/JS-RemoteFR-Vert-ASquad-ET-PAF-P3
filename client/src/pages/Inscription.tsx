import { Link } from "react-router";

import { Lock, Mail } from "lucide-react";
import {
  type ChangeEventHandler,
  type FormEventHandler,
  useRef,
  useState,
} from "react";
import "../assets/styles/inscription.css";

import { useNavigate } from "react-router";

import { Bounce, ToastContainer, toast } from "react-toastify";

export default function Candidat() {
  const emailRef = useRef<HTMLInputElement>(null);
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);

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
    if (!roleId) {
      toast.error("Veuillez sélectionner votre profil");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Vos mots de passes ne correspondent pas");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role_id: roleId,
          email: (emailRef.current as HTMLInputElement).value,
          password,
          firstname: (firstnameRef.current as HTMLInputElement).value,
          lastname: (lastnameRef.current as HTMLInputElement).value,
        }),
      });

      if (response.status === 201) {
        toast.success(
          "Vous êtes inscrit, redirection vers la page de connexion !",
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error("Cet utilisateur existe déjà !");
      }
    } catch (error) {
      toast.error("Une erreur est survenue, nous nous occupons de ça !");
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

      <section className="inscription_page">
        <section className="filter_inscription" />
      </section>
      <section className="form_card_inscription">
        <h2>Inscription</h2>
        <section className="login_message">
          <p>Déjà inscris ?</p>
          <Link to="/login" className="link_connexion">
            Connecte-toi
          </Link>
        </section>
        <form className="inscription_form" onSubmit={handleSubmit}>
          <section className="profil_role">
            <legend> Quel est votre profil ? </legend>
            <input
              type="radio"
              id="candidate"
              name="profil"
              value="1"
              onChange={() => setRoleId(1)}
              required
            />
            <label htmlFor="candidate">Postulant</label>
            <input
              type="radio"
              id="company"
              name="profil"
              value="2"
              onChange={() => setRoleId(2)}
              required
            />
            <label htmlFor="company">Recruteur</label>
          </section>

          <Mail />

          <section className="firstname-lastname">
            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              id="prénom"
              ref={firstnameRef}
              placeholder="Votre prénom"
              required
            />

            <label htmlFor="lastname">Nom</label>
            <input
              type="text"
              id="Nom"
              ref={lastnameRef}
              placeholder="Votre nom"
              required
            />
          </section>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            placeholder="Votre adresse mail"
            required
            title="Votre email doit suivre ce format"
          />
          <label htmlFor="password">Mot de passe</label>
          <Lock />
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
            placeholder="Entrez votre mot de passe"
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Votre mot de passe doit contenir au moins un chiffre et une lettre majuscule et minuscule avec au moins 8 caractères ou plus"
          />

          <label htmlFor="confirm-password">Confirmez votre mot de passe</label>
          <Lock />
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirmez votre mot de passe"
            value={confirmPassword}
            onChange={confirmHandlePassword}
            required
            title="Votre mot de passe doit correspondre"
          />

          <button type="submit" className="button_inscription">
            Valider mon compte
          </button>
        </form>
      </section>
    </>
  );
}
