module.exports = (app, upload) => {
  const cards = require("../controllers/card.controller.js");

  var router = require("express").Router();

  //router.use(upload.single('file_link_background'))

  router.use(upload.fields([
    { name: 'file_link_background' },
    { name: 'file_link_profile' },
  ]));
  
  // Create a new Card
  router.post("/", cards.create);

  // Retrieve all Cards
  router.get("/", cards.findAll);

  // Retrieve a single Card with id
  router.get("/:id", cards.findOne);

  // Update a Card with id
  router.put("/:id", cards.update);

  app.use('/api/cards', router);
};
