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
 les faisant grandir sur le long terme. En tant que membre actif de l’écosystème tech local, 
 nous nous appuyons sur un réseau riche en expériences et en expertises. Cela nous permet de tisser des liens à la fois 
 pertinents et vertueux.")
 (2,"", "Les liens les plus durables.")
 (3,"", "Externatic, plus que du recrutement")


 CREATE TABLE offer (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(20) NOT NULL,
  contract_type VARCHAR(20) NOT NULL,
  description TEXT NOT NULL,
  wage VARCHAR(150) NOT NULL,
  requierements VARCHAR(150) NOT NULL,
  city_id INT UNSIGNED NOT NULL,
  company_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (city_id) REFERENCES KEY city(id) ON DELETE CASCADE ON UPDATE NO ACTION,
  FOREIGN KEY (company_id) REFERENCES KEY company(id) ON DELETE CASCADE ON UPDATE NO ACTION
 );


CREATE TABLE company (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(150) NOT NULL,
  phone number VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  SIRET VARCHAR(20) NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE NO ACTION
)

CREATE TABLE city (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  departement VARCHAR(50) NOT NULL,
  ZIP VARCHAR(5)
)