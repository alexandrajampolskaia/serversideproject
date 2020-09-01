const { MongoClient, ObjectID } = require('mongodb');

const dbName = 'boats';
const collectionName = 'boats';
const url = 'mongodb://localhost:27017';

console.log("About to connect...");

// try {
// 	await runQuery(find....)
// } catch(error) {}
// await runQuery(insert...)

// function runQuery(database, collection, queryFunction) {
// 	return new Promise((resolve, reject) => {
// 		const url = 'mongodb://localhost:27017';
// 		MongoClient.connect(url, { useUnifiedTopology: true}, 
// 			(error, client) => {
// 				if(error) {
// 					reject(error);
// 					return; 
// 				}

// 				queryFunction();
// 				client.close()
// 			})
// 	})
// }

// function queryFunction(onSuccess, onFailure) {}


MongoClient.connect(url, { useUnifiedTopology: true}, (error, client) => {
	if (error) {
		console.log("Something went wrong", error);
		return;
	} 
		console.log("Connected!");

		const db = client.db(dbName);
		const col = db.collection(collectionName);

		//Kommentera fram om vill lägga till båtar
		// insertBoats(col, () => { 
			findBoats(col, () => client.close())
		// });
		// updateBoat(col, client);
		deleteBoat(col, client);
	})

	function findBoats(col, callback) {
		col.find({}).toArray((error, docs) => {
			try {
				if(error){
					console.log("Bad find query", error.message)
					return;
				}
				console.log("Found documents: ")
				docs.forEach(doc => {
					console.log("* " + doc.modellnamn + " " + doc.pris)
				})
			} finally {
					callback()
				}
		})
	}

	function insertBoats(col, callback) {
		col.insertMany(
			[	{"modellnamn": "Passbåt", "tillverkningsår": 2020, "pris": 10, "segelbåt": "nej", "motor": "ja"},
				{"modellnamn": "Snipan", "tillverkningsår": 2019, "pris": 5, "segelbåt": "nej", "motor": "ja"}
			],
			(error, result) => {
				try {
					if(error) {
						console.log("Bad query!", error.message);
						return;
				}
				console.log("added successfully!");
				console.log(result);
				} finally {s
					// client.close();
					callback();
				}
			}
		)
	}
		
	function updateBoat(col, client) {
		// const filter = { modellnamn: "Eka"};
		// const update = { $set: { modellnamn: "Ekaa"}}
		const filter2 = { _id: new ObjectID("5f4e2ef16cba6e6e83269e8d")};
		const update2 = { $inc: { pris: 5 }};
		col.updateOne(
			// filter, update, 
			filter2, update2, (error, result) => {
			if(error) {
				console.log("Could not update boat", error.message);
			} else {
				console.log("Boat updated!", result.result);
			}
			client.close();
		})
	}

	function deleteBoat(col, client) {
		const filter = { _id: new ObjectID("5f4e2e536cba6e6e83269e87")}
		col.deleteOne(filter, (error, result) => {
			if(error) {
				console.log("Could not delete boat", error.message);
			} else {
				console.log("Boat deleted!", result.result);
			}
			client.close();
		})
	}