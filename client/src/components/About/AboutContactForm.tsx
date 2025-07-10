import { useState } from "react";
import { contactSubjects } from "../../data/about/contactSubjects";
import { aboutContent } from "../../data/about/content";

export default function AboutContactForm() {
  const [contactSent, setContactSent] = useState(false);
  const [ContactIsSubmitting, setContactIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactIsSubmitting(true);

    setTimeout(() => {
      setContactIsSubmitting(false);
      setContactSent(true);
      setTimeout(() => setContactSent(false), 4000);
    }, 1000);
  };

  if (contactSent) {
    return (
      <div className="about-contact-confirm" role="alert" aria-live="polite">
        {aboutContent.contact.confirm}
      </div>
    );
  }

  return (
    <form
      className="about-contact-form"
      onSubmit={handleSubmit}
      aria-label="Formulaire de contact"
    >
      <fieldset>
        <legend className="sr-only">Informations de contact</legend>

        <div className="about-form-row">
          <div>
            <label htmlFor="prenom" className="sr-only">
              Prénom
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              placeholder="Prénom"
              value={form.prenom}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="nom" className="sr-only">
              Nom
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              placeholder="Nom"
              value={form.nom}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>
        </div>

        <div className="about-form-row">
          <div>
            <label htmlFor="email" className="sr-only">
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              aria-required="true"
              aria-describedby="email-help"
            />
            <span id="email-help" className="sr-only">
              Votre adresse email pour vous recontacter
            </span>
          </div>
          <div>
            <label htmlFor="sujet" className="sr-only">
              Sujet de votre message
            </label>
            <select
              id="sujet"
              name="sujet"
              value={form.sujet}
              onChange={handleChange}
              required
              aria-required="true"
            >
              <option value="">Sujet</option>
              {contactSubjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="sr-only">
            Votre message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Votre message..."
            value={form.message}
            onChange={handleChange}
            required
            aria-required="true"
            aria-describedby="message-help"
          />
          <span id="message-help" className="sr-only">
            Décrivez votre demande ou question
          </span>
        </div>

        <button
          type="submit"
          className="about-btn-main"
          disabled={ContactIsSubmitting}
          aria-describedby={ContactIsSubmitting ? "submit-status" : undefined}
        >
          {ContactIsSubmitting ? "Envoi en cours..." : "Envoyer le message"}
        </button>

        {ContactIsSubmitting && (
          <span id="submit-status" className="sr-only" aria-live="polite">
            Envoi du message en cours
          </span>
        )}
      </fieldset>
    </form>
  );
}
