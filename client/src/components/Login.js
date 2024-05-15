import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';

function Login(){
    const [userId, setUserId]=useState('');
    const [password, setPassword]=useState('');
    const [loginMessage,setLoginMessage]=useState('');
    const {login}=useAuth();
    const navigate=useNavigate();

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
                console.log('Login successful, received data:',data);
                setLoginMessage('Login successful!');
                login(data.userId);
                navigate('/'); //redirect to mainpage
            }else{
                const data=await response.json()
                setLoginMessage(data.message||'Login failed!')
                console.log('Login faled, received data:',data)
            }
            }catch(error){
                console.error('Login request failed:', error)
                setLoginMessage('Login request failed. Please check the console for more information.');
            }
    }
    return(
        <div>
            <div className="form-container">
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
                    <label htmlFor="password">Password:</label>
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
            <p>Don't have an account? <Link to="/register">Register</Link></p>
            <p><Link to="/forgot-password">Forgot Password?</Link></p>
            </div>
        </div>
    )
}

export default Login;