USE uninest;

-- LANDLORDS
INSERT INTO LANDLORD (name, phone, email, verification_status) VALUES
('Ramesh Kumar', '9876543210', 'ramesh@example.com', 'VERIFIED'),
('Suresh Singh', '9876543211', 'suresh@example.com', 'VERIFIED'),
('Amit Verma', '9876543212', 'amit@example.com', 'PENDING'),
('Neha Sharma', '9876543213', 'neha@example.com', 'VERIFIED'),
('Vikas Gupta', '9876543214', 'vikas@example.com', 'VERIFIED');

-- PROPERTIES
INSERT INTO PROPERTY (landlord_id, title, property_type, location, distance_from_college, rent_per_person, deposit, electricity_estimate, internet_cost, maintenance_cost, total_capacity, available_slots, available_from, gender_preference, furnished_status, verification_status, rating) VALUES
(1, 'Sunrise PG', 'PG', 'Bapu Nagar', 2.5, 6500, 13000, 500, 200, 300, 10, 5, '2023-08-01', 'MALE', 'Furnished', 'VERIFIED', 4.5),
(2, 'Cozy Home', '1BHK', 'Mansarovar', 4.0, 12000, 24000, 800, 400, 500, 2, 2, '2023-08-15', 'ANY', 'Semi-furnished', 'VERIFIED', 4.2),
(1, 'Elite Girls PG', 'PG', 'Malviya Nagar', 1.5, 8000, 16000, 600, 200, 400, 15, 3, '2023-07-20', 'FEMALE', 'Furnished', 'VERIFIED', 4.8),
(3, 'Students Inn', 'Shared Room', 'Ajmer Road', 1.0, 5000, 10000, 300, 150, 200, 20, 10, '2023-08-05', 'MALE', 'Furnished', 'PENDING', 3.5),
(4, 'Luxury 2BHK', '2BHK', 'Vaishali Nagar', 5.5, 18000, 36000, 1000, 500, 800, 4, 4, '2023-09-01', 'ANY', 'Furnished', 'VERIFIED', 4.9);

-- AMENITIES
INSERT INTO AMENITY (amenity_name, description) VALUES
('Wi-Fi', 'High-speed internet'),
('AC', 'Air conditioning'),
('TV', 'Television'),
('Bed', 'Comfortable bed'),
('Study Table', 'Desk for studying'),
('Parking', 'Dedicated parking space'),
('Washing Machine', 'Laundry facility'),
('Kitchen', 'Access to kitchen'),
('Power Backup', '24x7 electricity backup'),
('Attached Bathroom', 'Private washroom'),
('Gym', 'Fitness center'),
('Refrigerator', 'Fridge for storage'),
('RO Water', 'Purified drinking water'),
('Security', 'CCTV and guard'),
('Housekeeping', 'Daily cleaning'),
('Balcony', 'Outdoor balcony');

-- PROPERTY_AMENITY
INSERT INTO PROPERTY_AMENITY (property_id, amenity_id) VALUES
(1, 1), (1, 4), (1, 5), (1, 13), (1, 15),
(2, 1), (2, 8), (2, 16),
(3, 1), (3, 2), (3, 4), (3, 5), (3, 7), (3, 9), (3, 10), (3, 13), (3, 14), (3, 15),
(4, 4), (4, 5), (4, 13),
(5, 1), (5, 2), (5, 3), (5, 4), (5, 6), (5, 7), (5, 8), (5, 9), (5, 10), (5, 11), (5, 12), (5, 14), (5, 16);

-- STUDENTS
INSERT INTO STUDENT (name, college_name, college_email, phone, course, year, gender, verification_status) VALUES
('Rahul Sharma', 'JK Lakshmipat University', 'rahul.s@jklu.edu.in', '9123456780', 'B.Tech CS', 2, 'MALE', 'VERIFIED'),
('Priya Singh', 'JK Lakshmipat University', 'priya.s@jklu.edu.in', '9123456781', 'BBA', 1, 'FEMALE', 'VERIFIED'),
('Aman Verma', 'Manipal University', 'aman.v@jaipur.manipal.edu', '9123456782', 'B.Tech IT', 3, 'MALE', 'VERIFIED'),
('Kirti Desai', 'JK Lakshmipat University', 'kirti.d@jklu.edu.in', '9123456783', 'B.Des', 2, 'FEMALE', 'PENDING'),
('Rohan Kapoor', 'JK Lakshmipat University', 'rohan.k@jklu.edu.in', '9123456784', 'B.Tech CS', 2, 'MALE', 'VERIFIED');

-- STUDENT_PREFERENCE
INSERT INTO STUDENT_PREFERENCE (student_id, min_budget, max_budget, max_distance, preferred_room_type, preferred_gender, move_in_date, sleep_time, wake_time, cleanliness_level, noise_tolerance, study_habit, food_preference, smoking_preference, guest_preference, ac_preference) VALUES
(1, 5000, 8000, 3.0, 'PG', 'MALE', '2023-08-01', '23:00:00', '07:00:00', 4, 3, 4, 'VEG', 'NON_SMOKER', 3, 0),
(2, 6000, 10000, 2.0, 'PG', 'FEMALE', '2023-07-25', '22:30:00', '06:30:00', 5, 2, 5, 'VEG', 'NON_SMOKER', 2, 1),
(3, 4000, 6000, 5.0, 'Shared Room', 'MALE', '2023-08-10', '01:00:00', '09:00:00', 3, 5, 2, 'NON_VEG', 'SMOKER', 5, 0),
(4, 7000, 15000, 4.0, '1BHK', 'FEMALE', '2023-08-20', '00:00:00', '08:00:00', 4, 4, 3, 'ANY', 'NON_SMOKER', 4, 1),
(5, 5000, 8500, 3.5, 'PG', 'MALE', '2023-08-05', '23:30:00', '07:30:00', 4, 3, 4, 'VEG', 'NON_SMOKER', 3, 0);

-- BOOKING
INSERT INTO BOOKING (student_id, property_id, booking_date, visit_date, booking_type, status) VALUES
(1, 1, '2023-07-15 10:00:00', '2023-07-16', 'VISIT', 'COMPLETED'),
(1, 1, '2023-07-17 11:00:00', NULL, 'RESERVE', 'APPROVED'),
(2, 3, '2023-07-18 09:00:00', NULL, 'RESERVE', 'APPROVED');

-- LEASE
INSERT INTO LEASE (student_id, property_id, start_date, end_date, monthly_rent, security_deposit, status) VALUES
(1, 1, '2023-08-01', '2024-07-31', 6500, 13000, 'ACTIVE'),
(2, 3, '2023-07-25', '2024-07-24', 8000, 16000, 'ACTIVE');

-- REVIEW
INSERT INTO REVIEW (student_id, property_id, lease_id, rating, cleanliness_rating, safety_rating, owner_rating, internet_rating, comment) VALUES
(1, 1, 1, 4, 4, 5, 4, 3, 'Good PG, close to college. Food is okay.'),
(2, 3, 2, 5, 5, 5, 5, 4, 'Very safe and clean. Highly recommended for girls.');
