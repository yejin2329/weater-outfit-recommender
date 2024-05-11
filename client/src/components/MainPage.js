import React from 'react';
import {Link} from 'react-router-dom';

function MainPage(){
    return(
        <div className="page-container">
            <h1>Welcome to the Weather-Based Outfit Recommender</h1>
            <p>Get your outfit recommendation based on today's weather.</p>
            <div className="auth-links">
            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
            </div>

            <div className="scene">
                <div className="snowflakes">
                <div class="snowflake"></div>
                
                </div>
                <div className="person">
                    <div className="umbrella"></div>
                </div>
          </div>
      
        </div>
    )
}

export default MainPage;