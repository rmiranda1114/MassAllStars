import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import PlayerCard from './PlayerCard.js';
import PlayerDetailsCard from "./PlayerDetailsCard.js";

function Players () {
    const axiosPrivate = useAxiosPrivate();
    const [result, setResult] = useState([]);
    const [playerElement, setPlayerElemement] = useState([]);
    const [isDetails, setIsDetails] = useState(false);
    const [selectPlayer, setSelectPlayer] = useState({});
    
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
            if (err.code === 'ERR_CANCELED') return;
            console.error(err);
            return (
                <div>Error.... unable to load players</div>
            )
        }  
    };

    useEffect(() => {
        loadPlayers();
    },[])

    useEffect (() =>{
        setPlayerElemement(
            result.map(x => { 
                return <PlayerCard key={x._id} x={x} handleClick={handleClick} />
            })
        ) 
    },[result])

   
    
    function handleClick (e) {
        let index = result.findIndex(player => player._id === e.target.id);
        setSelectPlayer(result[index]);
        setIsDetails(true);
      }

    
    return ( 
        <>
            { isDetails  ? (<div className="my-8 sm:mx-auto max-w-lg flex-col bg-gray-300 p-7 rounded-xl shadow-black shadow-lg text-base font-medium">
                            <PlayerDetailsCard x={selectPlayer} />
                            <button className="w-full p-2 bg-gray-400 rounded-lg my-4" onClick={()=>setIsDetails(false)}>Go Back</button>
                        </div>)
                : ( <div className="flex gap-4 flex-wrap justify-center my-8">{playerElement}</div> )

            }
        </>
    )
}

export default Players;