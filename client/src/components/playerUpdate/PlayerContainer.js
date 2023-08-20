import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { useState, useEffect } from "react";
import NoData from "../../wraps/NoData.js";
import PlayerList from "./PlayerList.js";

const PlayerContainer = () => {
    const axiosPrivate = useAxiosPrivate();
    const [result, setResult] = useState();
    
    const loadPlayers = async () => {
        let isMounted = true;
        const controller = new AbortController();
        try {
            const response = await axiosPrivate.get('/api/searchPlayer', {
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
                <div>Error.... unable to load</div>
            )}
        };
    };
    
    useEffect(() => {
        loadPlayers();
    },[]);

   return (
        <>
            {!result ? <NoData /> : <PlayerList result={result} />}
        </>
    )
}

export default PlayerContainer;