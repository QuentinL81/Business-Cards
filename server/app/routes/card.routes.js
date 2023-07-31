module.exports = (app, upload) => {
  const cards = require("../controllers/card.controller.js");

  var router = require("express").Router();

  router.use(upload.fields([
    { name: 'file_link_background' },
    { name: 'file_link_profile' },
  ]));
  
  // Create a new Card
  router.post("/", cards.create);

  // Duplicate a Card
  router.post("/duplicate", cards.duplicate);

  // Retrieve all Cards
  router.get("/", cards.findAll);

  // Retrieve a single Card with id
  router.get("/:id", cards.findOne);

  // Update a Card with id
  router.put("/:id", cards.update);

  // Delete a Card with id
  router.delete("/:id", cards.delete);

  app.use('/api/cards', router);
};
