import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import FlexContainer from "../wraps/FlexContainer";
import Label from "../wraps/Label";
import Button from "../wraps/Button";

const TeamDetail = () => {
    const axiosPrivate = useAxiosPrivate();
    const { teamId } = useParams();
    const [coaches, setCoaches] = useState([]);
    const [team, setTeam] = useState({});
    const [isAssign, setIsAssign] = useState(false);
    const [headCoach, setHeadCoach] = useState();
    const [asstCoach, setAsstCoach] = useState();

    const loadPage = async () => {
        let isMounted = true;
        const controller = new AbortController();
        try{
            const response = await axiosPrivate.get('/api/searchCoach', {
                signal: controller.signal,
            });
            isMounted && setCoaches(response.data);
            const res = await axiosPrivate.post(`/api/searchTeam/${teamId}`, {
                signal: controller.signal,
                teamId : teamId
            });
            isMounted && setTeam(res.data);
            return() => {
                isMounted = false;
                controller.abort();
            };
        } catch (err) {
            if (err.code === 'ERR_CANCELED') {
            return (
                <div>Error.... unable to load coaches</div>
            )};
        }  
    };

    const coachOptions = coaches.map((coach) => {return <option key={coach._id} value={coach._id}>{coach.name}</option>})

   
    const handleAssign = async (e) => {
        e.preventDefault();
        const res = await axiosPrivate.post('/api/updateTeam', {
            teamId: teamId,
            headCoach: headCoach,
            asstCoach: asstCoach
        });
        if (res.status == 201) {
            setTeam(res.data);
            setIsAssign(false);
        }
    };

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <FlexContainer>
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
                <Button style={{ width: "w-1/2" }} handleClick={handleAssign}>Submit</Button>
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
                <Button style={{ width: "w-1/2" }} handleClick={() => setIsAssign(true)}>Assign</Button>    
            </div>}
        </FlexContainer>
    )

}

export default TeamDetail;