import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import { useNavigate } from "react-router-dom";
import Update from "./Update";

const PlayerList = () => {
    const axiosPrivate = useAxiosPrivate();
    const [result, setResult] = useState([]);
    const [playerElement, setPlayerElemement] = useState([]);
    const [selectPlayer, setSelectPlayer] = useState(null);
    const [deletePlayer, setDeletePlayer] = useState(null);
    const navigate = useNavigate();

    const loadPlayers = async () => {
        let isMounted = true;
        const controller = new AbortController();
        try {
            const response = await axiosPrivate.get('/api/search', {
                signal: controller.signal,
            });
            isMounted && setResult(response.data);
            return() => {
                isMounted = false;
                controller.abort();
            }
        } catch (err) {
            if (err.code === 'ERR_CANCELED') {
            return (
                <div>Error.... unable to load players</div>
            )}
        };
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const id = e.target.id;
        let index = result.findIndex(player => player._id === id);
        setSelectPlayer(result[index]);
    }

    const confirmDelete = (e) => {
        e.preventDefault();
        const id = e.target.id;
        setDeletePlayer(id);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        let isMounted = true;
        const controller = new AbortController();
        try {
            const res = await axiosPrivate.post('http://localhost:5000/api/deletePlayer', {
                signal: controller.signal,
                id: deletePlayer
            });
            if (isMounted) {
                setDeletePlayer(null);
                navigate('../players');
            }
            return() => {
                isMounted = false;
                controller.abort();
            }
        } catch (err) {
            if (err.code === 'ERR_CANCELED') return;
        };
    };

    useEffect(() => {
        loadPlayers();
    },[])

    useEffect (() =>{
        setPlayerElemement(
            result.map((x, index) => { 
                return <div className="flex justify-between items-center" key={index}>
                    {x.player.name}
                    <div className="flex">
                        <button className="p-1 m-2 bg-gray-400 rounded-lg" id={x._id} onClick={handleUpdate} >Update</button>
                        <button className="p-1 m-2 bg-gray-400 rounded-lg" type="button" id={x._id} onClick={confirmDelete}>Delete</button>
                    </div>
                </div>;
            })
        ) 
    },[result])


    return (
        <div className="mainContent coachContent">
            {selectPlayer ? (<Update selectPlayer={selectPlayer} setSelectPlayer={setSelectPlayer} />)
                :
                (<div className="my-8 mx-auto max-w-lg flex-col bg-gray-300 p-7 rounded-xl shadow-black shadow-lg text-base font-medium">
                    <h5 className="text-center underline font-bold mb-2">Player's List</h5>
                    <div>
                        {playerElement}
                    </div>
                </div>)
            }
            {deletePlayer ? (<div className=" fixed top-1/4 mx-auto inset-x-0 max-w-md text-center bg-slate-200 p-4 rounded-lg border-black shadow-lg">
                 <form onSubmit={handleDelete} >
                    <h5 className="text-logoRed">Are you sure you want to delete this player?</h5>
                    <div className="flex justify-evenly my-4">
                        <button className="bg-gray-400 rounded-lg px-2 py-1" onClick={handleDelete}>Delete</button>
                        <button className="bg-gray-400 rounded-lg px-2 py-1" type="button" onClick={() => setDeletePlayer(null)}>Cancel</button>
                    </div>
                </form>
            </div>) : (<div></div>)}     
        </div>
    )

}

export default PlayerList;