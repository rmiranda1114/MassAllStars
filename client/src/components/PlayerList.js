import React from "react";
import useUser from "../hooks/useUser.js"
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import { useNavigate } from "react-router-dom";
import Update from "./Update";

function PlayerList () {
    const axiosPrivate = useAxiosPrivate();
    const { user } = useUser();
    const [result, setResult] = React.useState([]);
    const [playerElement, setPlayerElemement] = React.useState([]);
    const [selectPlayer, setSelectPlayer] = React.useState(null);
    const [deletePlayer, setDeletePlayer] = React.useState(null);
    const navigate = useNavigate();

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
            result.map((x, index) => { 
                return <tr key={index}><td>{x._id}</td><td>{x.player.name}</td><td><button id={x._id} onClick={handleUpdate} >Update</button></td>
                        <td><button type="button" id={x._id} onClick={confirmDelete}>Delete</button></td></tr>;
            })
        ) 
    },[result])

    const handleUpdate = (e) => {
        e.preventDefault();
        const id = e.target.id;
        let index = result.findIndex(player => player._id === id);
        setSelectPlayer(result[index]);
    }

    const confirmDelete = (e) => {
        e.preventDefault();
        const id = e.target.id;
        setDeletePlayer(id);
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/api/deletePlayer', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                id: deletePlayer
            })
            //converts back to Json
        })

        console.log(res);
        if (res.status === 200){
            navigate('../players');
            setDeletePlayer(null);
        }
    }


    return (
        <div className="mainContent coachContent">
            {selectPlayer ? (<Update selectPlayer={selectPlayer} setSelectPlayer={setSelectPlayer} />)
                :
                (<table className="playersTable">
                    <thead>
                    <tr><th>Player ID</th><th>Player Name</th></tr>
                    </thead>
                    <tbody>
                        {playerElement}
                    </tbody>
                </table>)
            }
            {deletePlayer ? (<div className="overlay confirmDelete">
                 <form onSubmit={handleDelete} >
                    <h2>Are you sure you want to</h2><h2>delete this player?</h2>
                    <br />
                    <button onClick={handleDelete}>Delete</button><span> </span><button type="button" onClick={() => setDeletePlayer(null)}>Cancel</button>
                </form>
            </div>) : (<div></div>)}     
        </div>
    )

}

export default PlayerList;