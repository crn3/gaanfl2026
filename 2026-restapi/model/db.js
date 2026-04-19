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

//get all games
exports.getGames = function (req, res) {
  connection.query(
    `SELECT * FROM fixtures`, 
    function (err, rows, fields) {
    if (err) throw err;

    res.status(200);
    res.send(JSON.stringify(rows));
  });
};

//update games
exports.updateGame = function (req, res) {

  let id = req.params.id;
  const {
    hteam,
    hteamscore,
    ateamscore,
    ateam
  } = req.body;

  function calcScores(score){
    const parts = score.split('-');

    const goals = parseInt(parts[0]) || 0;
    const twoPoints = parseInt(parts[1]) || 0;
    const onePoint = parseInt(parts[2]) || 0;

    const total = (goals*3) + (twoPoints*2)+ onePoint;

    return {
      goals,
      twoPoints,
      onePoint,
      total
    }
  }

  const home = calcScores(hteamscore);
  const away = calcScores(ateamscore);

  connection.query(
    `UPDATE fixtures SET
    hteam = ?,
    hteamscore = ?,
    ateamscore = ?,
    ateam = ?,
    hgls = ?,
    h2pts = ?,
    h1pts = ?,
    hteamtotal = ?,
    agls = ?,
    a2pts = ?,
    a1pts = ?,
    ateamtotal = ?
    WHERE id = ?`,
    
    [
      hteam,
    hteamscore,
    ateamscore,
    ateam,
    home.goals,
    home.twoPoints,
    home.onePoint,
    home.total,
    away.goals,
    away.twoPoints,
    away.onePoint,
    away.total,
    id
    ],
    function (err, result) {
      if(err) {
          console.error(err);
          return res.status(500).send("Error updating games");
        }
        res.send({
          message: "Scores updated",
          affectedRows: result.affectedRows
        });
    });
};

// update team powerrank
exports.updatePowerRank = function(req, res) {
  
  let id = req.params.id;
  console.log("IN RESTAPI HEHE" + id);
  console.log("REQ BODY: " + (req.body));
  const {
    powerrank
  } = req.body;

  connection.query(
    `UPDATE teams SET powerrank = ? WHERE id = ?`,
    [powerrank, id],
    function(err, result){
      if(err) {
          console.error(err);
          return res.status(500).send("Error updating powerrank");
        }
        res.send({
          message: "Power rank updated",
          affectedRows: result.affectedRows
        });
    }
  );
};

// get user login details
exports.getUsers = function(req,res){
  connection.query(`SELECT * FROM users`, function(err, rows, fields){
    if (err) throw err;
    res.status(200);
    res.send(JSON.stringify(rows));
  })
}