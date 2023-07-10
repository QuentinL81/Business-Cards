CREATE TABLE IF NOT EXISTS card (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    business_phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    job_id VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    resume VARCHAR(500) NOT NULL,

    color_primary VARCHAR(7) NOT NULL,
    color_secondary VARCHAR(7) NOT NULL,

    site_name VARCHAR (255),
    site_url VARCHAR(255),

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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;;