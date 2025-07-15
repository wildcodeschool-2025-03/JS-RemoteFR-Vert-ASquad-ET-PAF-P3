CREATE TABLE home (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  paragraph TEXT NOT NULL
);
insert into home (id, title, paragraph)
values
(1,"Cabinet de recrutement informatique", "Nous cultivons les liens que nous établissons,
 les faisant grandir sur le long terme. En tant que membre actif de l’écosystème tech local, 
 nous nous appuyons sur un réseau riche en expériences et en expertises. Cela nous permet de tisser des liens à la fois 
 pertinents et vertueux."),
 (2," ", "Les liens les plus durables."),
 (3," ", "Externatic, plus que du recrutement");

CREATE TABLE role (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,  
  label VARCHAR(50) NOT NULL
);

INSERT INTO role(id, label)
VALUES
(1,"candidat"),
(2,"entreprise"),
(3,"admin");

CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,  
  firstname VARCHAR(255)NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  hashed_password VARCHAR(255) NOT NULL, 
  number  VARCHAR(20)NOT NULL,
  address TEXT NOT NULL,
  picture_src VARCHAR(255) ,
  picture_alt VARCHAR(255) ,
  document VARCHAR(255)  ,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  role_id INT UNSIGNED NOT NULL,  
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE ON UPDATE NO ACTION
);


CREATE TABLE company (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(20) NOT NULL,
  SIRET VARCHAR(20) NOT NULL,
  users_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION
);


CREATE TABLE city (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(20) NOT NULL,
  departementId VARCHAR(5) NOT NULL
);


 CREATE TABLE offer (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  jobTitle VARCHAR(255) NOT NULL,
  metier VARCHAR(20) NOT NULL,
  contractType VARCHAR(20) NOT NULL,
  description TEXT NOT NULL,
  salary VARCHAR(150) NOT NULL,
  requirements VARCHAR(150) NOT NULL,
  city_id INT UNSIGNED NOT NULL,
  company_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (city_id) REFERENCES city(id) ON DELETE CASCADE ON UPDATE NO ACTION,
  FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE ON UPDATE NO ACTION
 );

