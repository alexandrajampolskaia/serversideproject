import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetOneBoat = ()=> {
const [getOneBoat, setGetOneBoat] = useState([]);

		useEffect(() => {
		axios.get('/api/boat?id=5f7898d9995e600369d01519')
		.then(res => {
			console.log(res)
			setGetOneBoat(res.data)
		})
		.catch(err => {
			console.log(err.response)
		})
	},[])

		return (
		<div>
			<h2>One boat</h2>
			<div>
			{getOneBoat.map((boat)=> (<p key={boat.modellnamn}>{boat.modellnamn}</p>))}
			</div>
		</div>
	)
}

export default GetOneBoat;