//server.js
const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 1238;


//Middlewares - function that executes when routes are being hit, ex "/" - can be useful for authentification

// app.use('/posts', () => {
// 	console.log("This is middleware running (see terminal)");
// })

//ROUTES
app.get('/', (req, res) => {
	res.send('We are on home');
})

app.get('/posts', (req, res) => {
	res.send('We are on posts');
})

// GET /api/hats
app.get('/api/boats', (req, res) => {
	console.log("GET api/hats");
	// res.send({ modellnamn: "Daygruiser"})
})

//How do we start listening to the server 
// app.listen(3000);
app.listen(port)



// db.boats.insertMany([
// 	{
// 	"modellnamn": "Passbåt",
// 	"tillverkningsår": 2020,
// 	"pris": 10,
// 	"segelbåt": "nej",
// 	"motor": "ja"
// 	},
// 	{
// 	 "modellnamn": "Snipan",
// 	"tillverkningsår": 2019,
// 	"pris": 5,
// 	"segelbåt": "nej",
// 	"motor": "ja"
// 	},
// 	{
// 	 "modellnamn": "Julle",
// 	"tillverkningsår": 2019,
// 	"pris": 9,
// 	"segelbåt": "nej",
// 	"motor": "ja"
// 	},
// 	{
// 	 "modellnamn": "Daygruiser",
// 	"tillverkningsår": 2018,
// 	"pris": 10,
// 	"segelbåt": "nej",
// 	"motor": "ja"
// 	},
// 	{
// 	 "modellnamn": "Motorkryssare",
// 	"tillverkningsår": 2019,
// 	"pris": 15,
// 	"segelbåt": "nej",
// 	"motor": "ja"
// 	},
// 	{
// 	 "modellnamn": "Kabinbåt",
// 	"tillverkningsår": 2020,
// 	"pris": 20,
// 	"segelbåt": "nej",
// 	"motor": "ja"
// 	},
// 	{
// 		"modellnamn": "Julle",
// 	   "tillverkningsår": 2019,
// 	   "pris": 5,
// 	   "segelbåt": "nej",
// 	   "motor": "ja"
// 	   },
// 	{
// 	"modellnamn": "Julle",
// 	"tillverkningsår": 2019,
// 	"pris": 5,
// 	"segelbåt": "ja",
// 	"motor": "nej"
// 	},
// 		{
// 			"modellnamn": "Eka",
// 		   "tillverkningsår": 2017,
// 		   "pris": 5,
// 		   "segelbåt": "ja",
// 		   "motor": "nej"
// 		   },
// 		   {
// 			"modellnamn": "Snipa",
// 		   "tillverkningsår": 2016,
// 		   "pris": 4,
// 		   "segelbåt": "ja",
// 		   "motor": "nej"
// 		   },
// 		   {
// 			"modellnamn": "Kanot",
// 		   "tillverkningsår": 2010,
// 		   "pris": 2,
// 		   "segelbåt": "ja",
// 		   "motor": "nej"
// 		   }
// 	])
	