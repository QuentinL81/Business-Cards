const sql = require("./db.js");


const Card = function() {}

Card.create = (newCard, result) => {

  const sqlQuery = "INSERT INTO card SET ?";
  newCard.id = null; // ajout pour le Duplicate

  // TODO fichiers non gérés
  newCard.file_link_download = "";
  newCard.file_link_loader = "";

  sql.query(sqlQuery, newCard, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newCard.id = res.insertId;
    result(null, newCard);
  });
};

Card.findById = (id, result) => {
  sql.query(`SELECT * FROM card WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      const cardData = res[0];

      cardData.file_link_background 

      console.log("found card: ", cardData);
      result(null, cardData);
      return;
    }

    // Card not found with the given id
    result({ kind: "not_found" }, null);
  });
};

Card.getAll = (result) => {
  // CONVERT = convert columns file > manipulate files as binary data in app
  let query = "SELECT *, CONVERT(file_link_profil USING utf8) AS file_link_profil, CONVERT(file_link_background USING utf8) AS file_link_background, CONVERT(file_link_download USING utf8) AS file_link_download, CONVERT(file_link_loader USING utf8) AS file_link_loader FROM card";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // Convert the file contents from bytes to buffers
    const cardsData = res.map(card => {
      card.file_link_profil = card.file_link_profil;
      card.file_link_background = card.file_link_background;
      card.file_link_download = card.file_link_download;
      card.file_link_loader = card.file_link_loader;
      return card;
    });

    console.log("cards: ", cardsData);
    result(null, cardsData);
  });
};

Card.updateById = (id, card, result) => {
  const { file_link_profil, file_link_background, file_link_download, file_link_loader, ...updatedCard } = card;

  const query = `
    UPDATE card SET 
      first_name = ?,
      last_name = ?,
      mobile = ?,
      business_phone = ?,
      email = ?,
      company = ?,
      position = ?,
      job_id = ?,
      department = ?,
      address = ?,
      resume = ?,
      
      color_primary = ?,
      color_secondary = ?,
      qr_code = ?,

      file_link_profil = ?,
      file_link_background = ?,
      file_link_download = ?,
      file_link_loader = ?,
      
      facebook = ?,
      twitter = ?,
      linkedin = ?,
      instagram = ?,
      skype = ?,
      github = ?,
      slack = ?,
      youtube = ?,
      behance = ?,
      whatsapp = ?
    WHERE id = ?`;

  const values = [
    updatedCard.first_name,
    updatedCard.last_name,
    updatedCard.mobile,
    updatedCard.business_phone,
    updatedCard.email,
    updatedCard.company,
    updatedCard.position,
    updatedCard.job_id,
    updatedCard.department,
    updatedCard.address,
    updatedCard.resume,

    updatedCard.color_primary,
    updatedCard.color_secondary,
    updatedCard.qr_code,

    file_link_profil_bytes,
    file_link_background_bytes,
    file_link_download_bytes,
    file_link_loader_bytes,

    updatedCard.facebook,
    updatedCard.twitter,
    updatedCard.linkedin,
    updatedCard.instagram,
    updatedCard.skype,
    updatedCard.github,
    updatedCard.slack,
    updatedCard.youtube,
    updatedCard.behance,
    updatedCard.whatsapp,
    id
  ];

  sql.query(query, values, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found card with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated card: ", { id: id, ...updatedCard });
    result(null, { id: id, ...updatedCard });
  });
};


const fs = require("fs");

Card.remove = (id, result) => {
  // Get card information before deleting
  sql.query(`SELECT * FROM card WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length === 0) {
      // Card not found
      result({ kind: "not_found" }, null);
      return;
    }

    const card = res[0];

    // Delete corresponding files
    deleteFile(card.file_link_profil);
    deleteFile(card.file_link_background);
    deleteFile(card.file_link_download);
    deleteFile(card.file_link_loader);

    // Delete the card from the database
    sql.query("DELETE FROM card WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // Card not found
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted card with id: ", id);
      result(null, res);
    });
  });
};


function deleteFile(filePath) {
  if (!filePath) return;
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("error deleting file: ", err);
    }
  });
}


Card.removeAll = result => {
  sql.query("SELECT file_link_profil, file_link_background, file_link_download, file_link_loader FROM card", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // Delete the associated files
    res.forEach(card => {
      deleteFile(card.file_link_profil);
      deleteFile(card.file_link_background);
      deleteFile(card.file_link_download);
      deleteFile(card.file_link_loader);
    });

    // Once the associated files are deleted, delete all cards from the database
    sql.query("DELETE FROM card", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} card(s)`);
      result(null, res);
    });
  });
};


module.exports = Card;