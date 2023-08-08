import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import Update from "./Update";

const PlayerUpdate = () => {
    const axiosPrivate = useAxiosPrivate();
    const { playerId } = useParams();
    const [result, setResult] = useState();

    const findPlayer = async ( isMounted, controller ) => {
        try {
            const response = await axiosPrivate.post(`/api/search/${playerId}`, {
                signal: controller.signal,
                playerId: `${playerId}`
            },);
            isMounted && setResult(response.data);
            
        } catch (err) {
            if (err.code === 'ERR_CANCELED') {
            return (
                <div>Error.... unable to load player</div>
            )};
        }  
    };

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        findPlayer( isMounted, controller );
        return() => {
            isMounted = false;
            controller.abort();
        }
    },[])

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-gray-300 p-10 rounded-xl shadow-black shadow-lg my-8">
            {result ? <Update player={result}/> : <div className="text-center">Loading...</div>}
        </div>  
        
    )

}

export default PlayerUpdate;