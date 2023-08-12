import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import FlexContainer from "../wraps/FlexContainer.js";
import Button from "../wraps/Button.js";
import Input from "../wraps/Input.js";
import OverlayBox from "../wraps/OverlayBox.js";

const Teams = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [result, setResult] = useState();
    const [addTeam, setAddTeam] = useState("");
    const [deleteTeam, setDeleteTeam] = useState("");

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

    const handleAddTeam = async (e) => {
        e.preventDefault();
        const res = await axiosPrivate.post('/api/createTeam',{
            team: addTeam
        });
        if (res.status == 201) {
            loadTeams();
            setAddTeam("");
        }
    };

    const handleDelete = async(e) => {
        e.preventDefault()
        const res = await axiosPrivate.post('/api/deleteTeam',{
            teamId: deleteTeam
        });
        if (res.status == 200) {
            loadTeams();
            setDeleteTeam("");
        }
    };

    useEffect(() => {
        loadTeams();
    },[])
       

    return (
        <FlexContainer>
            {!result ? <div>No Data Available</div> : 
            <div className="mb-8">
            {result.map((team) => {
                return <div key={team._id} className="flex justify-between items-center">
                    <div className=" text-xl font-medium">{team.name}</div>
                    <div className="flex gap-2">
                        <Button id={team._id} handleClick={(e) => navigate(`./${e.target.id}`)}>Assign</Button>
                        <Button id={team._id} handleClick={(e) => setDeleteTeam(e.target.id)}>Delete</Button>
                    </div>
                </div>
            })}
            </div>}

            <Input id="team" value={addTeam} onChange={(e) => setAddTeam(e.target.value)} placeholder={"New team name"} />
            <Button style={{ width: "w-1/2" }} handleClick={handleAddTeam}>Add Team</Button>

            {deleteTeam && <OverlayBox>
                    <p className="my-4 text-logoRed text-lg">Are you sure you want to delete team?</p>
                    <div className="flex gap-2 justify-center">
                        <Button style={{ width: "w-1/4" }} handleClick={handleDelete}>Yes</Button>
                        <Button style={{ width: "w-1/4" }} handleClick={() => setDeleteTeam("")}>No</Button>
                    </div>
                </OverlayBox>}

        </FlexContainer>
    )
}

export default Teams;