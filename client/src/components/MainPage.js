import React from 'react';
import {Link} from 'react-router-dom';

function MainPage(){
    return(
        <div>
            <h1>Welcome to the Weather-Based Outfit Recommender</h1>
            <p>Get your outfit recommendation based on today's weather.</p>
            <Link to="/login"><button>Login</button></Link>
            <p>Don't have an account? <Link to="/register">Click here to register</Link></p>
        </div>
    )
}

export default MainPage;