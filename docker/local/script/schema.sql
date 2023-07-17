CREATE TABLE IF NOT EXISTS card (
    id INT AUTO_INCREMENT PRIMARY KEY,

    /*User*/
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

    /*Colors*/
    color_primary VARCHAR(7) NOT NULL,
    color_secondary VARCHAR(7) NOT NULL,
    qr_code VARCHAR(7) NOT NULL,

    /*URL*/
    siteName VARCHAR (255),
    siteUrl VARCHAR(255),

    /* Image*/
    file_link_profil BLOB,
    file_link_background VBLOB,
    file_link_download BLOB,
    file_link_loader BLOB,

    /* Social Networks  */
    facebook VARCHAR(255),
    twitter VARCHAR(255),web sud toulouse
    linkedin VARCHAR(255),
    instagram VARCHAR(255),
    skype VARCHAR(255),
    github VARCHAR(255),
    slack VARCHAR(255),
    youtube VARCHAR(255),
    behince VARCHAR (255),
    whatsapp VARCHAR(255),

    /*Stores the creation timestamp of each record*/
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    /*Stores the last update timestamp of each record*/
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

) ENGINE=InnoDB DEFAULT CHARSET=utf8;; /*Clause specifies the storage engine for the table*/



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
        SET NEW.qr_code = '#830E7E';
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
CREATE TRIGGER check_fields_before_insert BEFORE INSERT ON card
FOR EACH ROW
BEGIN
    IF NEW.first_name IS NULL OR NEW.last_name IS NULL OR CHAR_LENGTH(NEW.first_name) > 30 OR CHAR_LENGTH(NEW.last_name) > 30 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ValueERROR';
    END IF;
    IF NEW.mobile IS NULL OR NEW.business_phone IS NULL OR CHAR_LENGTH(NEW.mobile) > 20 OR CHAR_LENGTH(NEW.business_phone) > 20 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ValueERROR';
    END IF;
    IF NEW.email IS NULL OR CHAR_LENGTH(NEW.email)>100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ValueERROR';
    END IF;
    IF NEW.company IS NULL OR NEW.position IS NULL OR NEW.job_id IS NULL OR NEW.department IS NULL OR NEW.address IS NULL OR NEW.resume IS NULL OR NEW.siteName IS NULL OR NEW.siteUrl IS NULL OR CHAR_LENGTH(NEW.company) > 50 OR CHAR_LENGTH(NEW.position) > 50 OR CHAR_LENGTH(NEW.job_id) > 30 OR CHAR_LENGTH(NEW.department) > 50 OR CHAR_LENGTH(NEW.address) > 500 OR CHAR_LENGTH(NEW.resume) > 500 OR CHAR_LENGTH(NEW.siteName) > 255 OR CHAR_LENGTH(NEW.siteUrl) > 255 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ValueERROR';
    END IF;
    IF CHAR_LENGTH(NEW.facebook) > 255 OR CHAR_LENGTH(NEW.twitter) > 255 OR CHAR_LENGTH(NEW.linkedin) > 255 OR CHAR_LENGTH(NEW.instagram) > 255 OR CHAR_LENGTH(NEW.skype) > 255 OR CHAR_LENGTH(NEW.github) > 255 OR CHAR_LENGTH(NEW.slack) > 255 OR CHAR_LENGTH(NEW.youtube) > 255 OR CHAR_LENGTH(NEW.behince) > 255 OR CHAR_LENGTH(NEW.whatsapp) > 255 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ValueERROR';
    END IF;
END //
DELIMITER ;


---------------------------------UPDATE---------------------------------
-- Trigger BEFORE UPDATE pour vérifier les champs first_name et last_name
DELIMITER //
CREATE TRIGGER check_fields_before_update BEFORE UPDATE ON card
FOR EACH ROW
BEGIN
    IF NEW.first_name IS NULL OR NEW.last_name IS NULL OR CHAR_LENGTH(NEW.first_name) > 30 OR CHAR_LENGTH(NEW.last_name) > 30 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ValueERROR';
    END IF;
    IF NEW.mobile IS NULL OR NEW.business_phone IS NULL OR CHAR_LENGTH(NEW.mobile) > 20 OR CHAR_LENGTH(NEW.business_phone) > 20 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ValueERROR';
    END IF;
    IF NEW.email IS NULL OR CHAR_LENGTH(NEW.email)>100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ValueERROR';
    END IF;
    IF NEW.company IS NULL OR NEW.position IS NULL OR NEW.job_id IS NULL OR NEW.department IS NULL OR NEW.address IS NULL OR NEW.resume IS NULL OR NEW.siteName IS NULL OR NEW.siteUrl IS NULL OR CHAR_LENGTH(NEW.company) > 50 OR CHAR_LENGTH(NEW.position) > 50 OR CHAR_LENGTH(NEW.job_id) > 30 OR CHAR_LENGTH(NEW.department) > 50 OR CHAR_LENGTH(NEW.address) > 500 OR CHAR_LENGTH(NEW.resume) > 500 OR CHAR_LENGTH(NEW.siteName) > 255 OR CHAR_LENGTH(NEW.siteUrl) > 255 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ValueERROR';
    END IF;
    IF CHAR_LENGTH(NEW.facebook) > 255 OR CHAR_LENGTH(NEW.twitter) > 255 OR CHAR_LENGTH(NEW.linkedin) > 255 OR CHAR_LENGTH(NEW.instagram) > 255 OR CHAR_LENGTH(NEW.skype) > 255 OR CHAR_LENGTH(NEW.github) > 255 OR CHAR_LENGTH(NEW.slack) > 255 OR CHAR_LENGTH(NEW.youtube) > 255 OR CHAR_LENGTH(NEW.behince) > 255 OR CHAR_LENGTH(NEW.whatsapp) > 255 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ValueERROR';
    END IF;
END //
DELIMITER ;