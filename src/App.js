import React from 'react';
import './App.css';
import GetDeleteBoats from './components/GetDeleteBoats';
import GetOneBoat from './components/GetOneBoat';
import PostBoat from './components/PostBoat';
import SearchBoats from './components/SearchBoats';


function App() {
  return (
    <div className="App">
		<GetDeleteBoats />
		<GetOneBoat />
		<PostBoat />
		<SearchBoats />
    </div>
  );
}

export default App;
