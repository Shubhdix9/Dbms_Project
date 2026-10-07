USE uninest;

CREATE TABLE STUDENT (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    college_name VARCHAR(150) NOT NULL,
    college_email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    course VARCHAR(100),
    year INT,
    gender VARCHAR(20),
    verification_status VARCHAR(20) DEFAULT 'PENDING'
);

CREATE TABLE LANDLORD (
    landlord_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(150) UNIQUE NOT NULL,
    verification_status VARCHAR(20) DEFAULT 'PENDING'
);

CREATE TABLE PROPERTY (
    property_id INT AUTO_INCREMENT PRIMARY KEY,
    landlord_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    property_type VARCHAR(50) NOT NULL,
    location VARCHAR(150) NOT NULL,
    distance_from_college DECIMAL(5,2) NOT NULL,
    rent_per_person DECIMAL(10,2) NOT NULL,
    deposit DECIMAL(10,2) NOT NULL,
    electricity_estimate DECIMAL(10,2) NOT NULL DEFAULT 0,
    internet_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
    maintenance_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
    total_capacity INT NOT NULL,
    available_slots INT NOT NULL,
    available_from DATE NOT NULL,
    gender_preference VARCHAR(20),
    furnished_status VARCHAR(50),
    verification_status VARCHAR(20) DEFAULT 'PENDING',
    rating DECIMAL(3,2) DEFAULT 0,
    FOREIGN KEY (landlord_id) REFERENCES LANDLORD(landlord_id) ON DELETE CASCADE
);

CREATE TABLE AMENITY (
    amenity_id INT AUTO_INCREMENT PRIMARY KEY,
    amenity_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE PROPERTY_AMENITY (
    property_id INT NOT NULL,
    amenity_id INT NOT NULL,
    PRIMARY KEY(property_id, amenity_id),
    FOREIGN KEY (property_id) REFERENCES PROPERTY(property_id) ON DELETE CASCADE,
    FOREIGN KEY (amenity_id) REFERENCES AMENITY(amenity_id) ON DELETE CASCADE
);

CREATE TABLE STUDENT_PREFERENCE (
    preference_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT UNIQUE NOT NULL,
    min_budget DECIMAL(10,2),
    max_budget DECIMAL(10,2),
    max_distance DECIMAL(5,2),
    preferred_room_type VARCHAR(50),
    preferred_gender VARCHAR(20),
    move_in_date DATE,
    sleep_time TIME,
    wake_time TIME,
    cleanliness_level INT,
    noise_tolerance INT,
    study_habit INT,
    food_preference VARCHAR(50),
    smoking_preference VARCHAR(20),
    guest_preference INT,
    ac_preference BOOLEAN,
    FOREIGN KEY (student_id) REFERENCES STUDENT(student_id) ON DELETE CASCADE
);

CREATE TABLE ROOMMATE_MATCH (
    match_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id_1 INT NOT NULL,
    student_id_2 INT NOT NULL,
    compatibility_score DECIMAL(5,2) DEFAULT 0,
    budget_score DECIMAL(5,2) DEFAULT 0,
    lifestyle_score DECIMAL(5,2) DEFAULT 0,
    housing_score DECIMAL(5,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'PENDING',
    matched_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id_1) REFERENCES STUDENT(student_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id_2) REFERENCES STUDENT(student_id) ON DELETE CASCADE
);

CREATE TABLE BOOKING (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    property_id INT NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    visit_date DATE,
    booking_type VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    FOREIGN KEY (student_id) REFERENCES STUDENT(student_id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES PROPERTY(property_id) ON DELETE CASCADE
);

CREATE TABLE LEASE (
    lease_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    property_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    monthly_rent DECIMAL(10,2) NOT NULL,
    security_deposit DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    FOREIGN KEY (student_id) REFERENCES STUDENT(student_id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES PROPERTY(property_id) ON DELETE CASCADE
);

CREATE TABLE REVIEW (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    property_id INT NOT NULL,
    lease_id INT NOT NULL,
    rating INT NOT NULL,
    cleanliness_rating INT,
    safety_rating INT,
    owner_rating INT,
    internet_rating INT,
    comment TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES STUDENT(student_id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES PROPERTY(property_id) ON DELETE CASCADE,
    FOREIGN KEY (lease_id) REFERENCES LEASE(lease_id) ON DELETE CASCADE
);
