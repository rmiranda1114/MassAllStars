import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import FlexContainer from "../../wraps/FlexContainer.js";
import FlexCard from "../../wraps/FlexCard.js";
import Button from "../../wraps/Button.js";
import Input from "../../wraps/Input.js";
import VerifyDelete from "../../wraps/VerifyDelete.js";
import { BsTrash3 } from "react-icons/bs"
import NoData from "../../wraps/NoData.js";

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
        <div>
            <FlexContainer>
                <Input id="team" value={addTeam} onChange={(e) => setAddTeam(e.target.value)} placeholder={"New team name"} />
                <Button style={{ width: "w-1/2" }} handleClick={handleAddTeam}>Add Team</Button>
            </FlexContainer>

            {!result ? <NoData /> : 
            <div className="flex justify-center flex-wrap gap-4">
            {result.map((team) => {
                return <FlexCard key={team._id} id={team._id}>
                    <div className="flex justify-between items-center">
                        <div className="text-xl font-medium hover:cursor-pointer w-full" id={team._id} onClick={(e) => navigate(`./${e.target.id}`)}>{team.name}</div>
                        <Button id={team._id} width="w-1/4" handleClick={(e) => setDeleteTeam(e.target.id)} >Delete</Button>
                    </div>
                </FlexCard>
            })}
            
            </div>}

            {deleteTeam && <VerifyDelete item="team" handleYes={handleDelete} handleNo={() => setDeleteTeam("")}/>}
                    
        </div>
    )
}

export default Teams;