import React, { useState } from 'react';
import {useAuth} from '../contexts/AuthContext';

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
                <div>
                    <label>Cold Weather Clothing:</label>
                    <input type="text" name="cold" value={preferences.cold} onChange={handlePreferencesChange} />
                </div>
                <div>
                    <label>Hot Weather Clothing:</label>
                    <input type="text" name="hot" value={preferences.hot} onChange={handlePreferencesChange} />
                </div>
                <div>
                    <label>Rainy Weather Clothing:</label>
                    <input type="text" name="rainy" value={preferences.rainy} onChange={handlePreferencesChange} />
                </div>
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
        </div>
    );
}

export default ClothingPreferences;
