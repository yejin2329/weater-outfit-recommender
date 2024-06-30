//function OutfitRecommener(){
    
const recommendOutfit=(weather, preferences, sensitivity)=>{
        let recommendations=[];

        //define default clothing
        const defaultClothing={
            cold:['Thermal Jacket'],
            hot:['T-shirt'],
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
            recommendations.push('Thermal Jacket')
            if(sensitivity.coldSensitive){
                recommendations.push('Scarf', 'Gloves')
            }
        }else if(weather.temperature>=5 && weather.temperature<20){
            recommendations.push('Light Jacket', 'Long Sleeve Shirt')
        }else{
            recommendations.push('T-shirt', 'Shorts');
            if(sensitivity.heatSensitive){
                recommendations.push('Sun Hat')
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