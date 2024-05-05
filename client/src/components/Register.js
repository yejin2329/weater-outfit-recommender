import React,{useState} from 'react';

function Register(){
    const [userId, setUserId]=useState('');
    const [password, setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');
    const [error, setError]=useState('');

    const handleRegistration=async(e)=>{
        e.preventDefault();

        //reset error message every attempt
        setError('');

        if (!validatePassword(password)) {
            setError("Password must be at least 6 characters long, include at least one number and one uppercase letter.");
            return;
        }

        if(password!==confirmPassword){
            setError("Password do not match!")
            return;
        }
        try{
            const response=await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({userId, password})
        })
        const data=await response.json();
        if(response.ok){
            console.log("Registration successful: ", data);
            //redirect to login page
        }else{
            console.error("Registration failed: ", data.message);
        }
        }catch(error){
            console.error("Registration error: ", error);
        }
    
    }

    function validatePassword(password){
        return password.length>=6 && /[A-Z]/.test(password) &&  /\d/.test(password);
    }

    return(
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleRegistration}>
                <div>
                    <label htmlFor="userId">User ID:</label>
                    <input type="text"
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
        </div>
    )
}

export default Register;