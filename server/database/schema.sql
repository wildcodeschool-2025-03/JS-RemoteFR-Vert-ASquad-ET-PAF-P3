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