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

INSERT INTO users (id, login, password, age) VALUES (gen_random_uuid(), 'john_doe', 'P@ssw0rd', 40);
INSERT INTO users (id, login, password, age) VALUES (gen_random_uuid(), 'an_onimus', 'P@ssw0rd', 32);
INSERT INTO users (id, login, password, age) VALUES (gen_random_uuid(), 'uk_joe', 'P@ssw0rd', 20);
INSERT INTO users (id, login, password, age) VALUES (gen_random_uuid(), 'mr.bean', 'P@ssw0rd', 50);
INSERT INTO users (id, login, password, age) VALUES (gen_random_uuid(), 'jane_doe', 'P@ssw0rd', 20);

CREATE TABLE IF NOT EXISTS user_groups (
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE ON UPDATE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (group_id, user_id)
);