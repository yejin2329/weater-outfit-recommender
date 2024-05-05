import React,{useState} from 'react';

function Register(){
    const [userId, setUserId]=useState('');
    const [password, setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');

    const handleRegistration=async(e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            alert("Password do not match!")
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

    return(
        <div>
            <h2>Register</h2>
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