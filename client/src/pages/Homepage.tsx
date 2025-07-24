import { useEffect, useState } from "react";
import { Link } from "react-router";

import "../assets/styles/homepage.css";

import developper2 from "../assets/images/Frame 3.png";
import developper from "../assets/images/developer-looking-at-code-1.png";
import developper1 from "../assets/images/developer-looking-at-code-2.png";

type homes = {
  id: number;
  title: string;
  paragraph: string;
};

export default function Homepage() {
  const [infohome, setInfoHome] = useState<homes[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/home`)
      .then((response) => response.json())
      .then((data: homes[]) => {
        setInfoHome(data);
      });
  }, []);

  const paragraphe1 = infohome.filter((homefiltered) => homefiltered.id === 1);
  const paragraphe2 = infohome.filter((homefiltered) => homefiltered.id === 2);
  const paragraphe3 = infohome.filter((homefiltered) => homefiltered.id === 3);

  return (
    <main className="mainhomepage">
      <div>
        {infohome.map((home) => (
          <h1 className="homepagetitle" key={home.id}>
            {home.title}
          </h1>
        ))}
        <img
          src={developper2}
          alt="Développeur informatique"
          className="imageDev"
        />
        <img
          src={developper}
          alt="Développeur informatique"
          className="imageDev1"
        />
        {paragraphe1.map((p1) => (
          <p className="homepageParagraph" key={p1.id}>
            {p1.paragraph}
          </p>
        ))}
        {paragraphe2.map((p2) => (
          <h2 className="phraseAccroche" key={p2.id}>
            {p2.paragraph}
          </h2>
        ))}
      </div>
      <ul className="listdomaine">
        <li>
          <Link to="#">Cybersécurité</Link>
        </li>
        <li>
          <Link to="#">Informatique & IA</Link>
        </li>
        <li>
          <Link to="#">Data & IA</Link>
        </li>
      </ul>
      {paragraphe3.map((p) => (
        <h2 className="phraseAccroche" key={p.id}>
          {p.paragraph}
        </h2>
      ))}
      <img
        src={developper1}
        alt="Développeur informatique"
        className="imageDev2"
      />
    </main>
  );
}
