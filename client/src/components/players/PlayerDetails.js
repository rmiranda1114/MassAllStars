import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import PlayerDetailsCard from "./PlayerDetailsCard.js";
import FlexContainer from "../../wraps/FlexContainer.js";
import Button from "../../wraps/Button.js";

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
                playerId: `${playerId}`
            },{signal: controller.signal});
            isMounted && setResult(response.data);
            return() => {
                isMounted = false;
                controller.abort();
            }
        } catch (err) {
            if (err.code === 'ERR_CANCELED') {
            return (
                <div>Error.... unable to load</div>
            )};
        }  
    };

    useEffect(() => {
      loadPlayerDetails();
    },[])

    return (
        <FlexContainer>
            {result ? <PlayerDetailsCard player={result}/> : <div className="text-center">Loading...</div>}
            <Button handleClick={() => navigate('/players')}>Go Back</Button>
        </FlexContainer>
    )


}

export default PlayerDetails;