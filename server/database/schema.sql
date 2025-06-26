create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  password varchar(255) not null
);
insert into user(id, email, password)
values
  (1, "jdoe@mail.com", "123456");


CREATE TABLE home (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  paragraph TEXT NOT NULL,
)
insert into home (id, title, paragraph)
values
(1,"Cabinet de recrutement informatique", "Nous cultivons les liens que nous établissons,
 les faisant grandir sur le long terme. En tant que membre actif de l"’"écosystème tech local, 
 nous nous appuyons sur un réseau riche en expériences et en expertises. Cela nous permet de tisser des liens à la fois 
 pertinents et vertueux.")
 (2,"", "Les liens les plus durables.")
 (3,"", "Externatic, plus que du recrutement")


 CREATE TABLE offer (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(20) NOT NULL,
  description TEXT NOT NULL,
  wage VARCHAR(150) NOT NULL,
  requierements VARCHAR(150) NOT NULL,
  FOREIGN KEY (city_id)
  REFERENCES KEY city(id)
  ON DELETE CASCADE
  ON UPDATE NO ACTION,
  FOREIGN KEY (company_id)
  REFERENCES KEY company(id)
  ON DELETE CASCADE
  ON UPDATE NO ACTION,
 );

INSERT INTO offer (title, category, description, wage, requierements)
VALUES 
('Développeur Web', 'Informatique', 'Développement d’applications web avec HTML, CSS, JavaScript et PHP.', 32000, 'Connaissance en front-end et back-end, expérience de 2 ans minimum'),

('Assistant RH', 'Ressources Humaines', 'Gestion des dossiers du personnel, recrutement et formation.', 28000, 'Bac+3 minimum, bonnes compétences relationnelles et organisationnelles'),

('Technicien de maintenance', 'Industrie', 'Maintenance préventive et corrective des équipements de production.', 27000, 'CAP/BEP en maintenance, habilitations électriques souhaitées'),

('Chargé de communication', 'Communication', 'Mise en œuvre de la stratégie de communication interne et externe.', 30000, 'Maîtrise des outils de PAO, aisance rédactionnelle, Bac+3'),

('Data Analyst', 'Analyse de données', 'Analyse de bases de données pour en tirer des recommandations business.', 40000, 'Bonne maîtrise de SQL, Excel, Python/R, Bac+5 en statistiques ou équivalent');
