CREATE TABLE IF NOT EXISTS card (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,

    mobile VARCHAR(20) NOT NULL,
    business_phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    company VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL,

    job_id VARCHAR(30) NOT NULL,

    department VARCHAR(50) NOT NULL,
    address VARCHAR(500) NOT NULL,
    resume VARCHAR(500) NOT NULL,

    color_primary VARCHAR(7) NOT NULL,
    color_secondary VARCHAR(7) NOT NULL,

    siteName VARCHAR (255),
    siteUrl VARCHAR(255),

    /* /images/nom_prenom/file_profil.png   */
    file_link_profil VARCHAR(255),
    file_link_background VARCHAR(255),
    file_link_download VARCHAR(255),
    file_link_loader VARCHAR(255),

    facebook VARCHAR(255),
    twitter VARCHAR(255),
    linkedin VARCHAR(255),
    instagram VARCHAR(255),
    skype VARCHAR(255),
    github VARCHAR(255),
    slack VARCHAR(255),
    youtube VARCHAR(255)

    qr_code VARCHAR(7) NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

) ENGINE=InnoDB DEFAULT CHARSET=utf8;;



---------------------------------INSERT---------------------------------
DELIMITER //
CREATE TRIGGER set_default_colors BEFORE INSERT ON card
FOR EACH ROW
BEGIN
    IF NEW.color_primary IS NULL THEN
        SET NEW.color_primary = '#70C2DB';
    END IF;
    IF NEW.color_secondary IS NULL THEN
        SET NEW.color_secondary = '#830E7E';
    END IF;
    IF NEW.qr_code IS NULL THEN
        SET NEW.color_secondary = '#830E7E';
    END IF;
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER set_default_file_links BEFORE INSERT ON card
FOR EACH ROW
BEGIN
    IF NEW.file_link_profil IS NULL THEN
        SET NEW.file_link_profil = 'default_file_link_profil';
    END IF;
    IF NEW.file_link_background IS NULL THEN
        SET NEW.file_link_background = 'default_file_link_background';
    END IF;
    IF NEW.file_link_download IS NULL THEN
        SET NEW.file_link_download = 'default_file_link_download';
    END IF;
    IF NEW.file_link_loader IS NULL THEN
        SET NEW.file_link_loader = 'default_file_link_loader';
    END IF;
END //
DELIMITER ;


---------------------------------INSERT---------------------------------
-- Trigger BEFORE INSERT pour vérifier les champs first_name et last_name
DELIMITER //
CREATE TRIGGER check_names_before_insert BEFORE INSERT ON card
FOR EACH ROW
BEGIN
    IF NEW.first_name IS NULL OR NEW.last_name IS NULL OR CHAR_LENGTH(NEW.first_name) > 30 OR CHAR_LENGTH(NEW.last_name) > 30 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid first_name or last_name';
    END IF;
END //
DELIMITER ;




---------------------------------UPDATE---------------------------------
-- Trigger BEFORE UPDATE pour vérifier les champs first_name et last_name
DELIMITER //
CREATE TRIGGER check_names_before_update BEFORE UPDATE ON card
FOR EACH ROW
BEGIN
    IF NEW.first_name IS NULL OR NEW.last_name IS NULL OR CHAR_LENGTH(NEW.first_name) > 30 OR CHAR_LENGTH(NEW.last_name) > 30 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid first_name or last_name';
    END IF;
END //
DELIMITER ;