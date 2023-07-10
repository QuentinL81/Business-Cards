const Card = require("../models/card.model.js");
const {ToCardsApi, ToCardApi, ToCardModel} = require("../mappers/card.mapper");

// Create and Save a new Card
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Card
  const card = ToCardModel(req.body);

  // Save Card in the database
  Card.create(card, (err, data) => {

    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Card."
      });
    else res.send(data);
  });
};

// Retrieve all Cards from the database (with condition).
exports.findAll = (req, res) => {

  Card.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cards."
      });
    else res.send(ToCardsApi(data));
  });
};

// Find a single Card by Id
exports.findOne = (req, res) => {
  Card.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Card with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Card with id " + req.params.id
        });
      }
    } else res.send(ToCardApi(data));
  });
};

// Update a Card identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Card.updateById(
    req.params.id,
    ToCardModel(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Card with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Card with id " + req.params.id
          });
        }
      } else res.send(ToCardApi(data));
    }
  );
};

// Delete a Card with the specified id in the request
exports.delete = (req, res) => {
  Card.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Card with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Card with id " + req.params.id
        });
      }
    } else res.send({ message: `Card was deleted successfully!` });
  });
};
