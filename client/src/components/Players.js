import React from "react";
import useUser from "../hooks/useUser.js"
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import PlayerCard from './PlayerCard.js';
import PlayerDetailsCard from "./PlayerDetailsCard.js";

function Players () {
    const axiosPrivate = useAxiosPrivate();
    const { user } = useUser();
    const [result, setResult] = React.useState([]);
    const [playerElement, setPlayerElemement] = React.useState([]);
    const [details, setDetails] = React.useState(false);
    const [selectPlayer, setSelectPlayer] = React.useState({});
    
    React.useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        
        const loadPlayers = async () => {
            try {
                const response = await axiosPrivate.get('/api/search', {
                    signal: controller.signal,
                    headers: {
                        "authorization": user.accesstoken
                    }
                   
                });
                isMounted && setResult(response.data);
            } catch (err) {
                if (err.code === 'ERR_CANCELED') return;
                console.error(err);
                return (
                    <div>Error.... unable to load players</div>
                )
            }
        }

        loadPlayers();

        return() => {
            isMounted = false;
            controller.abort();
        }
    },[])

    React.useEffect (() =>{
        setPlayerElemement(
            result.map(x => { 
                return <PlayerCard key={x._id} x={x} handleClick={handleClick} />
            })
        ) 
    },[result])

   
    
    function handleClick (e) {
        let index = result.findIndex(player => player._id === e.target.id);
        setSelectPlayer(result[index]);
        setDetails(true);
      }

    
    return (
        <>
            { details  ? (<div>
                            <PlayerDetailsCard x={selectPlayer} />
                            <button onClick={()=>setDetails(false)}>Go Back</button>
                        </div>)
                : (<div className="mainPlayer">
                
                    <div className="playerCardContainer">{playerElement}</div>
            
                </div>)

            }
           
        </>
        
    )
}

export default Players;