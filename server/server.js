//server.js
const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 1337;
const bodyParser = require('body-parser');
const { getAllBoats, getBoat, addBoat, deleteBoat, search, getOnlyFive } = require('./database.js');

//MIDDLEWARE
app.use(express.static(__dirname, '../build'));

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next()
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());


// ROUTES
// GET /api/boats
app.get('/api/boats', (req, res) => {
	getAllBoats(dataOrError => {
		res.send(dataOrError);
	});
})

// GET /api/boat?id=x
app.get('/api/boat', (req, res) => {
	getBoat(req.query.id, dataOrError => {
		res.send(dataOrError);
	});
})



// POST 
app.post('/api/boat', (req, res) => {
	console.log("inside post server")
	addBoat(req.body, dataOrError => {
		res.send(dataOrError);
	
})
})

// DELETE /api/boat?id=x
app.delete('/api/boat', (req, res) => {
	deleteBoat(req.query.id, dataOrError => {
		res.send(dataOrError);
	});
})


//Update 
app.put('/api/update', (req, res) => {
	updateBoat(req.body, req.params.id, () => {
		res.send(req.body);
	})
})

// Search 
app.get('/api/search', (req, res) => {
	search(req.query, dataOrError => {
		res.send(dataOrError)
	})
})

app.get('/api/search/lowprice', (req, res) => {
	getOnlyFive("lowprice", dataOrError => {
		res.send(dataOrError)
	})
})

app.get('/api/search/highprice', (req, res) => {
	getOnlyFive("highprice", dataOrError => {
		res.send(dataOrError)
	})
})

app.get('/api/search/oldest', (req, res) => {
	getOnlyFive("oldest", dataOrError => {
		res.send(dataOrError)
	})
})

app.get('/api/search/madebefore', (req, res) => {
	getOnlyFive("madebefore", dataOrError => {
		res.send(dataOrError)
	})
})

app.get('/api/search/madeafter', (req, res) => {
	getOnlyFive("madeafter", dataOrError => {
		res.send(dataOrError)
	})
})

app.get('/api/search/newest', (req, res) => {
	getOnlyFive("newest", dataOrError => {
		res.send(dataOrError)
	})
})


app.get('/api/search/name_asc', (req, res) => {
	getOnlyFive("name_asc", dataOrError => {
		res.send(dataOrError)
	})
})


app.get('/api/search/name_desc', (req, res) => {
	getOnlyFive("name_desc", dataOrError => {
		res.send(dataOrError)
	})
})



app.get('/api/search/maxPrice', (req, res) => {
	getOnlyFive("maxPrice", dataOrError => {
		res.send(dataOrError)
	})
})

app.get('/api/search/minPrice', (req, res) => {
	getOnlyFive("minPrice", dataOrError => {
		res.send(dataOrError)
	})
})

//Start listening to the server 
app.listen(port, console.log("Running port", `${port}`));
