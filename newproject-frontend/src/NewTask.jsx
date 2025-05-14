import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const serverURL = 'https://task-ca6l.onrender.com'

export default function NewTask(){
    const navigate = useNavigate()
    const[title, setTitle] = useState('')
    const[description, setDescription] = useState('')

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center text-white">
            <h1 className="font-bold text-5xl mb-10 text-white">New Task</h1>
            <form>
            <input className="border-2 border-slate-500 rounded-[7px] m-1 p-3 w-full" placeholder='Title' value={title} onChange={(e) => {
                 setTitle(e.target.value)
            }}/>
            <textarea className="border-2 border-slate-500 rounded-[7px] m-1 p-3 w-full h-3/6" placeholder="Description" value={description} onChange={(e) => {
                setDescription(e.target.value)
            }}/>
            <button className="border-4 border-slate-500 p-3 m-1 rounded-[7px] hover:cursor-pointer w-full" onClick={async (e) => {
                    e.preventDefault()
                    if(title==='' || description===''){
                        try{
                            alert(message='Please insert valid Title and Description')
                        } catch(err) {
                            setError(err)
                        }
                    }
                    try{
                        const request = {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json',
                                'Authorization': 'Token ' + localStorage.getItem('token')
                            },
                            body: JSON.stringify({
                                title: title,
                                description: description,
                            })
                        }
                        await fetch(serverURL + `/tasks/`, request)
                        navigate('/tasks/')
                    } catch(err){
                        setError(err)
                    }
                }}>Save</button>
            </form>
        </div>
    )
}