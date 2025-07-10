import { isValidElement, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type {
  AboutFullpageLayoutProps,
  AboutHeroProps,
} from "../../types/about.ts";
import AboutHero from "./AboutHero";

function AboutFullpageLayout({ children }: AboutFullpageLayoutProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const lastScrollTime = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sections = children.length;
  const SCROLL_DELAY = 650;

  useEffect(() => {
    const handleScroll = (delta: number) => {
      const now = Date.now();
      if (now - lastScrollTime.current < SCROLL_DELAY) return;
      setCurrentSection((prev) => {
        let next = prev + delta;
        if (next < 0) next = 0;
        if (next > sections - 1) next = sections - 1;
        if (next !== prev) lastScrollTime.current = now;
        return next;
      });
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      handleScroll(e.deltaY > 0 ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") handleScroll(1);
      else if (e.key === "ArrowUp") handleScroll(-1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [sections]);

  const scrollToSection = (index: number) => {
    setCurrentSection(index);
    lastScrollTime.current = Date.now();
  };

  const renderedChildren = children.map((child: ReactNode, idx: number) => {
    if (isValidElement(child) && child.type === AboutHero) {
      return (
        <AboutHero
          key={child.key ?? idx}
          {...(child.props as AboutHeroProps)}
          scrollToSection={scrollToSection}
        />
      );
    }
    return child;
  });

  return (
    <div className="about-fullpage">
      <div className="about-indicator">
        {children.map((child: ReactNode, idx: number) => (
          <button
            type="button"
            key={
              child && typeof child === "object" && "key" in child && child.key
                ? child.key
                : idx
            }
            onClick={() => scrollToSection(idx)}
            className={`about-dot${currentSection === idx ? " active" : ""}`}
            aria-label={`Section ${idx + 1}`}
          />
        ))}
      </div>
      <div
        ref={containerRef}
        className="about-sections-container"
        style={{ transform: `translateY(-${currentSection * 100}vh)` }}
      >
        {renderedChildren}
      </div>
    </div>
  );
}

export default AboutFullpageLayout;
