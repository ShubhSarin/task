import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
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
    <div className="bg-slate-950 font-[Montserrat] flex flex-row items-center justify-center h-screen">
    <form>
        <input className="text-white border-1 border-zinc-600 rounded-xl p-3 w-full m-2" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="text-white border-1 border-zinc-600 rounded-xl p-3 w-full m-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="border-5 border-zinc-600 text-white rounded-xl p-2 m-2 w-full hover:cursor-pointer" type="submit" onClick={(e) => {
            e.preventDefault();
            if (username === "" || password === "") {
                setError("Please fill in all fields");
            } else {
                loginRequest(username, password)
                .then(
                    (data) => {
                        navigate("/tasks/");
                    }
                )
                .catch((error) => {
                    setError(error.message);
                });
            }
        }}>Login</button>
    </form>
    </div>
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
        const response = await fetch("http://localhost:8000/authentication/check/",request)
        if(response.status === 200){
            return true;
        } else {
            throw new Error("Not logged in");
        }
    }
    catch(err) {
        throw new Error(err)
    }
}

function loginRequest(username, password){
    return fetch("http://localhost:8000/authentication/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
    .then((response) => {
        if (response.status === 200) {
            return response.json();
        }
        else if (response.status === 401) {
            throw new Error("Invalid username or password");
        } else {
            throw new Error("Something went wrong. Please try again later.");
        }
    })
    .then((data) => {
        localStorage.setItem("token", data.token);
        return data;
    })
}