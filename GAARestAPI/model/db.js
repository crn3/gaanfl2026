var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gaanfl2026",
  timezone: "utc+0",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log(`Successfully connected to gaanfl2026`);
});

// get teams
exports.getTeams = function (req, res) {
  connection.query(`SELECT * FROM teams`, function (err, rows, fields) {
    if (err) throw err;

    res.status(200);
    res.send(JSON.stringify(rows));
  });
};

// get players
exports.getPlayers = function (req, res) {
  connection.query(`SELECT * FROM players`, function (err, rows, fields) {
    if (err) throw err;

    res.status(200);
    res.send(JSON.stringify(rows));
  });
};

//get managers
exports.getManagers = function (req, res) {
  connection.query(`SELECT * FROM managers`, function (err, rows, fields) {
    if (err) throw err;

    res.status(200);
    res.send(JSON.stringify(rows));
  });
};

//get fixtures
exports.getFixtures = function (req, res) {
  connection.query(
    `SELECT * FROM fixtures
    WHERE hteamtotal = 0 AND ateamtotal = 0`, 
    function (err, rows, fields) {
    if (err) throw err;

    res.status(200);
    res.send(JSON.stringify(rows));
  });
};

//get results
exports.getResults = function (req, res) {
  connection.query(
    `SELECT * FROM fixtures
    WHERE hteamtotal > 0 OR ateamtotal > 0`, 
    function (err, rows, fields) {
    if (err) throw err;

    res.status(200);
    res.send(JSON.stringify(rows));
  });
};