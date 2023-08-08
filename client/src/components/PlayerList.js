import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import OverlayBox from "../wraps/OverlayBox.js";
import { MdClose } from "react-icons/md";

const PlayerList = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [result, setResult] = useState([]);
    const [playerElement, setPlayerElemement] = useState([]);
    const [deletePlayer, setDeletePlayer] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState();
    const [sortedPlayers, setSortedPlayers] = useState();

    const loadPlayers = async (isMounted, controller) => {
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
                setConfirmMessage(res.data.message);
            }
        } catch (err) {
            if (err.code === 'ERR_CANCELED') return;
        }
        
    };
    
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        loadPlayers(isMounted, controller);
        return() => {
            isMounted = false;
            controller.abort();
        }
    },[confirmMessage]);

    useEffect(() => {
        let sort = result.filter((player) =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setSortedPlayers(sort);
    }, [searchQuery]);

    

    useEffect (() =>{
        let display = !sortedPlayers ? result : sortedPlayers
        setPlayerElemement(
                display.map((player) => { 
                return <div className="flex justify-between items-center" key={player._id}>
                    {player.team ? <div>{player.name}</div> : <div className="text-logoRed">{player.name}</div>}
                    <div className="flex">
                        <button className="p-1 m-2 bg-gray-400 rounded-lg" id={player._id} onClick={() => navigate(`./${player._id}`)} >Update</button>
                        <button className="p-1 m-2 bg-gray-400 rounded-lg" type="button" id={player._id} onClick={confirmDelete}>Delete</button>
                    </div>
                </div>;
            })
        ) 
    },[result, sortedPlayers])


    return (
        <>
            <div className="my-8 mx-auto max-w-lg flex-col bg-gray-300 p-7 rounded-xl shadow-black shadow-lg text-base font-medium">
                <form className="searchBar" >
                    <input className="w-full p-1 rounded-xl my-2" type="search" placeholder="search..." onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}/>
                </form>
                <h5 className="text-center underline font-bold mb-2">Player's List</h5>
                <div>
                    {playerElement}
                </div>
            </div>
            
            {deletePlayer && <OverlayBox>
                 {!confirmMessage ? (<form onSubmit={handleDelete} >
                    <h5 className="text-logoRed">Are you sure you want to delete this player?</h5>
                    <div className="flex justify-evenly my-4">
                        <button className="bg-gray-400 rounded-lg px-2 py-1" onClick={handleDelete}>Delete</button>
                        <button className="bg-gray-400 rounded-lg px-2 py-1" type="button" onClick={() => setDeletePlayer(null)}>Cancel</button>
                    </div>
                </form>) : (<div className="flex-col">
                    <div className="text-right">
                        <div className="inline-block p-1 justify-self-end" onClick={() => { setDeletePlayer(null); setConfirmMessage("")}}><MdClose /></div>
                    </div>
                    <div className="mt-2 mb-6 text-logoRed">{confirmMessage}</div>
                </div>)}
            </OverlayBox>}     
        </>
    )

}

export default PlayerList;