import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';

function Login(){
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [loginMessage,setLoginMessage]=useState('');
    const {login}=useAuth();
    const navigate=useNavigate();

    const handleLogin=async(e)=>{
        e.preventDefault();
        //console.log('Logging in with:', userId, password);

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
           
            if(response.ok){
                const data=await response.json();
                console.log('Login successful, received data:',data);
                login({_id:data._id, name:data.username}) //updates
                setLoginMessage('Login successful!');
                navigate('/'); //redirect to mainpage
            }else{
                const errorData=await response.json()
                setLoginMessage(errorData.message||'Login failed!')
                console.log('Login failed, received data:',errorData)
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
                    <label htmlFor="username">Username:</label>
                    <input type= "text"
                            id="username"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
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