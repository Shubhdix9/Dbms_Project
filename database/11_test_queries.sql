USE uninest;

SELECT * FROM PROPERTY;
SELECT * FROM PROPERTY WHERE rent_per_person < 10000;
SELECT * FROM PROPERTY WHERE distance_from_college <= 3.0;
SELECT * FROM AVAILABLE_PROPERTIES;
SELECT p.title FROM PROPERTY p JOIN PROPERTY_AMENITY pa ON p.property_id = pa.property_id JOIN AMENITY a ON pa.amenity_id = a.amenity_id WHERE a.amenity_name = 'Wi-Fi';
SELECT property, true_monthly_cost FROM HOUSING_RECOMMENDATIONS;
CALL GetSuitableProperties(15000, 5.0, '2023-08-30', 'PG', 'MALE', NULL);
CALL CalculateRoommateCompatibility(1, 5);
SELECT * FROM STUDENT_ROOMMATE_RECOMMENDATIONS;
SELECT * FROM TOP_HOUSING_OPTIONS;
SELECT * FROM REVIEW;
SELECT property_id, AVG(rating) FROM REVIEW GROUP BY property_id;
