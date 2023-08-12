import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import PlayerDetailsCard from "./PlayerDetailsCard.js";

const PlayerDetails = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const { playerId } = useParams();
    const [result, setResult] = useState();

    const loadPlayerDetails = async () => {
        let isMounted = true;
        const controller = new AbortController();
        try {
            const response = await axiosPrivate.post(`/api/searchPlayer/${playerId}`, {
                signal: controller.signal,
                playerId: `${playerId}`
            },);
            isMounted && setResult(response.data);
            return() => {
                isMounted = false;
                controller.abort();
            }
        } catch (err) {
            if (err.code === 'ERR_CANCELED') {
            return (
                <div>Error.... unable to load player</div>
            )};
        }  
    };

    useEffect(() => {
      loadPlayerDetails();
    },[])

    return (
        <div className="my-8 mx-auto max-w-lg flex-col bg-gray-300 p-7 rounded-xl shadow-black shadow-lg text-base font-medium">
            {result ? <PlayerDetailsCard player={result}/> : <div className="text-center">Loading...</div>}
            <button className="w-full p-2 bg-gray-400 rounded-lg" onClick={() => navigate('/players')}>Go Back</button>
        </div>
    )


}

export default PlayerDetails;