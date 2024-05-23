import React,{useState} from 'react';
import {Link} from 'react-router-dom';

function Register(){
    const [username, setUserName]=useState('');
    const [password, setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');
    const [email, setEmail]=useState('');
    const [error, setError]=useState('');
    const [success, setSuccess]=useState('');

    const handleRegistration=async(e)=>{
        e.preventDefault();

        //reset error,success message every attempt
        setError('');
        setSuccess('');

        if (!validatePassword(password)) {
            setError("Password must be at least 6 characters long, include at least one number and one uppercase letter.");
            return;
        }

        if(password!==confirmPassword){
            setError("Password do not match!")
            return;
        }

        if(!validateEmail(email)){
            setError("Invalid email address.")
            return;
        }
        try{
            const response=await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({username, password, email})
        })
        const data=await response.json();
        if(response.ok){
            setSuccess("Registration successful!")
            console.log("Registration successful: ", data);
            //redirect to login page
        }else{
            setError(data.message||"Registration failed!");
        }
        }catch(error){
            console.error("Registration error: ", error);
            setError("Failed to register due to network error.");
        }
    
    }

    function validatePassword(password){
        return password.length>=6 && /[A-Z]/.test(password) &&  /\d/.test(password);
    }

    function validateEmail(email){
        return /\S+@\S+\.\S+/.test(email); 
    }

    return(
        <div>
            <div class="registration-container">
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{color:'green'}}>{success}</p>}
            <form onSubmit={handleRegistration}>
                 <div>
                      <label htmlFor="email">Email:</label>
                       <input type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                        />
                </div>

                <div>
                    <label htmlFor="userId">User ID:</label>
                    <input type="text"
                            id="userId"
                            value={username}
                            onChange={(e)=>setUserName(e.target.value)}
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
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Register;