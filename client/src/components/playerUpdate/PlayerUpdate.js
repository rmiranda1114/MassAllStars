import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import PlayerInfo from "./PlayerInfo";
import ParentInfo from "./ParentInfo";
import EmergencyInfo from "./EmergencyInfo";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs"
import { useEffect, useState } from "react";
import FlexContainer from "../../wraps/FlexContainer";
import Button from "../../wraps/Button";
import Label from "../../wraps/Label";
import Input from "../../wraps/Input";

const PlayerUpdate = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const { playerId } = useParams();
    const [isMore, setIsMore] = useState(false);
    const [isAssign, setIsAssign] = useState(false);
    const [result, setResult] = useState([]);
    const [player, setPlayer] = useState();
    const [formData, setFormData] = useState({
        team: "", number: null
    })
    const teamOptions = result.map((team, i) => {
        return <option key={team._id} value={i}>{team.name}</option>
    });

    const loadPlayer = async () => {
        let isMounted = true;
        const controller = new AbortController();
        try{
            const response = await axiosPrivate.post('/api/searchPlayerId', {
                signal: controller.signal,
                playerId: playerId
            });
            isMounted && setPlayer(response.data);
            return() => {
                isMounted = false;
                controller.abort();
            };
        } catch (err) {
            if (err.code === 'ERR_CANCELED') {
            return (
                <div>Error.... unable to load teams</div>
            )};
        }  
    };

    const loadTeams = async () => {
        let isMounted = true;
        const controller = new AbortController();
        try{
            const response = await axiosPrivate.get('/api/searchTeam', {
                signal: controller.signal,
            });
            isMounted && setResult(response.data);
            return() => {
                isMounted = false;
                controller.abort();
            };
        } catch (err) {
            if (err.code === 'ERR_CANCELED') {
            return (
                <div>Error.... unable to load teams</div>
            )};
        }  
    };

    const handleClick = async (e) => {
        e.preventDefault();
        loadTeams();
        setIsAssign(true);
    }

   const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axiosPrivate.post('/api/updatePlayer', {
            playerId: player._id,
            team: result[formData.team],
            number: formData.number
        });
        if (res.status == 201) {
            setIsAssign(false);
            navigate('../find')
        }
   };

   useEffect(() => {
    loadPlayer();
   },[]);


    return (
        <FlexContainer>
            {player && <div className="border border-black p-4 mb-4 flex-col">
                <PlayerInfo player={player}/>
                <div className="flex-col mt-8 mb-1 gap-1" onClick={(e) => navigate(`../teams/${player.teamId}`)}>
                    <div>
                        <div className="basis-1/6">Team: </div>
                        <div className="basis-1/3 bg-white rounded-md px-2">{player.team}</div>
                    </div>
                    <div>
                        <div className="basis-1/3">Number: </div>
                        <div className="basis-1/6 bg-white rounded-md px-2">{player.playerNumber}</div>
                    </div>
                </div>
                {isAssign && <div>
                    <div className="flex justify-evenly">
                        <div className="basis-2/3">
                            <Label label="Team" id="team" />
                            <select className="w-full p-2 rounded-lg shadow-sm border"
                                id="team" value={formData.team} onChange={(e) => setFormData((prev) => { return { ...prev, team: e.target.value }})} name="team">
                                    <option value="">--Choose One--</option>
                                    {teamOptions}
                            </select>
                        </div>
                        <div className="basis-1/5">
                            <Input label="Number"value={formData.number} id="number" onChange={(e) => setFormData((prev) => { return { ...prev, number: e.target.value }})} />
                        </div>
                    </div>
                    <Button handleClick={(e) => handleSubmit(e)}>Submit</Button>    
                    </div>}
                {!isAssign && <Button handleClick={handleClick}>Assign Team</Button>}
            </div>}
            {!isMore && <div className="text-center hover:cursor-pointer" onClick={() => setIsMore(true)}>
                <div className="flex justify-center text-xl">
                    <BsChevronCompactDown />
                </div>
            </div>}
            {isMore && <div>
                <ParentInfo parentId={player.parent}/>
                <EmergencyInfo emergencyId={player.emergency}/>
                <div className="text-center hover:cursor-pointer" onClick={() => setIsMore(false)}>
                <div className="flex justify-center text-xl">
                    <BsChevronCompactUp />
                </div>
            </div>
            </div>}
        </FlexContainer>
    )
}

export default PlayerUpdate;