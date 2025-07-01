import * as LucideIcons from "lucide-react";
import { aboutContent } from "../../data/about/content";
import { expertises } from "../../data/about/expertises";

export default function AboutExpertise() {
  const BadgeIcon = LucideIcons[
    expertises[0].icon as keyof typeof LucideIcons
  ] as React.ElementType;
  return (
    <section className="about-section about-expertise about-bg-expertise">
      <div className="about-expertise-content">
        <div className="about-badge">
          {BadgeIcon && (
            <BadgeIcon size={20} style={{ marginRight: 8, color: "#ca2061" }} />
          )}
          {aboutContent.expertise.badge}
        </div>
        <h2>{aboutContent.expertise.title}</h2>
        <p>{aboutContent.expertise.description}</p>
        <div className="about-expertise-grid">
          {expertises.map((exp) => {
            const Icon = LucideIcons[
              exp.icon as keyof typeof LucideIcons
            ] as React.ElementType;
            return (
              <div key={exp.title}>
                {Icon && (
                  <Icon
                    size={28}
                    style={{ marginBottom: 8, color: "#ca2061" }}
                  />
                )}
                {exp.title}
                <br />
                <span>{exp.details}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
