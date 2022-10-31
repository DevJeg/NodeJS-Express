DROP TABLE IF EXISTS tb_users;    

CREATE TABLE tb_users
(
    id_user SERIAL,
    nom_user VARCHAR(25),
    CONSTRAINT tb_users_pkey PRIMARY KEY (nom_user)
);
    
DROP TABLE IF EXISTS tb_postit;    

CREATE TABLE tb_postit
(
    id_postit SERIAL,
    nom_postit VARCHAR(25) NOT NULL,
    dates timestamp WITHOUT TIME zone,
    contenu VARCHAR(150),
    auteur VARCHAR(25) NOT NULL, 
    CONSTRAINT tb_postit_pkey PRIMARY KEY (id_postit),
    CONSTRAINT tb_postit_fkey FOREIGN KEY (auteur)
        REFERENCES tb_users (nom_user)
);