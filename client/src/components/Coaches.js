import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";

const Coaches = () => {
    const [coaches, setCoaches] = useState([]);
    const [deleteId, setDeleteId] = useState("");
    const axiosPrivate = useAxiosPrivate();

    const getCoaches = async () => {
        let isMounted = true;
        const controller = new AbortController();
        try {
            const response = await axiosPrivate.get('/api/coaches', {
                signal: controller.signal, 
            });
            isMounted && setCoaches(response.data);
        } catch (err) {
            if (err.code === 'ERR_CANCELED') return;
        }
        return() => {
            isMounted = false;
            controller.abort();
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        let isMounted = true;
        const controller = new AbortController();
        try {
            const res = await axiosPrivate.post('/api/deleteCoach', {
                signal: controller.signal,
                id: deleteId
            })
            isMounted && setDeleteId("");
        } catch (err) {
            if (err.code === 'ERR_CANCELED') return;
        }
        return() => {
            isMounted = false;
            controller.abort();
        }
           
    }

    useEffect(() => {
        getCoaches()
    },[deleteId])

    return (
        <div className="my-8 mx-auto max-w-lg flex-col bg-gray-300 p-7 rounded-xl shadow-black shadow-lg text-base font-medium">
            <h5 className="text-center underline font-bold mb-2">Active Coaches</h5>
            {coaches?.length
                ? (
                    <ul >
                        {coaches.map(({ _id, name }) => <li className="flex justify-between items-center my-4" key={_id} id={_id}><span>{name}</span>
                        <button className="bg-gray-400 rounded-lg p-1" id={_id} onClick={(e) => setDeleteId(e.target.id)}>Delete</button></li>)}
                    </ul>
                ) : <p>No coaches to display</p>}
                {deleteId ? (<div className=" fixed top-1/4 mx-auto inset-x-0 max-w-md text-center bg-slate-200 p-4 rounded-lg border-black shadow-lg">
                 <form onSubmit={handleDelete} >
                    <h2 className="text-logoRed">Are you sure you want to delete this player?</h2>
                    <div className="flex justify-evenly my-4">
                        <button className="bg-gray-400 rounded-lg px-2 py-1" onClick={handleDelete}>Delete</button>
                        <button className="bg-gray-400 rounded-lg px-2 py-1" type="button" onClick={() => setDeleteId("")}>Cancel</button>
                    </div>
                    
                </form>
            </div>) : (<div></div>)}
            
        </div>
    )
}

export default Coaches;