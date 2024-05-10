import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function Login(){
    const [userId, setUserId]=useState('');
    const [password, setPassword]=useState('');
    const [loginMessage,setLoginMessage]=useState('');
   

    const handleLogin=async(e)=>{
        e.preventDefault();
        console.log('Logging in with:', userId, password);

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, password })
            });
            const data=await response.json();
            if(response.ok){
                setLoginMessage('Login successful!');
                console.log(data.message);
                window.location.href = '/'; //redirect to mainpage
            }else{
                setLoginMessage(data.message||'Login failed!')
            }
            }catch(error){
                console.error('Login request failed:', error)
                setLoginMessage('Login request failed. Please check the console for more information.');
            }
    }
    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="userId">User ID:</label>
                    <input type= "text"
                            id="userId"
                            value={userId}
                            onChange={(e)=>setUserId(e.target.value)}
                            required
                    />
                </div>
                <div>
                    <label htmlFor="password">Passwored:</label>
                    <input type="password"
                            id="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {loginMessage && <p>{loginMessage}</p>} 
        </div>
    )
}

export default Login;