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
                recommendations=[...recommendations, ...(preferences.cold ? [preferences.cold]: defaultClothing.cold)]
                addSensitiveItems();
        }else if(weather.temperature>=5 && weather.temperature<20){
           recommendations.push(preferences.cold||'Light Jacket', 'Long Sleeve Shirt')
            }else{
            recommendations.push(preferences.hot||defaultClothing.hot);
            if(sensitivity.heatSensitive){
                recommendations.push('Sun Hat')
            }
            }
       

        if(weather.condition.includes('rain')){
                recommendations.push(preferences.rainy||defaultClothing.rainy)
                addSensitiveItems();
        }

        return recommendations.filter((item,index,self)=>self.indexOf(item)===index);
    }
    
    export default recommendOutfit;

//export default recommendations;