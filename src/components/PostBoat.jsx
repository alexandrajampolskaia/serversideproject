import React, { useState } from 'react';
import axios from 'axios';

const PostBoat = ()=> {
const [data, setData] = useState({modellnamn:"", tillverkningsår: "", pris:"", segelbåt:"", motor:""});



function submit(e){
	// e.preventDefault()
	axios.post('api/boat', data)
	.then(res=>{
		console.log(res.data);
	})
}

function handle(e){
	const newdata={...data}
	newdata[e.target.id]=e.target.value
	setData(newdata)
}
		return (
		<div>
		<h2>Add boat</h2>
		<form onSubmit={(e)=>submit(e)}>
	
			<div>
			<label>&nbsp;Modell: </label> 
			<input onChange={(e)=>handle(e)} value={data.modellnamn} type="text" name="modellnamn" id="modellnamn" placeholder=""/> 
			</div>	

			<div>
			<label>&nbsp;År: </label> 
			<input onChange={(e)=>handle(e)} value={data.tillverkningsår} type="number" name="tillverkningsår" id="tillverkningsår" placeholder=""/> 
			</div>		

			<div>
			<label>&nbsp;Pris: </label> 
			<input onChange={(e)=>handle(e)} value={data.pris} type="number" name="pris" id="pris" placeholder=""/> 
			</div>

			<div>
			<label>&nbsp;Segelbåt: </label> 
			<input onChange={(e)=>handle(e)} value={data.segelbåt} type="text" name="segelbåt" id="segelbåt" placeholder=""/> 
			</div>

			<div>
			<label>&nbsp;Motor: </label> 
			<input onChange={(e)=>handle(e)} value={data.motor} type="text" name="motor" id="motor" placeholder=""/> 
			</div>

			<button >Add</button> &nbsp;
		
		</form>

		</div>
	)
}

export default PostBoat;