import React from 'react';


function ClothingPreferences({preferences,sensitivity,updatePreferences, updateSensitivity, handleSubmit, readOnly}) {
    const clothingOptions = {
        cold: ["Heavy Coat", "Thermal Jacket", "Sweater", "Fleece Jacket", "Down Jacket", "Wool Coat", "Long Underwear", "Scarves, Hats, and Gloves", "Snow Boots", "Other"],
        hot: ["T-shirt", "Shorts", "Light Dress","Tank Top", "Linen Shirt", "Sun Hat", "Sandals", "Capri Pants", "Other"],
        rainy: ["Raincoat", "Waterproof Jacket", "Poncho", "Umbrella", "Waterproof Pants", "Rubber Boots", "Water-Resistant Backpack", "Waterproof Hat", "Quick-Dry Clothing", "Other"]
    };


    return (
        <div>
            <div className="preferences-container">
            <h2>Set Your Preferences</h2>
            <form onSubmit={handleSubmit}>
            {Object.entries(clothingOptions).map(([key, items]) => (
                    <div key={key}>
                        <label>{`Preferred Clothing for ${key.charAt(0).toUpperCase() + key.slice(1)} Weather:`}</label>
                        <select name={key} value={preferences[key]} onChange={(e)=>updatePreferences(key, e.target.value)} disabled={readOnly}>
                            {items.map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <div>
                    <label>Cold Sensitive:</label>
                    <input type="checkbox" name="coldSensitive" checked={sensitivity.coldSensitive} onChange={(e)=>updateSensitivity('coldSensitive', e.target.checked)}disabled={readOnly} />
                </div>
                <div>
                    <label>Heat Sensitive:</label>
                    <input type="checkbox" name="heatSensitive" checked={sensitivity.heatSensitive} onChange={(e)=>updateSensitivity('heatSensitive', e.target.checked)} disabled={readOnly} />
                </div>
                <div>
                    <label>Wind Sensitive:</label>
                    <input type="checkbox" name="windSensitive" checked={sensitivity.windSensitive} onChange={(e)=>updateSensitivity('windSensitivity', e.target.checked)} disabled={readOnly} />
                </div>
                {!readOnly&&<button type="submit">Update Preferences</button>}
            </form>
            </div>
           
        </div>
    );
}

export default ClothingPreferences;
