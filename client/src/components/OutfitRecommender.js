
const recommendOutfit=(weather, preferences, sensitivity)=>{
        let recommendations=[];

        //define default clothing
        const defaultClothing={
            cold:['Thermal Jacket', 'Heavy Coat'],
            hot:['T-shirt', 'Shorts'],
            rainy:['Waterproof Jacket']
        }
        //default 
        preferences.cold=preferences.cold || defaultClothing.cold;
        preferences.hot=preferences.hot || defaultClothing.hot;
        preferences.rainy=preferences.rainy || defaultClothing.rainy;

        //to add sensitive items
        const addSensitiveItems=()=>{
            if(sensitivity.coldSensitive && weather.temperature<15){
                recommendations.push('Scarf', 'Gloves')
            }
            
            if(sensitivity.heatSensitive && weather.temperature>25){
                recommendations.push('Sun Hat')
            }

            if(sensitivity.rainSensitive&&weather.condition&&weather.condition.includes('rain')){
                recommendations.push('Umbrella')
            }
        }

        //recommend based on tempertaure
        if(weather.temperature<5){
            recommendations.push(...(preferences.cold ? [preferences.cold] : defaultClothing.cold));
        }else if(weather.temperature>=5 && weather.temperature<20){
            recommendations.push(...(preferences.cold ? [preferences.cold] : ['Light Jacket', 'Long Sleeve Shirt']));
        }else{
            recommendations.push(...(preferences.hot ? [preferences.hot] : defaultClothing.hot));
        }
       
        //check for rainy weather
        if(weather.condition&&weather.condition.includes('rain')){
            recommendations.push(...(preferences.rainy ? [preferences.rainy] : defaultClothing.rainy));
        }

        //check for sensitivity regardless of temperature
        addSensitiveItems();

        return recommendations.filter((item,index,self)=>self.indexOf(item)===index);
    }
    
    export default recommendOutfit;

