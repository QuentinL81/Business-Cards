const sql = require("./db.js");


const Card = function() {

}

Card.create = (newCard, result) => {
  sql.query("INSERT INTO card SET ?", newCard, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created card: ", { id: res.insertId, ...newCard });
    result(null, { id: res.insertId, ...newCard });
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
      console.log("found card: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found card with the id
    result({ kind: "not_found" }, null);
  });
};

Card.getAll = (result) => {
  let query = "SELECT * FROM card";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("card: ", res);
    result(null, res);
  });
};

Card.updateById = (id, card, result) => {
  sql.query(
    "UPDATE card SET " +
      "first_name = ?,  last_name = ?,  mobile = ?,  business_phone = ?," +
      "email = ?,  company = ?,  position = ?,  job_id = ?," +
      "department = ?,  address = ?,  resume = ?," +
      "color_primary = ?,  color_secondary = ?," +
      "file_link_profil = ?,  file_link_background = ?,  file_link_download = ?,  file_link_loader = ?," +
      "facebook = ?,  twitter = ?,  linkedin = ?,  instagram = ?," +
      "skype = ?,  github = ?,  slack = ?,  github = ?,  youtube = ?" +
      " WHERE id = ?",
    [card.first_name, card.last_name, card.mobile, card.business_phone,
      card.email, card.company, card.position, card.job_id,
      card.department, card.address, card.resume,
      card.color_primary, card.color_secondary,
      card.file_link_profil, card.file_link_background, card.file_link_download, card.file_link_loader,
      card.facebook, card.twitter, card.linkedin, card.instagram,
      card.skype, card.github, card.slack, card.github, card.youtube, id],
    (err, res) => {
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

      console.log("updated card: ", { id: id, ...card });
      result(null, { id: id, ...card });
    }
  );
};

Card.remove = (id, result) => {
  sql.query("DELETE FROM card WHERE id = ?", id, (err, res) => {
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

    console.log("deleted card with id: ", id);
    result(null, res);
  });
};

Card.removeAll = result => {
  sql.query("DELETE FROM card", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} card`);
    result(null, res);
  });
};

module.exports = Card;
