/* Import express framework */
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const database = require("mime-db");
const path = require("path");

require("dotenv").config();

app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);
app.use(express.static(`${__dirname}/public/`));
app.use("/public", express.static(path.resolve(__dirname + "/public/")));

/* Used for sending the Json Data to Node API   */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mysqlConnection = require("./db/connection.js");
module.exports = mysqlConnection;

/* Import routes for showing degree name */
const homepage = require("./homepage/homepage-routes");
/* Import routes for showing degree structure */
const degreeStructure = require("./degree-structure/degree-structure-routes");
/* Import routes for searching functionality */
const courseSearching = require("./search/search-course-route");
/* Import routes for course relationship */
const courseRelationship = require("./course-relationship/course-relationship-route");
/* Import routes for form control */
const formControl = require("./form/form-router");

/* Set up parent routes for degree structure */
app.use("/", homepage);
app.use("/degree-structure", degreeStructure);
app.use("/search", courseSearching);
app.use("/course-relationships", courseRelationship);
app.use("/form", formControl);

app.use("*", (req, res) => {
  res.render("../views/error.ejs");
});
/* Set up server */
app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
