const { MongoClient, ObjectID } = require("mongodb");
const url =
  "mongodb+srv://alex:jamp@cluster0.tbdjh.mongodb.net/<dbname>?retryWrites=true&w=majority";

const dbName = "boats";
const collectionName = "boats";

function getAllBoats(callback) {
  get({}, callback);
}

function getBoat(id, callback) {
  get({ _id: new ObjectID(id) }, callback);
}

function get(filter, callback) {
  MongoClient.connect(
    url,
    { useUnifiedTopology: true },
    async (error, client) => {
      if (error) {
		callback("Connection ERROR!");
		console.log(error)
        return;
      }
      const col = client.db(dbName).collection(collectionName);
      try {
        const cursor = await col.find(filter);
        const array = await cursor.toArray();
        callback(array);
      } catch (error) {
        callback("Query ERROR");
      } finally {
        client.close();
      }
    }
  );
}

function addBoat(requestBody, callback) {
  console.log("inside AddBoat ");
  const doc = requestBody;
  MongoClient.connect(
    url,
    { useUnifiedTopology: true },
    async (error, client) => {
      if (error) {
        callback("Connection ERROR!");
        return;
      }
      const col = client.db(dbName).collection(collectionName);
      try {
        const result = await col.insertOne(doc);
        callback({
          result: result.result,
          ops: result.ops,
        });
      } catch (error) {
        callback("Query ERROR");
        console.log(error.response);
      } finally {
        client.close();
      }
    }
  );
}

function deleteBoat(id, callback) {
  MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
      callback("Connection ERROR!");
      return;
    }
    const col = client.db(dbName).collection(collectionName);
    // const filter = { id }
    col.deleteOne({ _id: new ObjectID(id) }, (error, docs) => {
      if (error) {
        callback("Query ERROR");
      } else {
        callback(docs);
      }
      client.close();
    });
  });
}


function search(query, callback) {
	const filter = {};
	if( query.modellnamn ) {
		filter.modellnamn = { $regex : `.*${query.modellnamn}.*`, $options: 'i' }}
	

	if(query.pris){
		filter.pris =  query.pris;
	}	
	// Segelbåt
	if( query.segelbåt ) {
	filter.segelbåt = query.segelbåt;
	}

	//Motor
	if( query.motor ) {
		filter.motor = query.motor;
		}



	MongoClient.connect(
		url,
		{ useUnifiedTopology: true },
		async (error, client) => {
			if( error ) {
				callback('"ERROR!! Could not connect"');
				return;  // exit the callback function
			}
			const col = client.db(dbName).collection(collectionName);
			try {
				const cursor = await col.find(filter);
				const array = await cursor.toArray()
				callback(array);

			} catch(error) {
				console.log('Query error: ' + error.message);
				callback('"ERROR!! Query error"');

			} finally {
				client.close();
			}
		}
	)
}

function getMany(filter, callback) {

    MongoClient.connect( url, { useUnifiedTopology : true }, async (error, client)=>{ 
        if(error){
            callback('cant connect to database', error.message)
            console.log(error)
            return;
        }
        const col = client.db(dbName).collection(collectionName); 
        try{
            const cursor = col.aggregate(filter);
            const array = await cursor.toArray();
            callback(array);

        } catch(error){
            console.log('Wrong query, error: ', error.message);
            callback('Wrong query'); 

        } finally{
            client.close();
        }
    })
} 

function getOnlyFive(sort, callback) {
  let filter;
  switch (sort) {
    case 'lowprice':
		filter = [ {$sort: {pris : 1}}, {$limit : 5 }];
		// filter = [ {$sort: {pris : 1}}, {$collation: {locale:"en_US", numericOrdering:true}}, {$limit : 5 }];
		//$collation is not allowed in this atlas tier
		break;
	case 'highprice':
		filter = [ {$sort: {pris : -1} },{ $limit: 5 } ];
		break;
	case 'maxPrice':
		filter = [ {$sort: {pris : 1} }, {$match: {pris : {$lt : 101}} },{ $limit: 5 } ];
		break;
	case 'minPrice':
		filter = [ {$sort: {pris : -1} }, {$match: {pris : {$gt : 99}} }, { $limit: 5 } ];
		break;
	case 'oldest':
		filter = [ {$sort: {tillverkningsår : 1} },{ $limit: 5 } ];
		break;
	case 'newest':
		filter = [ {$sort: {tillverkningsår : -1} },{ $limit: 5 } ];
		break;
	case 'madebefore':
		filter = [ {$sort: {tillverkningsår : 1} }, {$match: {tillverkningsår : {$lt : 2001}} },{ $limit: 5 } ];
		break;
	case 'madeafter':
		filter = [ {$sort: {tillverkningsår : -1} }, {$match: {tillverkningsår : {$gt : 1999}} },{ $limit: 5 } ];
		break;
	case 'name_asc':
		filter = [ {$sort: {modellnamn : 1} },{ $limit: 5 } ];
		break;
	case 'name_desc':
		filter = [ {$sort: {modellnamn : -1} },{ $limit: 5 } ];
		break;




		
  }
  getMany(filter, callback);
}


module.exports = {
  getAllBoats,
  getBoat,
  addBoat,
  deleteBoat,
  search,
  getOnlyFive
};
