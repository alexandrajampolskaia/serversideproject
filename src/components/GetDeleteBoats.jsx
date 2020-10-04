import React, { useState, useEffect } from 'react';
import axios from 'axios';


const GetAllBoats = () => {
const [getAllBoats, setGetAllBoats] = useState([]);

		useEffect(() => {
		axios.get('/api/boats')
		.then(res => {
			console.log(res)
			setGetAllBoats(res.data)
		})
		.catch(err => {
			console.log(err.response)
		})
	},[])

function remove(id){
	console.log(id)
	axios.delete('/api/boat?id=' + id)
	.then(res => {
		console.log(res)
		const newBoatList = getAllBoats.filter(boats=>boats._id !==id)
		setGetAllBoats(newBoatList)
	})
	.catch(err => {
		console.log(err.response) 
	})
}

		return (
		<div>
			<h2>All boats</h2>
			<div>
			<ol>
			{getAllBoats.map((boats, index)=> (<li key={boats.modellnamn+index}>{boats.modellnamn} 
			&nbsp;
			<button onClick={()=>remove(boats._id)}>x</button>
			</li>
			))}</ol>
			</div>
		</div>
	)
}

export default GetAllBoats;