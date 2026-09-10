-- Elixir Blood Donors Portal — database schema (PostgreSQL)

CREATE TYPE blood_group_enum AS ENUM ('A+','A-','B+','B-','AB+','AB-','O+','O-');
CREATE TYPE request_status_enum AS ENUM ('open', 'fulfilled', 'cancelled');

CREATE TABLE donors (
  id                  SERIAL PRIMARY KEY,
  name                VARCHAR(120) NOT NULL,
  age                 SMALLINT NOT NULL CHECK (age BETWEEN 18 AND 65),
  blood_group         blood_group_enum NOT NULL,
  city                VARCHAR(80) NOT NULL,
  phone               VARCHAR(20) NOT NULL,
  email               VARCHAR(160),
  last_donation_date  DATE,
  is_available        BOOLEAN NOT NULL DEFAULT TRUE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_donors_blood_group ON donors (blood_group);
CREATE INDEX idx_donors_city ON donors (LOWER(city));

CREATE TABLE blood_requests (
  id                SERIAL PRIMARY KEY,
  patient_name      VARCHAR(120) NOT NULL,
  blood_group       blood_group_enum NOT NULL,
  city              VARCHAR(80) NOT NULL,
  units_needed      SMALLINT NOT NULL DEFAULT 1,
  hospital          VARCHAR(160),
  contact_phone     VARCHAR(20) NOT NULL,
  status            request_status_enum NOT NULL DEFAULT 'open',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_requests_blood_group ON blood_requests (blood_group);
CREATE INDEX idx_requests_status ON blood_requests (status);

CREATE TABLE helplines (
  id      SERIAL PRIMARY KEY,
  name    VARCHAR(120) NOT NULL,
  number  VARCHAR(40) NOT NULL,
  note    VARCHAR(200)
);

INSERT INTO helplines (name, number, note) VALUES
  ('National Blood Helpline', '1800-180-1104', '24/7, toll-free across India'),
  ('Indian Red Cross Society', '011-2371-6441', 'Blood bank coordination'),
  ('Ambulance', '108', 'Medical emergencies');
