"use strict";

var _require = require("mongodb"),
    MongoClient = _require.MongoClient,
    ObjectID = _require.ObjectID;

var url = "mongodb+srv://alex:jamp@cluster0.tbdjh.mongodb.net/<dbname>?retryWrites=true&w=majority";
var dbName = "boats";
var collectionName = "boats";

function getAllBoats(callback) {
  get({}, callback);
}

function getBoat(id, callback) {
  get({
    _id: new ObjectID(id)
  }, callback);
}

function get(filter, callback) {
  MongoClient.connect(url, {
    useUnifiedTopology: true
  }, function _callee(error, client) {
    var col, cursor, array;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!error) {
              _context.next = 4;
              break;
            }

            callback("Connection ERROR!");
            console.log(error);
            return _context.abrupt("return");

          case 4:
            col = client.db(dbName).collection(collectionName);
            _context.prev = 5;
            _context.next = 8;
            return regeneratorRuntime.awrap(col.find(filter));

          case 8:
            cursor = _context.sent;
            _context.next = 11;
            return regeneratorRuntime.awrap(cursor.toArray());

          case 11:
            array = _context.sent;
            callback(array);
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](5);
            callback("Query ERROR");

          case 18:
            _context.prev = 18;
            client.close();
            return _context.finish(18);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[5, 15, 18, 21]]);
  });
}

function addBoat(requestBody, callback) {
  console.log("inside AddBoat ");
  var doc = requestBody;
  MongoClient.connect(url, {
    useUnifiedTopology: true
  }, function _callee2(error, client) {
    var col, result;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!error) {
              _context2.next = 3;
              break;
            }

            callback("Connection ERROR!");
            return _context2.abrupt("return");

          case 3:
            col = client.db(dbName).collection(collectionName);
            _context2.prev = 4;
            _context2.next = 7;
            return regeneratorRuntime.awrap(col.insertOne(doc));

          case 7:
            result = _context2.sent;
            callback({
              result: result.result,
              ops: result.ops
            });
            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](4);
            callback("Query ERROR");
            console.log(_context2.t0.response);

          case 15:
            _context2.prev = 15;
            client.close();
            return _context2.finish(15);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[4, 11, 15, 18]]);
  });
}

function deleteBoat(id, callback) {
  MongoClient.connect(url, {
    useUnifiedTopology: true
  }, function (error, client) {
    if (error) {
      callback("Connection ERROR!");
      return;
    }

    var col = client.db(dbName).collection(collectionName); // const filter = { id }

    col.deleteOne({
      _id: new ObjectID(id)
    }, function (error, docs) {
      if (error) {
        callback("Query ERROR");
      } else {
        callback(docs);
      }

      client.close();
    });
  });
} // function searchBoat(filter, callback) {
//   MongoClient.connect(
//     url,
//     { useUnifiedTopology: true },
//     async (error, client) => {
//       if (error) {
//         callback("Connection ERROR!");
//         return;
//       }
//       const col = client.db(dbName).collection(collectionName);
//       try {
//         const cursor = await col.find(filter);
//         const array = await cursor.toArray();
//         callback(array);
//       } catch (error) {
// 		callback("Query ERROR");
// 		console.log(error.response)
//       } finally {
//         client.close();
//       }
//     }
//   );
// }


function search(query, callback) {
  var filter = {};

  if (query.modellnamn) {
    filter.modellnamn = {
      $regex: ".*".concat(query.modellnamn, ".*"),
      $options: 'i'
    };
  } // if(query.pris){
  // 	filter.pris =  { $regex : `.*${query.modellnamn}.*`, $options: 'i' }, { $limit: 2 };
  // }


  if (query.tillverkningsår) {
    filter.tillverkningsår = {
      "$gt": 1950
    };
  } // if(query.tillverkningsår){
  // 	filter.tillverkningsår = query.tillverkningsår;
  // }


  if (query.pris) {
    filter.pris = query.pris;
  } // filter = [ {$match: {pris : {$gt : `.*${query.pris}.*`}} },{ $limit: 5 } ];
  // break;
  // Segelbåt


  if (query.segelbåt) {
    filter.segelbåt = query.segelbåt;
  } //Motor


  if (query.motor) {
    filter.motor = query.motor;
  }

  MongoClient.connect(url, {
    useUnifiedTopology: true
  }, function _callee3(error, client) {
    var col, cursor, array;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!error) {
              _context3.next = 3;
              break;
            }

            callback('"ERROR!! Could not connect"');
            return _context3.abrupt("return");

          case 3:
            col = client.db(dbName).collection(collectionName);
            _context3.prev = 4;
            _context3.next = 7;
            return regeneratorRuntime.awrap(col.find(filter));

          case 7:
            cursor = _context3.sent;
            _context3.next = 10;
            return regeneratorRuntime.awrap(cursor.toArray());

          case 10:
            array = _context3.sent;
            callback(array);
            _context3.next = 18;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](4);
            console.log('Query error: ' + _context3.t0.message);
            callback('"ERROR!! Query error"');

          case 18:
            _context3.prev = 18;
            client.close();
            return _context3.finish(18);

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[4, 14, 18, 21]]);
  } // connect callback - async
  ); //connect - async
}

function getGroup(filter, callback) {
  // filter = [ {$sort: {pris : 1} },{ $limit: 5 } ];
  MongoClient.connect(url, {
    useUnifiedTopology: true
  }, function _callee4(error, client) {
    var col, cursor, array;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!error) {
              _context4.next = 4;
              break;
            }

            callback('cant connect to database', error.message);
            console.log(error);
            return _context4.abrupt("return");

          case 4:
            col = client.db(dbName).collection(collectionName);
            _context4.prev = 5;
            cursor = col.aggregate(filter);
            _context4.next = 9;
            return regeneratorRuntime.awrap(cursor.toArray());

          case 9:
            array = _context4.sent;
            callback(array);
            _context4.next = 17;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](5);
            console.log('Wrong query, error: ', _context4.t0.message);
            callback('Wrong query');

          case 17:
            _context4.prev = 17;
            client.close();
            return _context4.finish(17);

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[5, 13, 17, 20]]);
  });
}

function getOnlyFive(sort, callback) {
  var filter;

  switch (sort) {
    case 'lowprice':
      filter = [{
        $sort: {
          pris: 1
        }
      }, {
        $limit: 5
      }]; // filter = [ {$sort: {pris : 1}}, {$collation: {locale:"en_US", numericOrdering:true}}, {$limit : 5 }];

      break;

    case 'highprice':
      filter = [{
        $sort: {
          pris: -1
        }
      }, {
        $limit: 5
      }];
      break;

    case 'oldest':
      filter = [{
        $sort: {
          tillverkningsår: 1
        }
      }, {
        $limit: 5
      }];
      break;

    case 'newest':
      filter = [{
        $sort: {
          tillverkningsår: -1
        }
      }, {
        $limit: 5
      }];
      break;

    case 'name_asc':
      filter = [{
        $sort: {
          modellnamn: 1
        }
      }, {
        $limit: 5
      }];
      break;

    case 'name_desc':
      filter = [{
        $sort: {
          modellnamn: -1
        }
      }, {
        $limit: 5
      }];
      break;

    case 'modellnamn':
      filter = [{
        $limit: 3
      }];
      break;
    // case 'maxPrice':
    // 	filter = [ {$match: {pris : {$gt : 150}} },{ $limit: 5 } ];
    // 	break;
  }

  getGroup(filter, callback);
}

module.exports = {
  getAllBoats: getAllBoats,
  getBoat: getBoat,
  addBoat: addBoat,
  deleteBoat: deleteBoat,
  search: search,
  getOnlyFive: getOnlyFive
};