import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PlayerInfo from "../playerUpdate/PlayerInfo";
import FlexContainer from "../../wraps/FlexContainer";
import FlexCard from "../../wraps/FlexCard";
import Label from "../../wraps/Label";
import Button from "../../wraps/Button";
import NoData from "../../wraps/NoData";

const TeamDetail = () => {
    const axiosPrivate = useAxiosPrivate();
    const { teamId } = useParams();
    const navigate = useNavigate();
    const [coaches, setCoaches] = useState([]);
    const [team, setTeam] = useState();
    const [isAssign, setIsAssign] = useState(false);
    const [headCoach, setHeadCoach] = useState();
    const [asstCoach, setAsstCoach] = useState();

    const loadTeam = async () => {
        let isMounted = true;
        const controller = new AbortController();
        try{
            const response = await axiosPrivate.post(`/api/searchTeam/${teamId}`, {
                teamId : teamId
            }, { signal: controller.signal });
            isMounted && setTeam(response.data);
            return() => {
                isMounted = false;
                controller.abort();
            };
        } catch (err) {
            if (err.code === 'ERR_CANCELED') {
            return (
                <div>Error.... unable to load</div>
            )};
        }  
    };

    const loadCoachOptions = async () => {
        const response = await axiosPrivate.get('/api/searchCoach', {});
        setCoaches(response.data);
    }

    const coachOptions = coaches.map((coach) => {return <option key={coach._id} value={coach._id}>{coach.name}</option>})

    const handleClick = (e) => {
        e.preventDefault();
        loadCoachOptions();
        setIsAssign(true);
    }

    const handleAssign = async (e) => {
        e.preventDefault();
        const res = await axiosPrivate.post('/api/updateTeam', {
            teamId: teamId,
            headCoach: headCoach,
            asstCoach: asstCoach
        });
        if (res.status === 201) {
            setTeam(res.data);
            setIsAssign(false);
        }
    };

    const removePlayer = async (e) => {
        e.preventDefault();
        const res = await axiosPrivate.post('/api/updateTeam/removePlayer', {
            teamId: teamId,
            playerId: e.target.id
        });
        setTeam(res.data);
    }

    useEffect(() => {
        loadTeam();
    },[]);

    return (
        <>
            {!team ? <NoData /> : <FlexContainer>
                <h2 className="text-center text-xl font-semibold underline">{team.name}</h2>
                {isAssign ? <div>
                    <div>
                        <Label label="Head Coach" id="headCoach" />
                        <select className="w-full p-2 rounded-lg shadow-sm border"
                            id="headCoach" value={headCoach} onChange={(e) => setHeadCoach(e.target.value)} name="headCoach">
                                <option value="">--Choose One--</option>
                                {coachOptions}
                        </select>
                    </div>
                    <div>
                        <Label label="Assistant Coach" id="assistantCoach" />
                        <select className="w-full p-2 rounded-lg shadow-sm border"
                            id="assistantCoach" value={asstCoach} onChange={(e) => setAsstCoach(e.target.value)} name="assistantCoach">
                                <option value="">--Choose One--</option>
                                {coachOptions}
                        </select>
                    </div>
                    <Button handleClick={handleAssign}>Submit</Button>
                    <Button handleClick={() => setIsAssign(false)}>Cancel</Button>
                </div> : <div>
                    <div>
                        <h5 className="block text-sm font-medium">Head Coach</h5>
                        <div className="w-full p-2 rounded-lg shadow-sm border bg-white">
                            {team.headCoach ? team.headCoach.name : "Not Assigned"}
                        </div>
                    </div>
                    <div>
                        <h5 className="block text-sm font-medium">Assistant Coach</h5>
                        <div className="w-full p-2 rounded-lg shadow-sm border bg-white">
                            {team.asstCoach ? team.asstCoach.name : "Not Assigned"}
                        </div>
                    </div>
                    <Button handleClick={handleClick}>Assign</Button>    
                </div>}
            </FlexContainer>}
            {!team ? <NoData /> : <div className="flex flex-wrap justify-center gap-4">
                {team.players.map((player) => { return <FlexCard key={player._id} id={player._id} onClick={(e) => navigate(`../find/${player._id}`)}>
                    <PlayerInfo player={player} />
                    <Button id={player._id} onClick={removePlayer}>Remove</Button>
                </FlexCard> })}
            </div>}
        </>
    )

}

export default TeamDetail;