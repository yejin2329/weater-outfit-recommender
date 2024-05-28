// Settings.js
import React, {useState} from 'react';
import ClothingPreferences from './ClothingPreferences';

function Settings() {
    const[selectedCity, setSelectedCity]=useState('');
    const canadaCities = [
        { name: "Toronto", lat: 43.651070, lon: -79.347015 },
        { name: "Vancouver", lat: 49.282730, lon: -123.120735 },
        { name: "Montreal", lat: 45.501690, lon: -73.567253 },
        { name: "Calgary", lat: 51.044734, lon: -114.071883 },
        { name: "Ottawa", lat: 45.421530, lon: -75.697193 },
        
      ];

    const handleLocationChange=(event)=>{
        const city=canadaCities.find(city=>city.name===event.target.value)
        setSelectedCity(event.target.value);
        updateLocation(city);
    }    

    const updateLocation=async(city)=>{
        console.log("Updating location to:", city)
    }

  
    return (
        <div>
            <div className="setting-container">
            <h1>Settings</h1>
            <ClothingPreferences />
            <div>
                <label htmlFor="city-select">Choos your city: </label>
                <select id="city-select" value={selectedCity} onChange={handleLocationChange}>
                    <option value="">Select a city</option>
                    {canadaCities.map(city=>(
                        <option key={city.name} value={city.name}>{city.name}</option>
                    ))}
                </select>
            </div>
            </div>
        </div>
    );
}

export default Settings;
