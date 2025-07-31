import { useEffect, useState } from "react";
import { Link } from "react-router";

import "../assets/styles/homepage.css";

import pacman from "/assets/images/pacman.png";

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
  return (
    <main className="mainhomepage">
      {/* Section Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-images">
            <img src={pacman} alt="Pacman" className="imageDev" />
          </div>
          <div className="hero-text">
            <h1 className="homepagetitle">
              Cabinet de{" "}
              <span className="highlight">recrutement informatique</span>
              <span className="yellow-dot">.</span>
            </h1>
            {paragraphe1.map((p1) => (
              <p className="homepageParagraph" key={p1.id}>
                {p1.paragraph}
              </p>
            ))}
            <p className="hero-highlight">Les liens les plus durables.</p>
          </div>
        </div>
      </section>

      {/* Section Accroche */}
      <section className="hook-section">
        {paragraphe2.map((p2) => (
          <h2
            className="phraseAccroche"
            key={p2.id}
            style={{ textAlign: "center", padding: "2rem", margin: "2rem 0" }}
          >
            {p2.paragraph}
          </h2>
        ))}
      </section>

      {/* Section Domaines */}
      <section className="domains-section">
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
          <li>
            <Link to="#">DevOps & Cloud</Link>
          </li>
          <li>
            <Link to="#">Développement Web</Link>
          </li>
          <li>
            <Link to="#">Mobile & IoT</Link>
          </li>
          <li>
            <Link to="#">UX/UI Design</Link>
          </li>
          <li>
            <Link to="#">Blockchain</Link>
          </li>
          <li>
            <Link to="#">Big Data</Link>
          </li>
          <li>
            <Link to="#">Machine Learning</Link>
          </li>
          <li>
            <Link to="#">Backend Development</Link>
          </li>
          <li>
            <Link to="#">Frontend Development</Link>
          </li>
          <li>
            <Link to="#">Architecture Logicielle</Link>
          </li>
          <li>
            <Link to="#">Product Management</Link>
          </li>
          <li>
            <Link to="#">E-commerce</Link>
          </li>
          <li>
            <Link to="#">Fintech</Link>
          </li>
          <li>
            <Link to="#">AR/VR</Link>
          </li>
          <li>
            <Link to="#">Game Development</Link>
          </li>
          <li>
            <Link to="#">Automatisation</Link>
          </li>
          <li>
            <Link to="#">Microservices</Link>
          </li>
          <li>
            <Link to="#">API Development</Link>
          </li>
          <li>
            <Link to="#">Qualité & Testing</Link>
          </li>
          <li>
            <Link to="#">SaaS</Link>
          </li>
          <li>
            <Link to="#">Agile & Scrum</Link>
          </li>
        </ul>
      </section>

      {/* Section Cards */}
      <section className="cards-section">
        <div className="cards-container">
          <h2 className="cards-title">
            Externatic,
            <br />
            plus que du recrutement.
          </h2>
          <div className="cards-grid">
            <div className="card">
              <img
                src="/assets/images/hp-1.png"
                alt="Développeur travaillant sur du code"
                className="card-image"
              />
            </div>
            <div className="card">
              <img
                src="/assets/images/hp-2.png"
                alt="Développeur analysant des données"
                className="card-image"
              />
            </div>
            <div className="card">
              <img
                src="/assets/images/hp-3.png"
                alt="Développeur en réunion"
                className="card-image"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
