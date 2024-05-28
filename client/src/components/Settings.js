// Settings.js
import React from 'react';
import ClothingPreferences from './ClothingPreferences';

function Settings() {
    
const canadaCities = [
    { name: "Toronto", lat: 43.651070, lon: -79.347015 },
    { name: "Vancouver", lat: 49.282730, lon: -123.120735 },
    { name: "Montreal", lat: 45.501690, lon: -73.567253 },
    { name: "Calgary", lat: 51.044734, lon: -114.071883 },
    { name: "Ottawa", lat: 45.421530, lon: -75.697193 },
    
  ];
  
    return (
        <div>
            <div className="setting-container">
            <h1>Settings</h1>
            <ClothingPreferences />
            </div>
        </div>
    );
}

export default Settings;
