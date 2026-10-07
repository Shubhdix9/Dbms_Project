USE uninest;

DELIMITER //

DROP PROCEDURE IF EXISTS CreateLeaseFromBooking//
CREATE PROCEDURE CreateLeaseFromBooking(
    IN p_booking_id INT,
    IN p_start_date DATE,
    IN p_end_date DATE,
    IN p_monthly_rent DECIMAL(10,2),
    IN p_security_deposit DECIMAL(10,2)
)
BEGIN
    DECLARE v_student_id INT;
    DECLARE v_property_id INT;
    DECLARE v_status VARCHAR(20);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    SELECT student_id, property_id, status 
    INTO v_student_id, v_property_id, v_status
    FROM BOOKING
    WHERE booking_id = p_booking_id FOR UPDATE;

    IF v_status != 'APPROVED' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Booking is not in APPROVED state.';
    END IF;

    INSERT INTO LEASE (student_id, property_id, start_date, end_date, monthly_rent, security_deposit, status)
    VALUES (v_student_id, v_property_id, p_start_date, p_end_date, p_monthly_rent, p_security_deposit, 'ACTIVE');

    UPDATE BOOKING SET status = 'COMPLETED' WHERE booking_id = p_booking_id;
    
    UPDATE PROPERTY SET available_slots = available_slots + 1 WHERE property_id = v_property_id;

    COMMIT;
END//

DELIMITER ;
