import * as LucideIcons from "lucide-react";
import { aboutContent } from "../../data/about/content";
import { missions } from "../../data/about/missions";

export default function AboutMissions() {
  const BadgeIcon = LucideIcons[
    missions[0].icon as keyof typeof LucideIcons
  ] as React.ElementType;
  return (
    <section className="about-section about-missions about-bg-missions">
      <div className="about-missions-content">
        <div className="about-badge">
          {BadgeIcon && (
            <BadgeIcon size={20} style={{ marginRight: 8, color: "#ca2061" }} />
          )}
          {aboutContent.missions.badge}
        </div>
        <h2>{aboutContent.missions.title}</h2>
        <p>{aboutContent.missions.description}</p>
        <div className="about-missions-cards">
          {missions.map((mission) => {
            const Icon = LucideIcons[
              mission.icon as keyof typeof LucideIcons
            ] as React.ElementType;
            return (
              <div className="about-mission-card" key={mission.title}>
                {Icon && (
                  <Icon
                    size={28}
                    style={{ marginBottom: 8, color: "#ca2061" }}
                  />
                )}
                <h3>{mission.title}</h3>
                <p>{mission.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
