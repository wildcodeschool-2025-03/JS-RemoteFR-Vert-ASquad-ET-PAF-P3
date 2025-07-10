import { Mail } from "lucide-react";
import { aboutContent } from "../../data/about/content";
import AboutContactForm from "./AboutContactForm";

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
        <AboutContactForm />
      </div>
    </section>
  );
}
