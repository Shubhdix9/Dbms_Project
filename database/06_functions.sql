USE uninest;

DELIMITER //

DROP FUNCTION IF EXISTS CalculateTrueMonthlyCost//
CREATE FUNCTION CalculateTrueMonthlyCost(
    rent DECIMAL(10,2),
    electricity DECIMAL(10,2),
    internet DECIMAL(10,2),
    maintenance DECIMAL(10,2)
) RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    RETURN rent + electricity + internet + maintenance;
END//

DELIMITER ;
