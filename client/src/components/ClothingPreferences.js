import React, { useState } from 'react';
import {useAuth} from '../contexts/AuthContext';
import {Link} from 'react-router-dom';

function ClothingPreferences() {
    const {user}=useAuth();

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
        cold: ["Heavy Coat", "Thermal Jacket", "Sweater", "Fleece Jacket", "Down Jacket", "Wool Coat", "Long Underwear", "Scarves, Hats, and Gloves", "Snow Boots", "Other"],
        hot: ["T-shirt", "Shorts", "Light Dress","Tank Top", "Linen Shirt", "Sun Hat", "Sandals", "Capri Pants", "Other"],
        rainy: ["Raincoat", "Waterproof Jacket", "Poncho", "Umbrella", "Waterproof Pants", "Rubber Boots", "Water-Resistant Backpack", "Waterproof Hat", "Quick-Dry Clothing", "Other"]
    };
    

    const handlePreferencesChange = (e) => {
        setPreferences({ ...preferences, [e.target.name]: e.target.value });
    };

    const handleSensitivityChange = (e) => {
        setSensitivity({ ...sensitivity, [e.target.name]: e.target.checked });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //debug statement
        console.log('Submitting preference for user ID:', user.id);
        
        const response = await fetch('http://localhost:5000/api/users/preferences', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                userId:user.id,
                preferences:preferences,
                sensitivity: sensitivity })
        });
        try {
            const data = await response.json();
            if (response.ok) {
                console.log('Preferences updated:', data);
            } else {
                console.error('Failed to update preferences:', data.message);
            }
        } catch (error) {
            console.error('Error parsing response:', error);
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
            <p>Back to <Link to="/">Main Page</Link></p>
        </div>
    );
}

export default ClothingPreferences;
