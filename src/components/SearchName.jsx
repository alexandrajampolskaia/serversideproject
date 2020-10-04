import React, {useState} from 'react'
import axios from 'axios';

export default function SearchName() {
	const [getAllBoats, setGetAllBoats] = useState([]);
	const [search, setSearch] = useState("")
	const [segel, setSegel] = useState("")
	const [motor, setMotor] = useState("")

	const fetchData = () => {
		axios.get(`/api/search?modellnamn=${search}&segelbåt=${segel}&motor=${motor}`)
		.then(res => {
			console.log(res)
			setGetAllBoats(res.data)
		})
		.catch(err => {
			console.log(err.response)
		})
	}

	const mapBoats = getAllBoats.map((boat, index) => {
	if (getAllBoats === null ){
		console.log("Empty");
	} return (
		<p key={boat.modellnamn+index}>{boat.modellnamn}</p>
	)	
	})



console.log(getAllBoats);
	return (
		<div>
		<h2>Search boat </h2>
		<label>Modell: </label><input onChange={(e) => setSearch(e.target.value)} />&nbsp;
		<label>Segel: </label><input onChange={(e) => setSegel(e.target.value)}/>&nbsp;
		<label>Motor: </label><input onChange={(e) => setMotor(e.target.value)}/>&nbsp;
		<button onClick={fetchData}>Search</button>
		{mapBoats}
		</div>
	)
}
