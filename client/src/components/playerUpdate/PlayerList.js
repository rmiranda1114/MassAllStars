import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PlayerList = ({ result }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortedPlayers, setSortedPlayers] = useState();
    const [playerElement, setPlayerElemement] = useState([]);
    

    
    useEffect(() => {
        let sort = result.filter(({ name }) =>
        name.toLowerCase().includes(searchQuery.toLowerCase()));
        setSortedPlayers(sort);
    }, [searchQuery]);

    useEffect (() =>{
        let display = !searchQuery ? result : sortedPlayers
        setPlayerElemement(
                display.map((player, i) => { 
                return <div className="flex justify-between items-center my-2 hover:cursor-pointer hover:text-indigo-300" 
                    key={player._id} id={player._id} onClick={(e) => navigate(`./${e.target.id}`)}>
                    {player.name}
                </div>;
            })
        ) 
    },[result, sortedPlayers])

    return (
        <>
            <div className="p-8">
                <form className="searchBar" >
                    <input className="w-full p-1 rounded-xl my-2 px-4" type="search" placeholder="search..." onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}/>
                </form>
                <h5 className="text-center underline font-bold mb-2"></h5>
                <div className="flex justify-evenly flex-wrap">
                    {playerElement}
                </div>
            </div>
        </>
    )
}

export default PlayerList