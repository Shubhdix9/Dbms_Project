USE uninest;

CREATE OR REPLACE VIEW AVAILABLE_PROPERTIES AS
SELECT 
    p.property_id,
    p.title,
    p.property_type,
    p.location,
    p.distance_from_college,
    p.rent_per_person,
    p.available_slots,
    p.gender_preference,
    p.rating,
    l.name AS landlord_name,
    l.phone AS landlord_phone
FROM PROPERTY p
JOIN LANDLORD l ON p.landlord_id = l.landlord_id
WHERE p.verification_status = 'VERIFIED'
  AND p.available_slots > 0;

CREATE OR REPLACE VIEW HOUSING_RECOMMENDATIONS AS
SELECT 
    p.property_id,
    p.title AS property,
    p.rent_per_person AS rent,
    p.electricity_estimate AS electricity,
    p.internet_cost AS internet,
    p.maintenance_cost AS maintenance,
    (p.rent_per_person + p.electricity_estimate + p.internet_cost + p.maintenance_cost) AS true_monthly_cost,
    p.distance_from_college AS distance,
    p.rating,
    p.verification_status AS verification,
    p.available_slots AS availability,
    ROUND(
        (p.rating / 5.0 * 40) +
        (GREATEST(0, 30000 - (p.rent_per_person + p.electricity_estimate + p.internet_cost + p.maintenance_cost)) / 30000 * 30) +
        (GREATEST(0, 15 - p.distance_from_college) / 15 * 30)
    , 2) AS housing_score
FROM PROPERTY p;

CREATE OR REPLACE VIEW STUDENT_ROOMMATE_RECOMMENDATIONS AS
SELECT
    rm.match_id,
    s1.student_id AS student_1_id,
    s1.name AS student_1_name,
    s2.student_id AS student_2_id,
    s2.name AS student_2_name,
    rm.compatibility_score,
    rm.budget_score,
    rm.lifestyle_score,
    rm.housing_score,
    rm.status,
    rm.matched_on
FROM ROOMMATE_MATCH rm
JOIN STUDENT s1 ON rm.student_id_1 = s1.student_id
JOIN STUDENT s2 ON rm.student_id_2 = s2.student_id
ORDER BY rm.compatibility_score DESC;

CREATE OR REPLACE VIEW TOP_HOUSING_OPTIONS AS
SELECT 
    s.student_id,
    hr.property_id,
    hr.property,
    hr.true_monthly_cost,
    hr.housing_score,
    rm.student_id_2 AS roommate_id,
    s2.name AS roommate_name,
    rm.compatibility_score AS roommate_score,
    rm.compatibility_score,
    ROUND((0.60 * hr.housing_score) + (0.40 * IFNULL(rm.compatibility_score, 0)), 2) AS overall_score
FROM STUDENT s
CROSS JOIN HOUSING_RECOMMENDATIONS hr
LEFT JOIN ROOMMATE_MATCH rm ON s.student_id = rm.student_id_1
LEFT JOIN STUDENT s2 ON rm.student_id_2 = s2.student_id
WHERE hr.verification = 'VERIFIED' AND hr.availability > 0;
