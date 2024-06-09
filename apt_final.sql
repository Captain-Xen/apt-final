-- Create the database
CREATE DATABASE apt_final;
USE apt_final;

-- Create doctors table
CREATE TABLE doctors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(255),
  appointment_type ENUM('Paediatrician', 'Family Physician', 'Dermatologist', 'Dietitian', 'Physiotherapist', 'Special Consultation', 'ECG Heart Test', 'Rapid Tests', 'Cardiologist')
);

-- Create admin users table
CREATE TABLE admin_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  email VARCHAR(255) UNIQUE
);

-- Create doctors users table
CREATE TABLE doctors_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  doctor_id INT,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

-- Create appointments table
CREATE TABLE appointments (
  uid INT PRIMARY KEY AUTO_INCREMENT, 
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  phone_number VARCHAR(20),
  email VARCHAR(255),
  appointment_type ENUM('Paediatrician', 'Family Physician', 'Dermatologist', 'Dietitian', 'Physiotherapist', 'Special Consultation', 'ECG Heart Test', 'Rapid Tests', 'Cardiologist'),
  doctor_id INT,
  appointment_time TIME,
  appointment_date DATE,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

-- Create reviews table
CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_name VARCHAR(255),
  occupation VARCHAR(255),
  review_message TEXT
);

-- Create patients table
CREATE TABLE patients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(255),
  phone_number VARCHAR(20),
  email VARCHAR(255),
  age INT,
  gender ENUM('Male', 'Female', 'Other'),
  date_of_birth DATE,
  visit_type ENUM('Paediatrician', 'Family Physician', 'Dermatologist', 'Dietitian', 'Physiotherapist', 'Special Consultation', 'ECG Heart Test', 'Rapid Tests', 'Cardiologist'),
  doctor_id INT,
  apt_date DATE,
  apt_time TIME,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

-- Create e_prescriptions table
CREATE TABLE e_prescriptions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  patient_id INT,
  doctor_id INT,
  prescription TEXT,
  date_prescribed DATE,
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);


-- Insert doctors into the doctors table
INSERT INTO doctors (full_name, appointment_type) VALUES
('Dr. Llorenia Muir-Green', 'Dermatologist'),
('Dr. Tasque Brown-McCalla', 'Family Physician'),
('Dr. Edmond Miller', 'Family Physician'),
('Dr. Orville Nembhard', 'Family Physician'),
('Ms. Maya Tyson-Young', 'Physiotherapist'),
('Ms. Beverley Anthony', 'Dietitian'),
('Dr. Camille Christian', 'Cardiologist'),
('Dr. Phillip Brown', 'ECG Heart Test'), 
('Dr. Debbie Thompson', 'Dermatologist'),
('Dr. Patricia Lynn', 'Paediatrician'),
('Dr. Annetta Wishart', 'Family Physician');

-- Insert patients into the patients table
INSERT INTO patients (full_name, phone_number, email, age, gender, date_of_birth, visit_type, doctor_id, apt_date, apt_time) VALUES
('John Doe', '555-1234', 'johndoe@example.com', 45, 'Male', '1979-05-15', 'Dermatologist', 1, '2024-06-15', '10:30:00'),
('Jane Smith', '555-5678', 'janesmith@example.com', 32, 'Female', '1992-08-22', 'Family Physician', 2, '2024-06-20', '11:00:00'),
('Michael Johnson', '555-8765', 'michaelj@example.com', 28, 'Male', '1996-01-10', 'Physiotherapist', 5, '2024-06-25', '09:30:00'),
('Emily Davis', '555-4321', 'emilyd@example.com', 39, 'Female', '1985-11-14', 'Dietitian', 6, '2024-06-30', '14:00:00'),
('Christopher Wilson', '555-6543', 'chrisw@example.com', 50, 'Male', '1974-03-03', 'Cardiologist', 7, '2024-07-01', '10:00:00'),
('Jessica Martinez', '555-7890', 'jessicam@example.com', 26, 'Female', '1998-07-19', 'ECG Heart Test', 8, '2024-07-05', '15:30:00'),
('Daniel Taylor', '555-3210', 'danielt@example.com', 41, 'Male', '1983-12-07', 'Family Physician', 3, '2024-07-10', '09:00:00'),
('Ashley Brown', '555-9876', 'ashleyb@example.com', 29, 'Female', '1995-02-28', 'Paediatrician', 10, '2024-07-15', '13:00:00'),
('David Harris', '555-3456', 'davidh@example.com', 35, 'Male', '1989-04-22', 'Dermatologist', 9, '2024-07-20', '12:00:00'),
('Olivia Clark', '555-2109', 'oliviac@example.com', 37, 'Female', '1987-09-05', 'Special Consultation', 4, '2024-07-25', '16:00:00');

