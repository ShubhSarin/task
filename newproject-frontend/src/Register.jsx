import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const serverURL = 'https://task-ca6l.onrender.com'

export default function Register(){
    const[username, setUsername] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const navigate = useNavigate()
    const[error, setError] = useState(null)
    useEffect(() => {
        const checkAuthentication = async () => {
            try{
                const isAuthenticated = await checkAuth()
                if(isAuthenticated){
                    navigate('/tasks/')
                }
            }
            catch(err) {
                setError(err);
            }
        };
        checkAuthentication();
    }, [navigate])

    return(
        <>
        <div className="bg-slate-950 flex flex-col items-center justify-center w-screen min-h-screen text-white">
            <h1 className="font-bold text-5xl mb-10 text-white">REGISTER</h1>
            <form className="flex flex-col">
                <div className="flex flex-col justify-center items-center w-xl p-0">
                <input className="border-2 border-slate-500 rounded-[7px] m-1 p-3 w-full" type="text" placeholder="Username" value={username} onChange={(e) => {setUsername(e.target.value)}} />
                <div className="flex flex-row w-full p-0">
                <input className="border-2 border-slate-500 rounded-[7px] mr-1 ml-0 p-3 w-1/2" type="text" placeholder="First Name" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} />
                <input className="border-2 border-slate-500 rounded-[7px] mr-0 ml-1 p-3 w-1/2" type="text" placeholder="Last Name" value={lastName} onChange={(e) => {setLastName(e.target.value)}} />
                </div>
                <input className="border-2 border-slate-500 rounded-[7px] m-1 p-3 w-full" type="email" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                <input className="border-2 border-slate-500 rounded-[7px] m-1 p-3 w-full" type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                </div>
                <button className="border-4 border-slate-500 p-3 rounded-[7px] hover:cursor-pointer" onClick={async (e) => {
                    e.preventDefault()
                    if(username==='' || password==='' || firstName==='' || lastName==='' || email===''){
                        setError("Please fill all the fields")
                        return;
                    }
                    try{
                        const isRegistered = await registerRequest(username, password, email, firstName, lastName)
                        if(isRegistered){
                            navigate('/tasks/')
                        }
                    } catch(err){
                        setError(err)
                    }
                }}>Register</button>
            </form>
        </div>
        </>
    )
}

async function checkAuth(){
    const request = {
        method: "GET", 
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + localStorage.getItem("token"),
        },
    }
    try{
        if(localStorage.getItem("token")){
            const response = await fetch(serverURL + "/authentication/check/",request)
            if(response.status === 200){
                return true;
            } else if(response.status===401){
                return false;
            } 
            else {
                throw new Error("Unexpected error")
            }
        }
        else{
            return false
        }
    }
    catch(err) {
        throw new Error(err)
    }
}

async function registerRequest(username, password, email, firstName, lastName){
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email,
            first_name: firstName,
            last_name: lastName,

        })
    }
    try{
        const response = await fetch(serverURL + "/authentication/register/", request)
        if (response.status === 201){
            const data = await response.json()
            localStorage.setItem("token", data.token);
            return true
        } else {
            throw new Error(response.status)
        }
    } catch (err) {
        throw new Error(err)
    }

}