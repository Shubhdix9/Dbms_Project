USE uninest;

DELIMITER //

CREATE TRIGGER trg_booking_approve
BEFORE UPDATE ON BOOKING
FOR EACH ROW
BEGIN
    DECLARE current_slots INT;
    IF NEW.status = 'APPROVED' AND OLD.status != 'APPROVED' THEN
        SELECT available_slots INTO current_slots FROM PROPERTY WHERE property_id = NEW.property_id;
        
        IF current_slots <= 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot approve booking: No slots available.';
        ELSE
            UPDATE PROPERTY SET available_slots = available_slots - 1 WHERE property_id = NEW.property_id;
        END IF;
    END IF;
    
    IF NEW.status = 'CANCELLED' AND OLD.status = 'APPROVED' THEN
        UPDATE PROPERTY SET available_slots = available_slots + 1 WHERE property_id = NEW.property_id;
    END IF;
END//

CREATE TRIGGER trg_lease_create
BEFORE INSERT ON LEASE
FOR EACH ROW
BEGIN
    DECLARE current_slots INT;
    SELECT available_slots INTO current_slots FROM PROPERTY WHERE property_id = NEW.property_id;
    IF current_slots <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot create lease: No slots available.';
    ELSE
        UPDATE PROPERTY SET available_slots = available_slots - 1 WHERE property_id = NEW.property_id;
    END IF;
END//

CREATE TRIGGER trg_review_validate
BEFORE INSERT ON REVIEW
FOR EACH ROW
BEGIN
    DECLARE valid_lease_count INT;
    
    SELECT COUNT(*) INTO valid_lease_count
    FROM LEASE 
    WHERE lease_id = NEW.lease_id 
      AND student_id = NEW.student_id 
      AND property_id = NEW.property_id
      AND status IN ('ACTIVE', 'EXPIRED', 'TERMINATED'); 

    IF valid_lease_count = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid Review: No valid lease found for this student and property.';
    END IF;
END//

CREATE TRIGGER trg_review_update_rating
AFTER INSERT ON REVIEW
FOR EACH ROW
BEGIN
    UPDATE PROPERTY 
    SET rating = (SELECT AVG(rating) FROM REVIEW WHERE property_id = NEW.property_id)
    WHERE property_id = NEW.property_id;
END//

CREATE TRIGGER trg_review_update_rating_upd
AFTER UPDATE ON REVIEW
FOR EACH ROW
BEGIN
    UPDATE PROPERTY 
    SET rating = (SELECT AVG(rating) FROM REVIEW WHERE property_id = NEW.property_id)
    WHERE property_id = NEW.property_id;
END//

DELIMITER ;
