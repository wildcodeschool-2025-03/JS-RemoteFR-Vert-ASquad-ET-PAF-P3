import { Users } from "lucide-react";
import { aboutContent } from "../../data/about/content";
import { stats } from "../../data/about/stats";

export default function AboutOverview() {
  return (
    <section className="about-section about-overview about-bg-apropos">
      <div className="about-overview-content">
        <div className="about-overview-left">
          <span
            className="about-badge"
            style={{ display: "block", marginBottom: "1rem" }}
          >
            <Users size={18} style={{ marginRight: 8 }} />
            {aboutContent.overview.badge}
          </span>
          <h2>{aboutContent.overview.title}</h2>
          <p>{aboutContent.overview.description}</p>
          <ul className="about-list">
            {aboutContent.overview.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="about-overview-right">
          <div className="about-overview-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span>{stat.value}</span>
                <br />
                {stat.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
