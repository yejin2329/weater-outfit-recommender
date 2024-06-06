import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';


function MainPage(){
    const[customLocation, setCustomLocation]=useState(null);
    const [location, setLocation]=useState(null);
    
    const [weather, setWeather]=useState(null);
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState(null);

    const{user, logout}=useAuth();
    console.log('User in MainPage:', user);

    useEffect(()=>{
        //function to create new snowflake element
        function createSnowflakes(){
            const snowflakesContainer=document.getElementById('snowflakes-container')
            snowflakesContainer.innerHTML=''; //clear previous snowflakes
            for(let i=0; i<50; i++){
                const snowflake=document.createElement('div');
                snowflake.className='snowflake';
                const size=Math.random()*(15-10)+10+'px';
                snowflake.style.width=size;
                snowflake.style.height=size;
                const position=Math.random()*100+'%';
                snowflake.style.top=position
                snowflake.style.left=position
                snowflakesContainer.appendChild(snowflake)
            }
        }

        createSnowflakes();

        navigator.geolocation.getCurrentPosition(
            (position)=>{
                setLocation({
                    latitude:position.coords.latitude,
                    longitude:position.coords.longitude
                })
                fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            ()=>{
                alert('Location access denied. Unable to fetch weather data')
            }
        )
        
    
       
    },[]);

        //fetch weather data
        const fetchWeather=async()=>{
            setLoading(true)
            setError(null)

            const lat=customLocation ? customLocation.lat : null;
            const lon=customLocation ? customLocation.lon: null;
            const url=lat&lon
                 ? `http://localhost:5000/weather?lat=${lat}&lon=${lon}`
                 : `http://localhost:5000/weather?userId=${user._id}`;
        
            try{
                const response=await fetch(url);
                const data=await response.json();
                if(response.ok){
                    setWeather(data);
                }else{
                    throw new Error(data.message || 'Failed to fetch weather data')
                }
            }catch(error){
                setError('Weather loading failed: '+error.message);
            }finally{
                setLoading(false);
            }
        }

        useEffect(()=>{
            if(user){
                fetchWeather();
            }
        },[user,customLocation])
        
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
                    <h2>Current Weather</h2>
                    <p>Temperature: {weather.temperature}</p>
                    <p>Description: {weather.description}</p>
                </div>
            )}

            {loading&&<p>Loading weather...</p>}
            {error&&<p>Error:{error}</p>}

            <div className="scene">
            <div className="snowflakes" id="snowflakes-container"></div>
                <div className="person">
                    <div className="umbrella"></div>
                </div>
          </div>
      
        </div>
    )
}

export default MainPage;