import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';

function MainPage(){
    const{user, logout}=useAuth();
    console.log('User in MainPage:', user);
    
    useEffect(()=>{
        //function to generate random number
        function getRandomNumber(min,max){
            return Math.random()*(max-min)+min;
        }
        //function to create new snowflake element
        function createSnowflake(){
            const snowflake=document.createElement('div')
            snowflake.className='snowflake';

            const size=getRandomNumber(5,15)+'px'
            snowflake.style.width=size;
            snowflake.style.height=size;

            const top=getRandomNumber(0,100)+'%'
            const left=getRandomNumber(0,100)+'%'
            snowflake.style.top=top
            snowflake.style.left=left
            
            document.getElementById('snowflakes-container').appendChild(snowflake);
        }

        //functino to create multiple snowflakes
        function createSnowflakes(count){
            for(let i=0; i<count; i++){
                createSnowflake();
            }
        }
       
        //create 50 snowflakes
        createSnowflakes(50);
        
    },[])

    return(
        <div className="page-container">
            <h1>Welcome to the Weather-Based Outfit Recommender</h1>
            <p>Get your outfit recommendation based on today's weather.</p>
            <div className="auth-links">
                {user?(
                    <div>
                        <span>Welcome, {user.name}!</span>
                        <button onClick={logout}>Logout</button>
                    </div>
                ):(
                    <>
                        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                    </>
                )}
             
            </div>

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