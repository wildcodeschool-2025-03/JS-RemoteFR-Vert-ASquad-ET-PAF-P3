import { ArrowRight, Briefcase } from "lucide-react";
import { aboutContent } from "../../data/about/content";
import { jobs } from "../../data/about/jobs";

export default function AboutJoin() {
  return (
    <section className="about-section about-join about-bg-join">
      <div className="about-join-content">
        <div className="about-join-mainblock">
          <div className="about-badge">
            <Briefcase size={18} style={{ marginRight: 8 }} />
            {aboutContent.join.badge}
          </div>
          <h2>
            {aboutContent.join.title}
            <span className="about-gradient-pink">
              {aboutContent.join.titleHighlight}
            </span>
          </h2>
          <p>{aboutContent.join.description}</p>
        </div>
        <ul className="about-list about-list-desktop">
          {aboutContent.join.avantages.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="about-join-jobs">
          {jobs.map((job) => (
            <div className="about-join-job-card" key={job.title}>
              <div className="about-join-job">
                <span>{job.title}</span>
                <span>{job.location}</span>
                <ArrowRight size={18} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
