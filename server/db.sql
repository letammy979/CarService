CREATE DATABASE CarService;

CREATE TABLE appt_table(
  _id serial PRIMARY KEY,
  date DATE,
  time TIME
);

CREATE TABLE service_table(
  _id serial PRIMARY KEY,
  service_name VARCHAR,
  service_price INT
);

INSERT INTO service_table(service_name, service_price) VALUES
  ('Oil change', 20),
  ('Brakes check', 30),
  ('Tires rotation', 320),
  ('Battery check', 100),
  ('Transmission flush', 50)

CREATE TABLE appt_details(
  _id serial PRIMARY KEY,
  service_id INT,
  appt_id INT,
  CONSTRAINT fk_service
  FOREIGN KEY(service_id)
  REFERENCES service_table(_id),
  CONSTRAINT fk_appt
  FOREIGN KEY(appt_id)
  REFERENCES appt_table(_id)
);

