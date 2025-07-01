import { Mail } from "lucide-react";
import { useState } from "react";
import { contactSubjects } from "../../data/about/contactSubjects";
import { aboutContent } from "../../data/about/content";

function ContactForm() {
  const [sent, setSent] = useState(false);
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
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  if (sent) {
    return (
      <div className="about-contact-confirm">
        {aboutContent.contact.confirm}
      </div>
    );
  }

  return (
    <form className="about-contact-form" onSubmit={handleSubmit}>
      <div className="about-form-row">
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={form.prenom}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
          required
        />
      </div>
      <div className="about-form-row">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <select
          name="sujet"
          value={form.sujet}
          onChange={handleChange}
          required
        >
          <option value="">Sujet</option>
          {contactSubjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <textarea
        name="message"
        rows={4}
        placeholder="Votre message..."
        value={form.message}
        onChange={handleChange}
        required
      />
      <button type="submit" className="about-btn-main">
        Envoyer le message
      </button>
    </form>
  );
}

export default function AboutContact() {
  return (
    <section className="about-section about-contact about-bg-contact">
      <div className="about-contact-content">
        <div className="about-badge">
          <Mail size={20} color="#ca2061" style={{ marginRight: 8 }} />
          {aboutContent.contact.badge}
        </div>
        <h2>{aboutContent.contact.title}</h2>
        <p>{aboutContent.contact.description}</p>
        <ContactForm />
      </div>
    </section>
  );
}
