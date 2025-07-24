import { ArrowRight, ChevronDown } from "lucide-react";
import { aboutContent } from "../../data/about/content";
import type { AboutHeroProps } from "../../types/about.ts";

export default function AboutHero({
  scrollToSection = () => {},
}: AboutHeroProps) {
  return (
    <section className="about-section about-hero about-bg-hero">
      <div className="about-hero-content">
        <h1>
          <span className="about-gradient-pink">
            {aboutContent.hero.title[0]}
          </span>
          <br />
          <span className="about-hero-black">{aboutContent.hero.title[1]}</span>
          <br />
          <span className="about-gradient-dark">
            {aboutContent.hero.title[2]}
          </span>
        </h1>
        <p className="about-hero-desc">{aboutContent.hero.description}</p>
        <div className="about-hero-actions">
          <button
            type="button"
            className="about-btn-main"
            onClick={() => scrollToSection(1)}
          >
            {aboutContent.hero.btnMain} <ArrowRight size={22} />
          </button>
          <button
            type="button"
            className="about-btn-secondary"
            onClick={() => scrollToSection(5)}
          >
            {aboutContent.hero.btnSecondary}
          </button>
        </div>
      </div>
      <div className="about-hero-arrow">
        <button
          type="button"
          onClick={() => scrollToSection(1)}
          aria-label="Section suivante"
        >
          <ChevronDown size={36} />
        </button>
      </div>
      <div className="about-hero-mobile-overlay" />
    </section>
  );
}
