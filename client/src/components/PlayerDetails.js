import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "./api/axios";
import useUser from "../hooks/useUser";

function PlayerDetails () {
    // Returns object w key/value pairs
    const { id } = useParams();
    const [x, setX] = useState({});
    const { user } = useUser();   

    async function loadPlayer() {
        try {
            const res = await axios.post('http://localhost:5000/api/searchID',
                JSON.stringify({
                    id: id
                }),
                {
                headers: {
                    "authorization": `Bearer ${user.accesstoken}`,
                    "Content-Type": 'application/json',
                    withCredentials: true
                    }
                });
            setX(res);
        }
        catch (err) {
            return (
                <div>Error.... unable to load players</div>
            )
        }
    }

    useEffect(() => {
        loadPlayer();
    },[id])

    

    return (
        <div className="detailsCard">
            <p>Player Info</p>
            <p>Player's Name: <span>{x.player.name}</span> DOB: <span>{x.player.dob}</span> </p>
                <p>School: <span>{x.player.school}</span> Grade: <span>{x.player.grade}</span> Age: <span>{x.player.age}</span></p>
            <p>Sport: <span>{x.sport}</span> Uniform Size: <span>{x.uniformSize}</span></p>
            <p>Parent: <span>{x.player.parent}</span> Phone Number: <span>{x.player.phone.main}</span></p>
            <hr />
          
        </div>
    )
}

export default PlayerDetails;