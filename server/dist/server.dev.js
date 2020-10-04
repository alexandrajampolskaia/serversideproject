"use strict";

//server.js
var express = require('express');

var app = express();
var port = process.env.PORT || 1238;

var bodyParser = require('body-parser');

var _require = require('./database.js'),
    getAllBoats = _require.getAllBoats,
    getBoat = _require.getBoat,
    addBoat = _require.addBoat,
    deleteBoat = _require.deleteBoat,
    search = _require.search,
    getOnlyFive = _require.getOnlyFive; //MIDDLEWARE


app.use(express["static"](__dirname + '/./frontend'));
app.use(function (req, res, next) {
  console.log("".concat(req.method, " ").concat(req.url));
  next();
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); // ROUTES
// GET /api/boats

app.get('/api/boats', function (req, res) {
  getAllBoats(function (dataOrError) {
    res.send(dataOrError);
  });
}); // GET /api/boat?id=x

app.get('/api/boat', function (req, res) {
  getBoat(req.query.id, function (dataOrError) {
    res.send(dataOrError);
  });
}); // POST 

app.post('/api/boat', function (req, res) {
  console.log("inside post server");
  addBoat(req.body, function (dataOrError) {
    res.send(dataOrError);
  });
}); // DELETE /api/boat?id=x

app["delete"]('/api/boat', function (req, res) {
  deleteBoat(req.query.id, function (dataOrError) {
    res.send(dataOrError);
  });
}); //Update 

app.put('/api/update', function (req, res) {
  updateBoat(req.body, req.params.id, function () {
    res.send(req.body);
  });
}); // Search 

app.get('/api/search', function (req, res) {
  search(req.query, function (dataOrError) {
    res.send(dataOrError);
  });
});
app.get('/api/search/lowprice', function (req, res) {
  getOnlyFive("lowprice", function (dataOrError) {
    res.send(dataOrError);
  });
});
app.get('/api/search/highprice', function (req, res) {
  getOnlyFive("highprice", function (dataOrError) {
    res.send(dataOrError);
  });
});
app.get('/api/search/oldest', function (req, res) {
  getOnlyFive("oldest", function (dataOrError) {
    res.send(dataOrError);
  });
});
app.get('/api/search/newest', function (req, res) {
  getOnlyFive("newest", function (dataOrError) {
    res.send(dataOrError);
  });
});
app.get('/api/search/name_asc', function (req, res) {
  getOnlyFive("name_asc", function (dataOrError) {
    res.send(dataOrError);
  });
});
app.get('/api/search/name_desc', function (req, res) {
  getOnlyFive("name_desc", function (dataOrError) {
    res.send(dataOrError);
  });
});
app.get('/api/search/maxPrice', function (req, res) {
  getOnlyFive("maxPrice", function (dataOrError) {
    res.send(dataOrError);
  });
}); //Start listening to the server 

app.listen(port, console.log("Running port", "".concat(port)));