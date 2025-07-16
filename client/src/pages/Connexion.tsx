import { Link, useNavigate } from "react-router";
import "../assets/styles/connexion.css";
import { Lock, Mail } from "lucide-react";
import { type FormEventHandler, useRef } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function Connexion() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: (emailRef.current as HTMLInputElement).value,
          password: (passwordRef.current as HTMLInputElement).value,
        }),
      });

      if (response.status === 200) {
        navigate("/dashboard");
      } else {
        toast.error("Erreur : vérifiez vos coordonnées !");
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {" "}
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
            required
          />

          <label htmlFor="password">Password</label>
          <Lock size={24} />
          <input
            type="password"
            id="password"
            placeholder="Entrer votre mot de passe"
            ref={passwordRef}
            required
          />

          <input type="submit" value="Connexion" className="button_connexion" />
        </form>
        <p>Tu veux te donner une chance ?</p>
        <p>
          <Link to="/signup" className="link_inscription">
            Inscrit toi{" "}
          </Link>
        </p>
      </div>
    </>
  );
}
