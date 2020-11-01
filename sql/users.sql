CREATE DATABASE db_users;

DROP EXTENSION pgcrypto;
CREATE EXTENSION pgcrypto;

CREATE TABLE groups (
    id          UUID,
    name        VARCHAR NOT NULL,
    permissions VARCHAR[] NOT NULL,
    PRIMARY KEY(id),
    UNIQUE(name)
);

INSERT INTO groups (id, name, permissions)
    VALUES
    (gen_random_uuid(), 'admins', '{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}');

CREATE TABLE users (
    id          UUID,
    login       VARCHAR NOT NULL,
    password    VARCHAR NOT NULL,
    age         INTEGER NOT NULL,
    is_deleted  BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(id),
    UNIQUE(login)
);

INSERT INTO users (id, login, password, age) VALUES (gen_random_uuid(), 'john_doe', '$2a$11$gxpHMPqgXPQRdAo79dgXbOVtsQQ3M7L.MtsEc.P2Obzbmy4LUDSUe', 40);
INSERT INTO users (id, login, password, age) VALUES (gen_random_uuid(), 'an_onimus', '$2a$11$gxpHMPqgXPQRdAo79dgXbOVtsQQ3M7L.MtsEc.P2Obzbmy4LUDSUe', 32);
INSERT INTO users (id, login, password, age) VALUES (gen_random_uuid(), 'uk_joe', '$2a$11$gxpHMPqgXPQRdAo79dgXbOVtsQQ3M7L.MtsEc.P2Obzbmy4LUDSUe', 20);
INSERT INTO users (id, login, password, age) VALUES (gen_random_uuid(), 'mr.bean', '$2a$11$gxpHMPqgXPQRdAo79dgXbOVtsQQ3M7L.MtsEc.P2Obzbmy4LUDSUe', 50);
INSERT INTO users (id, login, password, age) VALUES (gen_random_uuid(), 'jane_doe', '$2a$11$gxpHMPqgXPQRdAo79dgXbOVtsQQ3M7L.MtsEc.P2Obzbmy4LUDSUe', 20);

CREATE TABLE IF NOT EXISTS user_groups (
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE ON UPDATE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (group_id, user_id)
);

CREATE TABLE IF NOT EXISTS refresh_token (
    user_id UUID,
    token VARCHAR NOT NULL,
    PRIMARY KEY (user_id)
); 