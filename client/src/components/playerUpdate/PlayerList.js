import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import FlexContainer from "../../wraps/FlexContainer.js";
import FlexCard from "../../wraps/FlexCard.js";
import Button from "../../wraps/Button.js";
import VerifyDelete from "../../wraps/VerifyDelete.js";

const PlayerList = ({ result }) => {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortedPlayers, setSortedPlayers] = useState();
    const [playerElement, setPlayerElemement] = useState([]);
    const [deletePlayer, setDeletePlayer] = useState("");

    const handleDelete = async(e) => {
        e.preventDefault()
        const res = await axiosPrivate.post('/api/deletePlayer',{
            playerId: deletePlayer
        });
        if (res.status == 200) {
            setDeletePlayer("");
            navigate("/")
        }
    };
        
    useEffect(() => {
        let sort = result.filter(({ name }) =>
        name.toLowerCase().includes(searchQuery.toLowerCase()));
        setSortedPlayers(sort);
    }, [searchQuery]);

    useEffect (() =>{
        let display = !searchQuery ? result : sortedPlayers
        setPlayerElemement(
                display.map((player, i) => { 
                return <FlexCard key={player._id}>
                    <div className="flex justify-between items-center">
                        <div className="text-xl font-medium hover:cursor-pointer w-full" id={player._id} onClick={(e) => navigate(`./${e.target.id}`)}>{player.name}</div>
                        <Button width="w-1/4" id={player._id} handleClick={(e) => setDeletePlayer(e.target.id)}>Delete</Button>
                    </div>
                </FlexCard>;
            })
        ) 
    },[result, sortedPlayers])

    return (
        <>
            <FlexContainer>
                <div>
                    <form className="searchBar" >
                        <input className="w-full p-1 rounded-xl my-2 px-4" type="search" placeholder="search..." onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}/>
                    </form>
                </div>
            </FlexContainer>
            <div className="flex justify-center flex-wrap gap-4">
                {playerElement}
            </div>

            {deletePlayer && <VerifyDelete item="player" handleYes={handleDelete} handleNo={() => setDeletePlayer("")}/>}
        </>
    )
}

export default PlayerList;