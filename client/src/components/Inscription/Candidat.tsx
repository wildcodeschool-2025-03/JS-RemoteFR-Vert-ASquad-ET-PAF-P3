import { Lock, Mail } from "lucide-react";
import {
  type ChangeEventHandler,
  type FormEventHandler,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router";

import { Bounce, ToastContainer, toast } from "react-toastify";

type profilProps = {
  roleId: number | null;
};

export default function Candidat({ roleId }: profilProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handlePassword: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPassword(event.target.value);
  };
  const confirmHandlePassword: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setConfirmPassword(event.target.value);
  };

  if (!roleId) {
    toast.error("Veuillez sélectionner un profil");
    return;
  }

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inscription`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: (emailRef.current as HTMLInputElement).value,
            password,
            role_id: 1,
          }),
        },
      );
      if (response.status === 201) {
        toast.success(
          "Vous êtes inscrit, redirection vers la page connexion !",
        );
        setTimeout(() => {
          navigate("/connexion");
        }, 2000);
      } else {
        toast.error("Erreur : vérifiez vos coordonnées !");
      }
    } catch (err) {
      console.error("Il y a une erreur !");
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

      <form className="inscription_form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <Mail size={24} />
        <input
          type="email"
          id="email"
          ref={emailRef}
          placeholder="Entrez votre adresse mail"
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
        />

        <button type="submit" className="button_inscription">
          Créer mon compte
        </button>
      </form>
    </>
  );
}
