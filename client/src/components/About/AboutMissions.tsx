import { aboutContent } from "../../data/about/content";
import { missions } from "../../data/about/missions";
import LucideIcon from "./LucideIcon";

export default function AboutMissions() {
  return (
    <section className="about-section about-missions about-bg-missions">
      <div className="about-missions-content">
        <div className="about-badge">
          <LucideIcon
            iconName={missions[0].icon}
            size={20}
            style={{ marginRight: 8 }}
          />
          {aboutContent.missions.badge}
        </div>
        <h2>{aboutContent.missions.title}</h2>
        <p>{aboutContent.missions.description}</p>
        <div className="about-missions-cards">
          {missions.map((mission) => (
            <div className="about-mission-card" key={mission.id}>
              <LucideIcon
                iconName={mission.icon}
                size={28}
                style={{ marginBottom: 8 }}
              />
              <h3>{mission.title}</h3>
              <p>{mission.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
