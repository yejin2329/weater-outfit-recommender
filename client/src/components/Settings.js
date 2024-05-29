// Settings.js
import React, {useState} from 'react';
import ClothingPreferences from './ClothingPreferences';
import {Link} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';

function Settings() {
    const {user}=useAuth();

    const[selectedCity, setSelectedCity]=useState('');
    const canadaCities = [
        { name: "Toronto", lat: 43.651070, lon: -79.347015 },
        { name: "Vancouver", lat: 49.282730, lon: -123.120735 },
        { name: "Montreal", lat: 45.501690, lon: -73.567253 },
        { name: "Calgary", lat: 51.044734, lon: -114.071883 },
        { name: "Ottawa", lat: 45.421530, lon: -75.697193 },
        { name: "Edmonton", lat: 53.546124, lon: -113.493823 },
        { name: "Quebec City", lat: 46.813878, lon: -71.207981 },
        { name: "Winnipeg", lat: 49.895136, lon: -97.138374 },
        { name: "Halifax", lat: 44.648764, lon: -63.575239 },
        { name: "Victoria", lat: 48.428421, lon: -123.365644 },
        { name: "Saskatoon", lat: 52.157935, lon: -106.670906 },
        { name: "Regina", lat: 50.445211, lon: -104.618894 },
        { name: "St. John's", lat: 47.561510, lon: -52.712577 },
        { name: "Kelowna", lat: 49.888019, lon: -119.496011 },
        { name: "Barrie", lat: 44.389356, lon: -79.690332 },

      ];

    const handleLocationChange=(event)=>{
        const city=canadaCities.find(city=>city.name===event.target.value)
        setSelectedCity(event.target.value);
        updateLocation(city);
    }    

    const updateLocation=async(city)=>{
        //check if city and user data available
        if(!city || !user) return;
    
        console.log("Updating location to:", city)
        try{
            const response=await fetch('http://localhost:5000/api/users/update-location', {
                method: 'POST',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({
                    userId:user.id,
                    latitude:city.lat,
                    longitude:city.lon
                })
            })
            const data=await response.json();
            if(response.ok){
                console.log('Location updated successfully:',data);
            }else{
                throw new Error(data.meessage||'Falied to update location');
            }
        }catch(error){
            console.error('Error updating location:', error.message);
        }
    }

  
    return (
        <div>
            <div className="setting-container">
            <h1>Settings</h1>
            <ClothingPreferences />
            <div>
                <label htmlFor="city-select">Choose your city: </label>
                <select id="city-select" value={selectedCity} onChange={handleLocationChange}>
                    <option value="">Select a city</option>
                    {canadaCities.map(city=>(
                        <option key={city.name} value={city.name}>{city.name}</option>
                    ))}
                </select>
            </div>
            </div>
            <p>Back to <Link to="/">Main Page</Link></p>
        </div>
    );
}

export default Settings;
