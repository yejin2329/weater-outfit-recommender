import React, { useState } from 'react';
import {useAuth} from '../contexts/AuthContext';
import {Link} from 'react-router-dom';

function ClothingPreferences() {
    const [preferences, setPreferences] = useState({
        cold: '',
        hot: '',
        rainy: ''
    });
    const [sensitivity, setSensitivity] = useState({
        coldSensitive: false,
        heatSensitive: false,
        windSensitive: false
    });

    const clothingOptions = {
        cold: ["Heavy Coat", "Thermal Jacket", "Sweater", "Other"],
        hot: ["T-shirt", "Shorts", "Light Dress", "Other"],
        rainy: ["Raincoat", "Waterproof Jacket", "Poncho", "Other"]
    };
    

    const handlePreferencesChange = (e) => {
        setPreferences({ ...preferences, [e.target.name]: e.target.value });
    };

    const handleSensitivityChange = (e) => {
        setSensitivity({ ...sensitivity, [e.target.name]: e.target.checked });
    };

    const handleSubmit = async () => {
        const response = await fetch('/api/users/preferences', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
               // userId:userId,
                preferences:preferences,
                sensitivity: sensitivity })
        });
        const data = await response.json();
        if(response.ok){
            console.log('Preferences updated:',data);
        }else{
            console.error('Failed to update preferences:',data.message)
        }
    };

    return (
        <div>
            <div className="preferences-container">
            <h2>Set Your Preferences</h2>
            <form onSubmit={handleSubmit}>
            {Object.entries(clothingOptions).map(([key, items]) => (
                    <div key={key}>
                        <label>{`Preferred Clothing for ${key.charAt(0).toUpperCase() + key.slice(1)} Weather:`}</label>
                        <select name={key} value={preferences[key]} onChange={handlePreferencesChange}>
                            {items.map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <div>
                    <label>Cold Sensitive:</label>
                    <input type="checkbox" name="coldSensitive" checked={sensitivity.coldSensitive} onChange={handleSensitivityChange} />
                </div>
                <div>
                    <label>Heat Sensitive:</label>
                    <input type="checkbox" name="heatSensitive" checked={sensitivity.heatSensitive} onChange={handleSensitivityChange} />
                </div>
                <div>
                    <label>Wind Sensitive:</label>
                    <input type="checkbox" name="windSensitive" checked={sensitivity.windSensitive} onChange={handleSensitivityChange} />
                </div>
                <button type="submit">Update Preferences</button>
            </form>
            </div>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}

export default ClothingPreferences;
