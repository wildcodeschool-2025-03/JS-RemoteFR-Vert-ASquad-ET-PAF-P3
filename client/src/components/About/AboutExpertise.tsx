import { aboutContent } from "../../data/about/content";
import { expertises } from "../../data/about/expertises";
import LucideIcon from "./LucideIcon";

export default function AboutExpertise() {
  return (
    <section className="about-section about-expertise about-bg-expertise">
      <div className="about-expertise-content">
        <div className="about-badge">
          <LucideIcon
            iconName={expertises[0].icon}
            size={20}
            style={{ marginRight: 8 }}
          />
          {aboutContent.expertise.badge}
        </div>
        <h2>{aboutContent.expertise.title}</h2>
        <p>{aboutContent.expertise.description}</p>
        <div className="about-expertise-grid">
          {expertises.map((exp) => (
            <div key={exp.id}>
              <LucideIcon
                iconName={exp.icon}
                size={28}
                style={{ marginBottom: 8 }}
              />
              {exp.title}
              <br />
              <span>{exp.details}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
