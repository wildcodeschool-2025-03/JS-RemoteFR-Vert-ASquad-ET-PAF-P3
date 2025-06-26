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
  username VARCHAR(255) NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL, 
  phone_number  VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  picture VARCHAR(255) DEFAULT NULL,
  document VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  role_id INT UNSIGNED NOT NULL,  
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE ON UPDATE NO ACTION
);

INSERT INTO users (username, firstname, lastname, email, password, phone_number, address, picture, document, role_id)
VALUES ("jdoe", "John", "Doe", "jdoe@mail.com", "hashed_password_here", "0123456789", "123 Main St", NULL, "passport.pdf", 1),
 ('companyuser', 'Alice', 'Smith', 'alice@company.com', 'hashed_password', '0987654321', '456 Business Ave', NULL, 'siret.pdf', 2);



CREATE TABLE candidate (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  birthday DATE NOT NULL,
  users_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION
);
INSERT INTO candidate (birthday, users_id)
VALUES ('1990-05-15', 1);



CREATE TABLE company (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  SIRET VARCHAR(20) NOT NULL,
  users_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION
);
INSERT INTO company (SIRET, users_id)
VALUES ('12345678901234', 2);


CREATE TABLE city (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  departement_name VARCHAR(20) NOT NULL,
  id_departement VARCHAR(5) NOT NULL
);

INSERT INTO city (departement_name, id_departement)
VALUES ('Paris', '75');


 CREATE TABLE offer (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  job_title VARCHAR(255) NOT NULL,
  metier VARCHAR(20) NOT NULL,
  contract_type VARCHAR(20) NOT NULL,
  description TEXT NOT NULL,
  salary VARCHAR(150) NOT NULL,
  requierements VARCHAR(150) NOT NULL,
  city_id INT UNSIGNED NOT NULL,
  company_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (city_id) REFERENCES  city(id) ON DELETE CASCADE ON UPDATE NO ACTION,
  FOREIGN KEY (company_id) REFERENCES  company(id) ON DELETE CASCADE ON UPDATE NO ACTION
 );

INSERT INTO offer (
  job_title, metier, contract_type, description, salary, requierements, city_id, company_id
)
VALUES (
  'Développeur Full Stack', 'Informatique', 'CDI', 'Développement d\'applications web.', '45K€', 'Expérience 2 ans minimum', 1, 1
);
