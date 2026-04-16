var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var model = require("./model/db.js");

var app = express();
app.use(cors());

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get teams
app.route("/teams").get(function (req, res) {
  model.getTeams(req, res);
});

// get players
app.route("/players").get(function (req, res) {
  model.getPlayers(req, res);
});

// get managers
app.route("/managers").get(function (req, res) {
  model.getManagers(req, res);
});

// get fixtures
app.route("/fixtures").get(function (req, res) {
  model.getFixtures(req, res);
});

// get results
app.route("/results").get(function (req, res) {
  model.getResults(req, res);
});

// update team powerrank
app.route("/teams/powerrank/:id").post(function (req, res) {
  model.updatePowerRank(req, res);
});

var server = app.listen(3000, function () {
  console.log("Server listening on port 3000");
});

