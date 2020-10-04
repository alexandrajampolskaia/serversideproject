import React, { useState } from 'react';
import axios from 'axios';
import SearchName from './SearchName';

const SearchBoats = ()=> {
const [getBoatName, setGetBoatName] = useState([]);
const [getBoatPrice, setGetBoatPrice] = useState([]);
const [getYearBoat, setGetYearBoat] = useState([]);

	//Name related
	function ascending() {
		axios.get('/api/search/name_asc')
		.then(res => {
			console.log(res)
			setGetBoatName(res.data)
		})
		.catch(err => {
			console.log(err.response)
		})
	}

	function descending() {
		axios.get('/api/search/name_desc')
		.then(res => {
			console.log(res)
			setGetBoatName(res.data)
		})
		.catch(err => {
			console.log(err.response)
		})
	}

	//Price related
	function high() {
		axios.get('/api/search/highprice')
		.then(res => {
			console.log(res)
			setGetBoatPrice(res.data)
		})
		.catch(err => {
			console.log(err.response)
		})
	}

	function low() {
		axios.get('/api/search/lowprice')
		.then(res => {
			console.log(res)
			setGetBoatPrice(res.data)
		})
		.catch(err => {
			console.log(err.response)
		})
	}

	function maxPrice() {
		axios.get('/api/search/maxPrice')
		.then(res => {
			console.log(res)
			setGetBoatPrice(res.data)
		})
		.catch(err => {
			console.log(err.response)
		})
	}

	function minPrice() {
		axios.get('/api/search/minPrice')
		.then(res => {
			console.log(res)
			setGetBoatPrice(res.data)
		})
		.catch(err => {
			console.log(err.response)
		})
	}

	//Year manufactured related
	function oldest() {
		axios.get('/api/search/oldest')
		.then(res => {
			console.log(res)
			setGetYearBoat(res.data)
		})
		.catch(err => {
			console.log(err.response)
		})
	}

	function newest() {
		axios.get('/api/search/newest')
		.then(res => {
			console.log(res)
			setGetYearBoat(res.data)
		})
		.catch(err => {
			console.log(err.response)
		})
	}

	function madebefore() {
		axios.get('/api/search/madebefore')
		.then(res => {
			console.log(res)
			setGetYearBoat(res.data)
		})
		.catch(err => {
			console.log(err.response)
		})
	}

	function madeafter() {
		axios.get('/api/search/madeafter')
		.then(res => {
			console.log(res)
			setGetYearBoat(res.data)
		})
		.catch(err => {
			console.log(err.response)
		})
	}




		return (
		<div className="searchBoats">

		<SearchName/> 

		<h2>Name related (Limit 5)</h2>
		<button onClick={ascending}>Name ascending</button>
		<button onClick={descending}>Name descending</button>

		<div>
		{getBoatName.map((boat)=> (<p key={boat.modellnamn}>
		<span className="fontBold">{boat.modellnamn}</span>&nbsp;
		{boat.pris}MSEK 
		({boat.tillverkningsår})
		(Segel: {boat.segelbåt} / Motor: {boat.motor})
		</p>))}
		</div>

		<h2>Price related (Limit 5)</h2>
		<button onClick={low}>Lowest price</button>
		<button onClick={high}>Highest price</button>		
		<button onClick={maxPrice}>Max price 100</button>
		<button onClick={minPrice}>Min price 100</button>

		<div>
		{getBoatPrice.map((boat)=> (<p key={boat.modellnamn}>
		{boat.modellnamn}&nbsp;
		<span className="fontBold">{boat.pris} MSEK</span> 
		({boat.tillverkningsår})
		(Segel: {boat.segelbåt} / Motor: {boat.motor})
		</p>))}
		</div>

		<h2>Year manufactured related (Limit 5)</h2>
		<button onClick={newest}>Newest boats</button>
		<button onClick={oldest}>Oldest boats</button>
		<button onClick={madebefore}>Made before 2000</button>
		<button onClick={madeafter}>Made ater 2000</button>

		<div>
		{getYearBoat.map((boat)=> (<p key={boat.modellnamn}>
		{boat.modellnamn}&nbsp;
		{boat.pris}MSEK 
		(<span className="fontBold">{boat.tillverkningsår}</span>)
		(Segel: {boat.segelbåt} / Motor: {boat.motor})
		</p>))}
		</div>
		



		</div>
	)
}

export default SearchBoats;