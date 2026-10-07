USE uninest;

SELECT COUNT(*) AS total_students FROM STUDENT;
SELECT COUNT(*) AS verified_students FROM STUDENT WHERE verification_status = 'VERIFIED';
SELECT COUNT(*) AS total_properties FROM PROPERTY;
SELECT COUNT(*) AS verified_properties FROM PROPERTY WHERE verification_status = 'VERIFIED';

SELECT 
    SUM(available_slots) AS total_available_slots,
    SUM(total_capacity - available_slots) AS total_occupied_slots
FROM PROPERTY;

SELECT COUNT(*) AS active_leases FROM LEASE WHERE status = 'ACTIVE';

SELECT AVG(rent_per_person) AS average_rent FROM PROPERTY;

SELECT AVG(rating) AS average_property_rating FROM PROPERTY;

SELECT p.location, COUNT(b.booking_id) AS request_count
FROM BOOKING b
JOIN PROPERTY p ON b.property_id = p.property_id
GROUP BY p.location
ORDER BY request_count DESC
LIMIT 1;

SELECT a.amenity_name, COUNT(pa.property_id) AS property_count
FROM AMENITY a
JOIN PROPERTY_AMENITY pa ON a.amenity_id = pa.amenity_id
GROUP BY a.amenity_name
ORDER BY property_count DESC
LIMIT 1;

SELECT AVG(compatibility_score) AS avg_compatibility FROM ROOMMATE_MATCH;

SELECT title, rating FROM PROPERTY ORDER BY rating DESC LIMIT 5;

SELECT s1.name AS student1, s2.name AS student2, rm.compatibility_score
FROM ROOMMATE_MATCH rm
JOIN STUDENT s1 ON rm.student_id_1 = s1.student_id
JOIN STUDENT s2 ON rm.student_id_2 = s2.student_id
ORDER BY rm.compatibility_score DESC
LIMIT 5;
