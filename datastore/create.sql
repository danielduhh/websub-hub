DROP TABLE topic CASCADE;
DROP TABLE subscription CASCADE;

CREATE TABLE topic (
id serial primary key not null,
topic_url character varying not null
);

CREATE TABLE subscription (
id serial primary key not null,
callback character varying not null,
status character varying,
topic_id int not null references topic(id),
duration int,
secret character varying,
created timestamp with time zone,
updated timestamp with time zone
);

-- create view w/ topic metadata and json array of subscriptions
DROP VIEW IF EXISTS vw_topic_details;
CREATE OR REPLACE VIEW vw_topic_details AS 
SELECT t.id, topic_url,

    COALESCE(( SELECT json_agg(t_1.*) AS json_agg
           FROM ( SELECT *
                   FROM subscription s
                   WHERE s.topic_id = t.id) t_1), '[]'::json) AS "subscriptions"
FROM topic t;

-- add test mission
INSERT INTO topic (topic_url) VALUES ('/missions');

-- add test subscriptions
INSERT INTO subscription (secret, callback, topic_id) VALUES ('bugsbunny', 'https://instace0.raasp.us/v1/api/missions', (SELECT id FROM topic WHERE topic_url = '/missions'));
INSERT INTO subscription (secret, callback, topic_id) VALUES ('spacejam', 'https://instace1.raasp.us/v1/api/missions', (SELECT id FROM topic WHERE topic_url = '/missions'));
