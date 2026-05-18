import { useState, useEffect } from "react";
import axios from "axios";

import { Navigate, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('')
    const [loggedin, setLoggedin] = useState(null)
    const [error , setError ] = useState('')
    const navigation = useNavigate()

useEffect(()=> {
    axios.get('https://localshot:5000/api/login')
    .then((response) => {
        if(response.data && response.data.length > 0 ) {
            setLoggedin(response.data[0])
        }
        
    })
},[])
    const userHnadler = async (e) => {
        e.preventDefault();

        if(!email.endsWith('@construction.com')) {
            setError(" Please login with @construction.com")
            return
        }
        try{
            const resp = await axios.post('/api/login', {email})
            if(resp.data.success) {
                setLoggedin(resp.data._user)
                localStorage.setItem('workerEmail', email)
                navigation('/')
            }else{
                setError(resp.data.message)
            }
        }catch(err) {
            setError("Server error, make sure the server is running or prot 5000")
        }
        
    }
    const handleLogOut = async () => {
        axios.delete(`/api/login/${loggedin.id}`)
        setLoggedin(null)
    }
    if(loggedin) {
        return (
        <>
        <h1>"you are already loggend in"</h1>
        <h3>{loggedin.email}</h3>
        <button 
        onClick={handleLogOut}>Log out</button>
        </>
        )
    }

 return(
    <>
 <div className="login-container">
    <form onSubmit={userHnadler}>
 <input 
                    type="email" 
                    placeholder="worker@construction.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                 <button type="submit">Enter Dashboard</button>
                {error && <p className="error">{error}</p>}
    </form>
 </div>
    </>
 )
}
export default Login;