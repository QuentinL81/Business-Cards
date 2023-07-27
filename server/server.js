const express = require("express");
//const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const path = require('path');

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

//Access to the images
app.use('/', express.static(path.join(__dirname, '/uploads')));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to business card application." });
});

require("./app/routes/card.routes.js")(app, upload);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
