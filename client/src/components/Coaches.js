import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import { useNavigate } from "react-router-dom";
import FlexContainer from "../wraps/FlexContainer.js";
import OverlayBox from "../wraps/OverlayBox.js";
import Button from "../wraps/Button.js"

const Coaches = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [result, setResult] = useState([]);
    const [deleteCoach, setDeleteCoach] = useState("");

    const loadCoach = async () => {
        let isMounted = true;
        const controller = new AbortController();
        try {
            const response = await axiosPrivate.get('/api/searchCoach', {
                signal: controller.signal, 
            });
            isMounted && setResult(response.data);
            return() => {
                isMounted = false;
                controller.abort();
            }
        } catch (err) {
            if (err.code === 'ERR_CANCELED') return;
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosPrivate.post('/api/deleteCoach', {
                id: deleteCoach
            })
            if (res.status == 200) {
                loadCoach();
                setDeleteCoach("")
            }
        } catch (err) {
            if (err.code === 'ERR_CANCELED') return;
        }
    };

    useEffect(() => {
        loadCoach();
    },[]);

    return (
        <FlexContainer>
            {!result ? <div>No data available</div> :
                <div>
                    {result.map(({ _id, name }) => <li className="flex justify-between items-center my-4" key={_id} id={_id}><span>{name}</span>
                    <button className="bg-gray-400 rounded-lg p-1" id={_id} onClick={(e) => setDeleteCoach(e.target.id)}>Delete</button></li>)}
                </div>}

                <Button style={{ width: "w-1/2" }} handleClick={() => navigate('./add')}>Add Coach</Button>
                
                {deleteCoach && <OverlayBox>
                    <p className="my-4 text-logoRed text-lg">Are you sure you want to delete coach?</p>
                    <div className="flex gap-2 justify-center">
                        <Button style={{ width: "w-1/4" }} handleClick={handleDelete}>Yes</Button>
                        <Button style={{ width: "w-1/4" }} handleClick={() => setDeleteCoach("")}>No</Button>
                    </div>
                </OverlayBox>}
            </FlexContainer>
    )
}

export default Coaches;