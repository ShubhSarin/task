import { CiTrash, CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const serverURL = 'https://task-ca6l.onrender.com'

export default function Card({data}){
    const formattedDate = new Date(data.updated_at).toLocaleDateString()
    const formattedTime = new Date(data.updated_at).toLocaleTimeString()
    const navigate = useNavigate()
    return(
        <div className="bg-slate-700 p-3 rounded-xl text-white m-3 group">
            <div className="flex flex-row justify-between">
                <CiEdit className="opacity-0 hover:cursor-pointer group-hover:opacity-100" onClick={async () => {
                    await navigate('/edit/', {state: {id: data.id}})
                }}/>
                <h1 className="font-bold text-center">{data.title}</h1>
                <CiTrash className="opacity-0 group-hover:opacity-100 hover:cursor-pointer" onClick={async (e) => {
                    e.preventDefault()
                    const request = {
                        method: 'DELETE',
                        header: {
                            'Content-type': 'application/json'
                        }
                    }
                    await fetch(serverURL + `/tasks/${data.id}/`, request)
                }}/>
            </div>

            <div className="h-[1px] w-full bg-zinc-500"></div>
            <div className="h-40 w-50">
                <p className="py-2">{data.description}</p>
            </div>
            <div className="h-[1px] w-full bg-zinc-500"></div>
            <footer className="text-[10px]">{formattedDate} {formattedTime}</footer>
        </div>
    )
}
