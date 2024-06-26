//function OutfitRecommener(){
    
const recommendOutfit=(weather, preferences, sensitivity)=>{
        let recommendations=[];
        if(weather.temperature<5){
            recommendations.push('Thermal Jacket')
            if(sensitivity.coldSensitive){
                recommendations.push('Scarf', 'Gloves')
            }
        }else if(weather.temperature>=5 && weather.temperature<20){
            recommendations.push('Light Jacket', 'Long Sleeve Shirt')
        }
    }


//export default recommendations;