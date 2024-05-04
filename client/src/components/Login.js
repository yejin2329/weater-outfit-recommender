import React, {useState} from 'react';

function Login(){
    const [userId, setUserId]=useState('');
    const [password, setPassword]=useState('');

    const handleLogin=(e)=>{
        e.preventDefault();
        console.log('Logging in with:', userId, password);
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
        </div>
    )
}

export default Login;