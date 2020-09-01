
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


//How do we start listening to the server 
// app.listen(3000);
app.listen(port)