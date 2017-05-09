CREATE TABLE months (
    id serial PRIMARY KEY,
    month varchar(60)
);
CREATE TABLE days (
    id serial PRIMARY KEY,
    month_id integer REFERENCES months(id) on delete cascade,
    day integer,
    temperature decimal,
    humidity decimal,
    pressure decimal
);

CREATE TABLE location (
    id serial PRIMARY KEY,
    latitude decimal,
    longitude decimal
);