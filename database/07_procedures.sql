USE uninest;

DELIMITER //

DROP PROCEDURE IF EXISTS GetSuitableProperties//
CREATE PROCEDURE GetSuitableProperties(
    IN p_student_budget DECIMAL(10,2),
    IN p_max_distance DECIMAL(5,2),
    IN p_move_in_date DATE,
    IN p_room_type VARCHAR(50),
    IN p_gender_preference VARCHAR(20),
    IN p_req_amenity_id INT
)
BEGIN
    SELECT 
        p.property_id,
        p.title,
        p.property_type,
        p.location,
        p.distance_from_college,
        p.rent_per_person,
        p.available_slots,
        p.verification_status,
        CalculateTrueMonthlyCost(p.rent_per_person, p.electricity_estimate, p.internet_cost, p.maintenance_cost) AS true_cost
    FROM PROPERTY p
    WHERE 
        p.rent_per_person <= p_student_budget
        AND p.distance_from_college <= p_max_distance
        AND p.available_from <= p_move_in_date
        AND (p_room_type IS NULL OR p.property_type = p_room_type)
        AND (p.gender_preference = 'ANY' OR p.gender_preference = p_gender_preference)
        AND p.available_slots > 0
        AND p.verification_status = 'VERIFIED'
        AND (p_req_amenity_id IS NULL OR EXISTS (
            SELECT 1 FROM PROPERTY_AMENITY pa WHERE pa.property_id = p.property_id AND pa.amenity_id = p_req_amenity_id
        ))
    ORDER BY p.rating DESC, true_cost ASC;
END//

DROP PROCEDURE IF EXISTS CalculateRoommateCompatibility//
CREATE PROCEDURE CalculateRoommateCompatibility(
    IN p_student1_id INT,
    IN p_student2_id INT
)
BEGIN
    DECLARE b_score DECIMAL(5,2) DEFAULT 0;
    DECLARE l_score DECIMAL(5,2) DEFAULT 0;
    DECLARE h_score DECIMAL(5,2) DEFAULT 0;
    DECLARE c_score DECIMAL(5,2) DEFAULT 0;
    DECLARE s1_college VARCHAR(150);
    DECLARE s2_college VARCHAR(150);
    
    DECLARE diff_clean INT;
    DECLARE diff_noise INT;
    DECLARE diff_study INT;
    DECLARE diff_guest INT;

    DECLARE pref1_min_budget DECIMAL(10,2);
    DECLARE pref1_max_budget DECIMAL(10,2);
    DECLARE pref1_clean INT;
    DECLARE pref1_noise INT;
    DECLARE pref1_study INT;
    DECLARE pref1_guest INT;
    DECLARE pref1_food VARCHAR(50);
    DECLARE pref1_smoke VARCHAR(20);
    DECLARE pref1_room VARCHAR(50);
    
    DECLARE pref2_min_budget DECIMAL(10,2);
    DECLARE pref2_max_budget DECIMAL(10,2);
    DECLARE pref2_clean INT;
    DECLARE pref2_noise INT;
    DECLARE pref2_study INT;
    DECLARE pref2_guest INT;
    DECLARE pref2_food VARCHAR(50);
    DECLARE pref2_smoke VARCHAR(20);
    DECLARE pref2_room VARCHAR(50);

    SELECT college_name INTO s1_college FROM STUDENT WHERE student_id = p_student1_id;
    SELECT college_name INTO s2_college FROM STUDENT WHERE student_id = p_student2_id;

    SELECT min_budget, max_budget, cleanliness_level, noise_tolerance, study_habit, guest_preference, food_preference, smoking_preference, preferred_room_type 
    INTO pref1_min_budget, pref1_max_budget, pref1_clean, pref1_noise, pref1_study, pref1_guest, pref1_food, pref1_smoke, pref1_room
    FROM STUDENT_PREFERENCE WHERE student_id = p_student1_id;

    SELECT min_budget, max_budget, cleanliness_level, noise_tolerance, study_habit, guest_preference, food_preference, smoking_preference, preferred_room_type 
    INTO pref2_min_budget, pref2_max_budget, pref2_clean, pref2_noise, pref2_study, pref2_guest, pref2_food, pref2_smoke, pref2_room
    FROM STUDENT_PREFERENCE WHERE student_id = p_student2_id;

    IF pref1_max_budget >= pref2_min_budget AND pref2_max_budget >= pref1_min_budget THEN
        SET b_score = 100;
    ELSE
        SET b_score = 50; 
    END IF;

    SET diff_clean = ABS(pref1_clean - pref2_clean);
    SET diff_noise = ABS(pref1_noise - pref2_noise);
    SET diff_study = ABS(pref1_study - pref2_study);
    SET diff_guest = ABS(pref1_guest - pref2_guest);

    SET l_score = 100 - (diff_clean * 5) - (diff_noise * 5) - (diff_study * 5) - (diff_guest * 5);
    
    IF pref1_food = pref2_food THEN
        SET l_score = l_score + 10;
    END IF;
    
    IF pref1_smoke = pref2_smoke THEN
        SET l_score = l_score + 10;
    END IF;

    IF l_score > 100 THEN SET l_score = 100; END IF;

    IF pref1_room = pref2_room THEN
        SET h_score = 100;
    ELSE
        SET h_score = 50;
    END IF;

    SET c_score = (b_score * 0.20) + (l_score * 0.75) + (h_score * 0.05);

    IF s1_college = s2_college THEN
        SET c_score = LEAST(100, c_score + 5.0);
    END IF;

    INSERT INTO ROOMMATE_MATCH (student_id_1, student_id_2, compatibility_score, budget_score, lifestyle_score, housing_score)
    VALUES (p_student1_id, p_student2_id, c_score, b_score, l_score, h_score)
    ON DUPLICATE KEY UPDATE 
        compatibility_score = VALUES(compatibility_score),
        budget_score = VALUES(budget_score),
        lifestyle_score = VALUES(lifestyle_score),
        housing_score = VALUES(housing_score);

END//

DELIMITER ;
