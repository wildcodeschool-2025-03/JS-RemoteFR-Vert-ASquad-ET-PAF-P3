import { Link, useNavigate } from "react-router";
import "../assets/styles/connexion.css";
import { Lock, Mail } from "lucide-react";
import { type FormEventHandler, useRef } from "react";

export default function Connexion() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/connexion`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: (emailRef.current as HTMLInputElement).value,
            password: (passwordRef.current as HTMLInputElement).value,
          }),
        },
      );

      if (response.status === 200) {
        navigate("/tableaudebord");
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="connexion_page">
        <div className="filter_connexion" />
      </div>
      <div className="form_card_connexion">
        <h2>Connexion</h2>

        <form
          action="connexion_form"
          className="connexion_form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">Email</label>
          <Mail size={24} />
          <input
            type="text"
            id="email"
            placeholder="Entrer votre adresse mail"
            ref={emailRef}
          />

          <label htmlFor="password">Password</label>
          <Lock size={24} />
          <input
            type="text"
            id="password"
            placeholder="Entrer votre mot de passe"
            ref={passwordRef}
          />

          <input type="submit" value="Connexion" className="button_connexion" />
        </form>
        <p>
          Vous voulez créer un compte <br />
          Cliquez sur{" "}
          <Link to="/inscription" className="link_inscription">
            créer mon compte
          </Link>
        </p>
      </div>
    </>
  );
}
