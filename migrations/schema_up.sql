CREATE TABLE months (
    id serial PRIMARY KEY,
    month varchar(60)
);
CREATE TABLE days (
    id serial PRIMARY KEY,
    month_id serial REFERENCES months(id) on delete cascade,
    day integer,
    temperature integer,
    humidity integer,
    pressure integer
);