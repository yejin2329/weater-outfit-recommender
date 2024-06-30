//function OutfitRecommener(){
    
const recommendOutfit=(weather, preferences, sensitivity)=>{
        let recommendations=[];

        //define default clothing
        const defaultClothing={
            cold:['Thermal Jacket', 'Heavy Coat'],
            hot:['T-shirt', 'Shorts'],
            rainy:['Waterproof Jacket']
        }

        //to add sensitive items
        const addSensitiveItems=()=>{
            if(sensitivity.coldSensitive){
                recommendations.push('Scarf', 'Gloves')
            }
            if(sensitivity.heatSensitive){
                recommendations.push('Sun Hat')
            }
            if(sensitivity.rainSensitive&&weather.condition.includes('rain')){
                recommendations.push('Umbrella')
            }
        }

        //recommend based on tempertaure
        if(weather.temperature<5){
            if(preferences.cold){
                recommendations.push(preferences.cold)
                addSensitiveItems();
            }else{
                recommendations=recommendations.concat(defaultClothing.cold)
            }
        }else if(weather.temperature>=5 && weather.temperature<20){
            if(preferences.cold){
                recommendations.push(preferences.cold)
            }else{
            recommendations.push('Light Jacket', 'Long Sleeve Shirt');
            }
        }else{
            if(preferences.hot){
                recommendations.push(preferences.hot)
                if(sensitivity.heatSensitive){
                    recommendations.push('Sun Hat')
                }
            }else{
                recommendations=recommendations.concat(defaultClothing.hot)
            }
        }

        if(weather.condition.includes('rain')){
            recommendations.push('Waterproof Jacket')
            if(sensitivity.rainSensitive){
                recommendations.push('Umbrella')
            }
        }
        return recommendations;
    }
    
    export default recommendOutfit;

//export default recommendations;