CREATE DATABASE db_users;

CREATE TABLE users (
    id          UUID,
    login       VARCHAR NOT NULL,
    password    VARCHAR NOT NULL,
    age         INTEGER NOT NULL,
    is_deleted  BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(id),
    UNIQUE(login)
);

INSERT INTO users (id, login, password, age) VALUES (gen_random_uuid(), 'john_doe', 'P@ssw0rd', 40);
INSERT INTO users (id, login, password, age) VALUES (gen_random_uuid(), 'an_onimus', 'P@ssw0rd', 32);
INSERT INTO users (id, login, password, age) VALUES (gen_random_uuid(), 'uk_joe', 'P@ssw0rd', 20);
INSERT INTO users (id, login, password, age) VALUES (gen_random_uuid(), 'mr.bean', 'P@ssw0rd', 50);
INSERT INTO users (id, login, password, age) VALUES (gen_random_uuid(), 'jane_doe', 'P@ssw0rd', 20);
