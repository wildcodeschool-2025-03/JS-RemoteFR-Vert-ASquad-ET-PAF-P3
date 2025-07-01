import "../assets/styles/About/AboutCommon.css";
import "../assets/styles/About/AbouPage.css";
import "../assets/styles/about/AboutHero.css";
import "../assets/styles/about/AboutOverview.css";
import "../assets/styles/about/AboutMissions.css";
import "../assets/styles/about/AboutExpertise.css";
import "../assets/styles/about/AboutJoin.css";
import "../assets/styles/about/AboutContact.css";

import { useEffect, useState } from "react";
import AboutContact from "../components/About/AboutContact";
import AboutExpertise from "../components/About/AboutExpertise";
import AboutFullpageLayout from "../components/About/AboutFullpageLayout";
import AboutHero from "../components/About/AboutHero";
import AboutJoin from "../components/About/AboutJoin";
import AboutMissions from "../components/About/AboutMissions";
import AboutOverview from "../components/About/AboutOverview";

function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div>
        <AboutHero />
        <AboutOverview />
        <AboutMissions />
        <AboutExpertise />
        <AboutJoin />
        <AboutContact />
      </div>
    );
  }

  return (
    <AboutFullpageLayout>
      <AboutHero />
      <AboutOverview />
      <AboutMissions />
      <AboutExpertise />
      <AboutJoin />
      <AboutContact />
    </AboutFullpageLayout>
  );
}

export default AboutPage;
