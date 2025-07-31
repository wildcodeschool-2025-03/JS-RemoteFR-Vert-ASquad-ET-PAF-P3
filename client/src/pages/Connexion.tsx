import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import "../assets/styles/connexion.css";
import { Lock, Mail } from "lucide-react";
import { type FormEventHandler, useEffect, useRef } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import logoVertical from "../assets/images/logo-vertical.png";
import { useAuth } from "../context/AuthContext";

export default function Connexion() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user) {
      switch (user?.role_id) {
        case 3:
          navigate("/dashboard/admin");
          break;

        case 2:
          navigate("/dashboard/recruteur");
          break;

        case 1:
          navigate("/dashboard/candidat");
          break;

        default:
          navigate("/dashboard");
      }
    }
  }, [user, navigate]);

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
        const { user } = await response.json();
        toast.success("Connexion réussie !");
        setUser(user);
      } else {
        toast.error("Erreur : vérifiez vos coordonnées !");
      }
    } catch (err) {
      toast.error("Erreur: ne vous inquiétez la page va se rafraichir");
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

      <main className="auth-page">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <img src={logoVertical} alt="Externatic" className="auth-logo" />
              <h1 className="auth-title">Bon retour parmi nous</h1>
              <p className="auth-subtitle">
                Connectez-vous pour accéder à votre espace personnel
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <Mail size={20} />
                  Adresse email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="votre.email@exemple.com"
                  ref={emailRef}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  <Lock size={20} />
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  placeholder="Votre mot de passe"
                  ref={passwordRef}
                  required
                />
              </div>

              <button type="submit" className="auth-btn-primary">
                Se connecter <ArrowRight size={20} />
              </button>
            </form>

            <div className="auth-footer">
              <p className="auth-link-text">
                Pas encore de compte ?{" "}
                <Link to="/signup" className="auth-link">
                  Créer un compte
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
