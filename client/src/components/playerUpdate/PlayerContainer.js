import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { useState, useEffect } from "react";
import FlexContainer from "../../wraps/FlexContainer.js";
import PlayerList from "./PlayerList.js";

const PlayerContainer = () => {
    const axiosPrivate = useAxiosPrivate();
    const [result, setResult] = useState([]);
    
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
                <div>Error.... unable to load players</div>
            )}
        };
    };
    
    useEffect(() => {
        loadPlayers();
    },[]);

   return (
        <>
            <FlexContainer padding="p-2">
                <PlayerList result={result}/>
            </FlexContainer>
            
                
        </>
    )
}

export default PlayerContainer;