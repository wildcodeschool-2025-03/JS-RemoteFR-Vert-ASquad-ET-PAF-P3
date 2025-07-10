import "../assets/styles/About/AboutCommon.css";
import "../assets/styles/About/AbouPage.css";
import "../assets/styles/About/AboutHero.css";
import "../assets/styles/About/AboutOverview.css";
import "../assets/styles/About/AboutMissions.css";
import "../assets/styles/About/AboutExpertise.css";
import "../assets/styles/About/AboutJoin.css";
import "../assets/styles/About/AboutContact.css";

import AboutContact from "../components/About/AboutContact";
import AboutExpertise from "../components/About/AboutExpertise";
import AboutFullpageLayout from "../components/About/AboutFullpageLayout";
import AboutHero from "../components/About/AboutHero";
import AboutJoin from "../components/About/AboutJoin";
import AboutMissions from "../components/About/AboutMissions";
import AboutOverview from "../components/About/AboutOverview";
import { useIsMobile } from "../hooks/useIsMobile";

function AboutPage() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <main>
        <AboutHero />
        <AboutOverview />
        <AboutMissions />
        <AboutExpertise />
        <AboutJoin />
        <AboutContact />
      </main>
    );
  }

  return (
    <main>
      <AboutFullpageLayout>
        <AboutHero />
        <AboutOverview />
        <AboutMissions />
        <AboutExpertise />
        <AboutJoin />
        <AboutContact />
      </AboutFullpageLayout>
    </main>
  );
}

export default AboutPage;
