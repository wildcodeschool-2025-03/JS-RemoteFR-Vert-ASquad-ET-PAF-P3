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

INSERT INTO role (label)
VALUES
  ("candidat"),
  ("company"),
  ("admin"),
  ("consultant");

CREATE TABLE users (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,  
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL, 
  number  VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  picture VARCHAR(255) DEFAULT NULL,
  document VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  role_id INT UNSIGNED NOT NULL,  
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE ON UPDATE NO ACTION
);

INSERT INTO users ( firstname, lastname, email, password, number, address, picture, document, role_id)
VALUES ( "John", "Doe", "jdoe@mail.com", "hashed_password_here", "0123456789", "123 Main St", NULL, "passport.pdf", 1),
 ('Alice', 'Smith', 'alice@company.com', 'hashed_password', '0987654321', '456 Business Ave', NULL, 'siret.pdf', 2);


CREATE TABLE company (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(20) NOT NULL,
  SIRET VARCHAR(20) NOT NULL,
  users_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION
);
INSERT INTO company (name,SIRET, users_id)
VALUES ("Company",'12345678901234', 2);


CREATE TABLE city (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(20) NOT NULL,
  departementId VARCHAR(5) NOT NULL
);


INSERT INTO city (name, departementId)
VALUES ('Paris', '75');


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

INSERT INTO offer (
  jobTitle, metier, contractType, description, salary, requirements, city_id, company_id
)
VALUES (
  'Développeur Full Stack', 'Informatique', 'CDI', 'Développement d\'applications web.', '45K€', 'Expérience 2 ans minimum', 1, 1
);
