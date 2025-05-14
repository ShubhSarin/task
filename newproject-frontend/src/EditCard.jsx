import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const serverURL = 'https://task-ca6l.onrender.com'

export default function EditCard(){
    const navigate = useNavigate()
    const { state } = useLocation()
    const id = state.id
    const [task, setTask] = useState()
    const [error, setError] = useState()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const request = {
        method: 'GET',
        header: {
            'Content-Type': 'application/json',
        }
    }
    useEffect(()=>{
        async function fetchData(){
            const res = await fetch(serverURL + `/tasks/${id}/`, request)
            .then(async (response) => {
                const data = await response.json()
                console.log(data)
                setTask(data)
                setTitle(data.title)
                setDescription(data.description)
            })
            .catch((err) => {setError(err)})
        }
        fetchData()
    }, [id])

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center text-white">
            <h1 className="font-bold text-5xl mb-10 text-white">Edit Task</h1>
            <form>
            <input className="border-2 border-slate-500 rounded-[7px] m-1 p-3 w-full" value={title} onChange={(e) => {
                 setTitle(e.target.value)
            }}/>
            <textarea className="border-2 border-slate-500 rounded-[7px] m-1 p-3 w-full h-3/6" value={description} onChange={(e) => {
                setDescription(e.target.value)
            }}/>
            <button className="border-4 border-slate-500 p-3 m-1 rounded-[7px] hover:cursor-pointer w-full" onClick={async (e) => {
                    e.preventDefault()
                    if(title==='' || description===''){
                        try{
                            const request = {
                                method: 'DELETE',
                                header: {
                                    'Content-type': 'application/json',
                                },
                            }
                            await fetch(serverURL + `/tasks/${id}/`, request)
                            navigate('/tasks/')
                        } catch(err) {
                            setError(err)
                        }
                    }
                    try{
                        const request = {
                            method: 'PUT',
                            headers: {
                                'Content-type': 'application/json',
                            },
                            body: JSON.stringify({
                                title: title,
                                description: description,
                            })
                        }
                        const response = await fetch(serverURL + `/tasks/${id}/`, request)
                        navigate('/tasks/')

                    } catch(err){
                        setError(err)
                    }
                }}>Save</button>
            </form>
        </div>
    )
}