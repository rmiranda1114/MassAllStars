import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import PlayerCard from './PlayerCard.js';
import WelcomeCoach from "./WelcomeCoach.js";

const Players = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [result, setResult] = useState([]);
    const [playerElement, setPlayerElemement] = useState([]);
    
    const loadPlayers = async ( isMounted, controller ) => {
        try {
            const response = await axiosPrivate.get('/api/search', {
                signal: controller.signal,
            });
            isMounted && setResult(response.data);
            
        } catch (err) {
            if (err.code === 'ERR_CANCELED') {
            return (
                <div>Error.... unable to load players</div>
            )};
        }  
    };

    const handleClick = (e) => {
        const playerId = e.target.id;
        navigate(`./${playerId}`);
    }

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        loadPlayers( isMounted, controller );
        return() => {
            isMounted = false;
            controller.abort();
        }
    },[])

    useEffect (() =>{
        setPlayerElemement(
            result.map(player => { 
                return <PlayerCard key={player._id} player={player} handleClick={handleClick} />
            })
        ) 
    },[result])

    
    return ( 
        <>
            <WelcomeCoach />
            <div className="flex gap-4 flex-wrap justify-center my-8">{playerElement}</div>
        </>
    )
}

export default Players;