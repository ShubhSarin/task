import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import Card from "./TaskCard";


const serverURL = 'https://task-ca6l.onrender.com'

export default function Tasks(){
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        getTasks()
        .then((data) => {
            setTasks(data);
        })
        .catch((error) => {
            setError(error.message);
        })
        }, []);
    return(
        <div className="bg-slate-950 text-white">
            <div className="flex flex-row justify-between pt-5 pl-5 px-3">
                <h1 className="text-3xl font-bold">
                    Tasks
                </h1>
                <div className="flex flex-row">
                <p className="hover:cursor-pointer underline mr-5" onClick={() => {
                    navigate('/newtask/')
                }}>New Task</p>
                <p className="hover:cursor-pointer underline ml-5" onClick={() => {
                    logout()
                    navigate('/')
                    localStorage.removeItem("token")
                }}>Logout</p>
                </div>
            </div>
            <div className="font-[Montserrat] ">
                <div className="flex flex-row m-3">
                {tasks.map((task) => {
                    return(
                        <Card key={task.id} data={task} />
                    )
                })}
                </div>
            </div>
        </div>
    )
}

function logout(){
    const request = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + localStorage.getItem("token"),
        }
    }
    return fetch(serverURL + "/authentication/logout/", request)
}

async function getTasks(){
    return fetch(serverURL + "/tasks/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + localStorage.getItem("token"),
        },
    })
    .then((response) =>{
        return response.json()
        }
    )
    .catch((error) => {
        setError(error.message);
    });
}

