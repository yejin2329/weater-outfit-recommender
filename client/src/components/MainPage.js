import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import recommendOutfit from './OutfitRecommender';


function MainPage(){
    const[customLocation, setCustomLocation]=useState(null);
    const [location, setLocation]=useState(null);

    const [weather, setWeather]=useState(null);
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState(null);
    const{user, logout}=useAuth();

    const[OutfitRecommendations, setOutfitRecommendations]=useState([]);

    console.log('User in MainPage:', user);

  
     //fetch weather data
     const fetchWeather=async()=>{
        if(!user || (!location && !customLocation)){
            console.error("No user or location data available.")
            return;
        }
        
        const {lat, lon}=location || customLocation;
        const url=lat&&lon
             ? `http://localhost:5000/weather?lat=${lat}&lon=${lon}`
             : `http://localhost:5000/weather?userId=${user._id}`;
    
        try{
            const response=await fetch(url);
            if(response.ok){
                const data=await response.json();
                setWeather(data);
            }else{
                const errorData=await response.text();
                throw new Error(errorData || 'Failed to fetch weather data')
            }
        }catch(error){
            setError('Weather loading failed: '+error.message);
            console.error('Error fetching weather:', error)
        }finally{
            setLoading(false);
        }
    } 

    //effect for fetching weather
    useEffect(()=>{
        if(user&&(location || customLocation)){
            fetchWeather(location?.latitude, location?.longitude);
        }
    },[])

    //effect for initial fetch
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                setLocation({
                    latitude:position.coords.latitude,
                    longitude:position.coords.longitude
                })
                fetchWeather(position.coords.latitude, position.coords.longitude)
            },
            (error)=>{
                setError('Location access denied. Unable to fetch weather data: '+error.message)
                console.error('Geolocation Error:', error)
            }
        )
       
    },[]);

    //
    useEffect(()=>{
        if(weather && user){
            console.log("Weather data:", weather);
            console.log("User Preferences:", user.preferences);
            console.log("User Sensitivity:", user.sensitivity);
            const recommendations=recommendOutfit(weather, user.preferences, user.sensitivity);
            console.log("Recommendations:", recommendations);
            setOutfitRecommendations(recommendations);
        }
    },[weather,user])
    
    useEffect(()=>{
        //function to create new snowflake element
        function createSnowflakes(){
            const snowflakesContainer=document.getElementById('snowflakes-container')
            if(snowflakesContainer){
            snowflakesContainer.innerHTML=''; //clear previous snowflakes
            for(let i=0; i<50; i++){
                const snowflake=document.createElement('div');
                snowflake.className='snowflake';
                const size=Math.random()*(15-10)+10+'px';
                snowflake.style.width=size;
                snowflake.style.height=size;
                const positionX=Math.random()*100+'%';
                const positionY=Math.random()*100+'%';
                snowflake.style.left=positionX;
                snowflake.style.top=positionY;
                //snowflake.style.opacity=0.5+Math.random()*0.5;
                snowflake.style.animationName="falling-snow";
                snowflake.style.animationDuration = 5 + Math.random() * 5 + 's';
                snowflake.style.animationTimingFunction='linear';
                snowflake.style.animationIterationCount='infinite';
                snowflakesContainer.appendChild(snowflake)
            }
        }else{
            console.error('Snowflakes container not found')
        }
    }
        createSnowflakes();
  
})
    
    return(
        <div className="page-container">
            <h1>Welcome to the Weather-Based Outfit Recommender</h1>
            <p>Get your outfit recommendation based on today's weather.</p>
            <div className="auth-links">
                {user?(
                    <div>
                        <span>Welcome, {user.name}!</span>
                        <button onClick={logout}>Logout</button>
                        <br/>
                        <Link to="/settings" className="settings-link">Manage Settings</Link>
                    </div>
                ):(
                    <>
                        <Link to="/login">Login</Link> &nbsp; | <Link to="/register">Register</Link>
                    </>
                )}
             
            </div>
            
       
            {weather&&(   
                <div className="weather-info">
                
                   <p>Temperature: {weather.temperature}</p>
                    <p>Description: {weather.description}</p> 
                </div>
           )} 

            {loading&&<p>Loading weather...</p>}
            {error&&<p>Error:{error}</p>}
          

            <div className="scene">
                <h2>Current Weather</h2>
            {OutfitRecommendations.length>0 &&(
                <div>
                    <h2>Recommended Outfit:</h2>
                    <ul>
                        {OutfitRecommendations.map((item, index)=>(
                            <li key={index}>{item}</li>
                        )

                        )}
                    </ul>
                    </div>
            )}
            <div className="snowflakes" id="snowflakes-container"></div>
                <div className="person">
                    <div className="umbrella"></div>
                </div>
          </div>
      
        </div>
    )
}

export default MainPage;