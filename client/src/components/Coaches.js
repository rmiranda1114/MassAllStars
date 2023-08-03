import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser.js"
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";

const Coaches = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [coaches, setCoaches] = useState();
    const [deleteCoach, setDeleteCoach] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        
        const getCoaches = async () => {
            try {
                const response = await axiosPrivate.get('/api/coaches', {
                    signal: controller.signal,
                    headers: {
                        "authorization": user.accesstoken
                    }
                   
                });
                isMounted && setCoaches(response.data);
            } catch (err) {
                if (err.code === 'ERR_CANCELED') return;
                console.log(err);
            }
        }

        getCoaches();

        return() => {
            isMounted = false;
            controller.abort();
        }
    },[])

    const handleClick = (e) => {
        e.preventDefault();
        const id = e.target.id;
        let index = coaches.findIndex(coach => coach._id === id);
        setDeleteCoach(coaches[index]);
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/api/deleteCoach', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                id: deleteCoach._id
            })
            //converts back to Json
        })

        if (res.status === 200){
            navigate('../../success');
            setDeleteCoach(null);
        }
    }

    return (
        <div className="my-8 mx-auto max-w-lg flex-col bg-gray-300 p-7 rounded-xl shadow-black shadow-lg text-base font-medium">
            <h5 className="text-center underline font-bold mb-2">Active Coaches</h5>
            {coaches?.length
                ? (
                    <ul >
                        {coaches.map((coach, i) => <li className="flex justify-between items-center my-4" key={i}><span>{coach?.name}</span>
                        <button className="bg-gray-400 rounded-lg p-1" id={coach._id} onClick={handleClick}>Delete</button></li>)}
                    </ul>
                ) : <p>No coaches to display</p>}
                {deleteCoach ? (<div className=" fixed top-1/4 mx-auto inset-x-0 max-w-md text-center bg-slate-200 p-4 rounded-lg border-black shadow-lg">
                 <form onSubmit={handleDelete} >
                    <h2 className="text-logoRed">Are you sure you want to delete this player?</h2>
                    <div className="flex justify-evenly my-4">
                        <button className="bg-gray-400 rounded-lg px-2 py-1" onClick={handleDelete}>Delete</button>
                        <button className="bg-gray-400 rounded-lg px-2 py-1" type="button" onClick={() => setDeleteCoach(null)}>Cancel</button>
                    </div>
                    
                </form>
            </div>) : (<div></div>)}
            
        </div>
    )
}

export default Coaches;