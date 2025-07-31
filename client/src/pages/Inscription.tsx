import { ArrowRight, User, Users } from "lucide-react";
import { Lock, Mail } from "lucide-react";
import {
  type ChangeEventHandler,
  type FormEventHandler,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router";
import "../assets/styles/inscription.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import logoVertical from "../assets/images/logo-vertical.png";

export default function Inscription() {
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
      toast.error("Vos mots de passe ne correspondent pas");
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

      <main className="auth-page">
        <div className="auth-container auth-container-large">
          <div className="auth-card">
            <div className="auth-header">
              <img src={logoVertical} alt="Externatic" className="auth-logo" />
              <h1 className="auth-title">Rejoignez notre communauté</h1>
              <p className="auth-subtitle">
                Créez votre compte pour accéder aux meilleures opportunités tech
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <span className="form-label">
                  <Users size={20} />
                  Quel est votre profil ?
                </span>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="profil"
                      value="1"
                      onChange={() => setRoleId(1)}
                      required
                    />
                    <span className="radio-custom">
                      <User size={16} />
                      Candidat
                    </span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="profil"
                      value="2"
                      onChange={() => setRoleId(2)}
                      required
                    />
                    <span className="radio-custom">
                      <Users size={16} />
                      Recruteur
                    </span>
                  </label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstname" className="form-label">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    className="form-input"
                    placeholder="Votre prénom"
                    ref={firstnameRef}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname" className="form-label">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    className="form-input"
                    placeholder="Votre nom"
                    ref={lastnameRef}
                    required
                  />
                </div>
              </div>

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
                  placeholder="Au moins 8 caractères"
                  value={password}
                  onChange={handlePassword}
                  required
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Le mot de passe doit contenir au moins 8 caractères, incluant une majuscule, une minuscule et un chiffre"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password" className="form-label">
                  <Lock size={20} />
                  Confirmez le mot de passe
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className="form-input"
                  placeholder="Confirmez votre mot de passe"
                  value={confirmPassword}
                  onChange={confirmHandlePassword}
                  required
                />
              </div>

              <button type="submit" className="auth-btn-primary">
                Créer mon compte <ArrowRight size={20} />
              </button>
            </form>

            <div className="auth-footer">
              <p className="auth-link-text">
                Déjà un compte ?{" "}
                <Link to="/login" className="auth-link">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
