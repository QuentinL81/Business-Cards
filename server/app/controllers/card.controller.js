const Card = require("../models/card.model.js");
const { ToCardsApi, ToCardApi, ToCardModel } = require("../mappers/card.mapper");
const { body, validationResult } = require("express-validator");
const fs  = require("fs");

// Escape special characters
function escapeSpecialCharacters(str) {
  // Exclude email field from escaping special characters
  if (str === "email") {
    return str;
  }// Exclude URL fields from escaping special characters
  if (str.includes("http://") || str.includes("https://")) {
    return str;
  }
  const { escape } = require("validator");
  return escape(str,["@", ".", "-", "_"]);
}

// Create and Save a new Card
exports.create = [
  // Required fields and constraints validation
  body("firstName").trim().isLength({ max: 30 }).notEmpty(),
  body("lastName").trim().isLength({ max: 30 }).notEmpty(),
  body("mobile").trim().isLength({ max: 20 }).notEmpty(),
  body("businessPhone").trim().isLength({ max: 20 }).notEmpty(),
  body("email").trim().isLength({ max: 100 }).notEmpty().isEmail(),
  body("compagny").trim().isLength({ max: 50 }).notEmpty(),
  body("position").trim().isLength({ max: 50 }).notEmpty(),
  body("jobId").trim().isLength({ max: 30 }).notEmpty(),
  body("department").trim().isLength({ max: 50 }).notEmpty(),
  body("address").trim().isLength({ max: 500 }).notEmpty(),
  body("resume").trim().isLength({ max: 500 }).notEmpty(),
  body("siteName").trim().isLength({ max: 255 }).notEmpty(),
  body("siteUrl").trim().isLength({ max: 255 }).notEmpty().isURL(),
  // Social networks, optional fields
  body("facebook").trim().isLength({ max: 255 }).optional().isURL(),
  body("twitter").trim().isLength({ max: 255 }).optional().isURL(),
  body("linkedin").trim().isLength({ max: 255 }).optional().isURL(),
  body("instagram").trim().isLength({ max: 255 }).optional().isURL(),
  body("skype").trim().isLength({ max: 255 }).optional(),
  body("github").trim().isLength({ max: 255 }).optional().isURL(),
  body("slack").trim().isLength({ max: 255 }).optional(),
  body("youtube").trim().isLength({ max: 255 }).optional().isURL(),
  body("behance").trim().isLength({ max: 255 }).optional().isURL(),
  body("whatsapp").trim().isLength({ max: 255 }).optional().isURL(),

  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },

  // Card creation
  (req, res) => {
    const card = ToCardModel(req.body);

    // Escape special characters
    for (const prop in card) {
      if (typeof card[prop] === "string") {
        card[prop] = escapeSpecialCharacters(card[prop]);
      }
    }

    // Save files as bytes
    card.file_link_profil = saveFileAsBytes(req.file_link_profil);
    card.file_link_background = saveFileAsBytes(req.file_link_background);
    card.file_link_download = saveFileAsBytes(req.file_link_download);
    card.file_link_loader = saveFileAsBytes(req.file_link_loader);

    // Save Card in the database
    Card.create(card, (err, data) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          // Handle duplicate entry error
          return res.status(400).json({ error: "Duplicate entry" });
        } else {
          // Handle other database errors
          return res.status(500).json({ error: "Database error" });
        }
      } else {
        res.send(data);
      }
    });
  },
];

// Retrieve all Cards from the database (with condition).
exports.findAll = (req, res) => {
  Card.getAll((err, data) => {
    if (err) {
      // Handle database error
      return res.status(500).json({ error: "Database error" });
    } else {
      res.send(ToCardsApi(data));
    }
  });
};

// Find a single Card by Id
exports.findOne = (req, res) => {
  Card.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Card with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Card with id " + req.params.id,
        });
      }
    } else {
      res.send(ToCardApi(data));
    }
  });
};

// Update a Card identified by the id in the request
exports.update = [
  // Required fields and constraints validation
  body("firstName").trim().isLength({ max: 30 }).notEmpty(),
  body("lastName").trim().isLength({ max: 30 }).notEmpty(),
  body("mobile").trim().isLength({ max: 20 }).notEmpty(),
  body("businessPhone").trim().isLength({ max: 20 }).notEmpty(),
  body("email").trim().isLength({ max: 100 }).notEmpty().isEmail(),
  body("compagny").trim().isLength({ max: 50 }).notEmpty(),
  body("position").trim().isLength({ max: 50 }).notEmpty(),
  body("jobId").trim().isLength({ max: 30 }).notEmpty(),
  body("department").trim().isLength({ max: 50 }).notEmpty(),
  body("address").trim().isLength({ max: 500 }).notEmpty(),
  body("resume").trim().isLength({ max: 500 }).notEmpty(),
  // URL
  body("siteName").trim().isLength({ max: 255 }).notEmpty(),
  body("siteUrl").trim().isLength({ max: 255 }).notEmpty().isURL(),
  // Social Networks, optional fields
  body("facebook").trim().isLength({ max: 255 }).optional().isURL(),
  body("twitter").trim().isLength({ max: 255 }).optional().isURL(),
  body("linkedin").trim().isLength({ max: 255 }).optional().isURL(),
  body("instagram").trim().isLength({ max: 255 }).optional().isURL(),
  body("skype").trim().isLength({ max: 255 }).optional(),
  body("github").trim().isLength({ max: 255 }).optional().isURL(),
  body("slack").trim().isLength({ max: 255 }).optional(),
  body("youtube").trim().isLength({ max: 255 }).optional().isURL(),
  body("behance").trim().isLength({ max: 255 }).optional().isURL(),
  body("whatsapp").trim().isLength({ max: 255 }).optional().isURL(),  

  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },

  // Update map
  (req, res) => {
    // Escape special characters
    for (const prop in card) {
      if (typeof card[prop] === "string") {
        card[prop] = escapeSpecialCharacters(card[prop]);
      }
    }
    // Save files as bytes
    if (req.file_link_profil) {
      card.file_link_profil = saveFileAsBytes(req.file_link_profil);
    }
    if (req.file_link_background) {
      card.file_link_background = saveFileAsBytes(req.file_link_background);
    }
    if (req.file_link_download) {
      card.file_link_download = saveFileAsBytes(req.file_link_download);
    }
    if (req.file_link_loader) {
      card.file_link_loader = saveFileAsBytes(req.file_link_loader);
    }

    // Update Card in the database
    Card.updateById(req.params.id, ToCardModel(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          // Handle not found error
          return res.status(404).json({ error: "Card not found" });
        } else {
          // Handle other database errors
          return res.status(500).json({ error: "Database error" });
        }
      } else {
        res.send(ToCardApi(data));
      }
    });
  },
];

// Delete a Card with the specified id in the request
exports.delete = (req, res) => {
  Card.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        // Handle not found error
        return res.status(404).json({ error: "Card not found" });
      } else {
        // Handle other database errors
        return res.status(500).json({ error: "Database error" });
      }
    } else {
      res.send({ message: "Card was deleted successfully!" });
    }
  });
};
