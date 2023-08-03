import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser.js"
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";

const Coaches = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [coaches, setCoaches] = useState();
    const [deleteCoach, setDeleteCoach] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        
        const getCoaches = async () => {
            try {
                const response = await axiosPrivate.get('/api/coaches', {
                    signal: controller.signal,
                    headers: {
                        "authorization": user.accesstoken
                    }
                   
                });
                isMounted && setCoaches(response.data);
            } catch (err) {
                if (err.code === 'ERR_CANCELED') return;
                console.log(err);
            }
        }

        getCoaches();

        return() => {
            isMounted = false;
            controller.abort();
        }
    },[])

    const handleClick = (e) => {
        e.preventDefault();
        const id = e.target.id;
        let index = coaches.findIndex(coach => coach._id === id);
        setDeleteCoach(coaches[index]);
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/api/deleteCoach', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                id: deleteCoach._id
            })
            //converts back to Json
        })

        if (res.status === 200){
            navigate('../../success');
            setDeleteCoach(null);
        }
    }

    return (
        <div className="activeUser">
            <h2>Active Coaches</h2>
            {coaches?.length
                ? (
                    <ul>
                        {coaches.map((coach, i) => <li key={i}>{coach?.name}<span> </span><button id={coach._id}
                            onClick={handleClick}>Delete</button></li>)}
                    </ul>
                ) : <p>No coaches to display</p>}
                {deleteCoach ? (<div className="overlay confirmDelete">
                 <form onSubmit={handleDelete} >
                    <h2>Are you sure you want to</h2><h2>delete this player?</h2>
                    <br />
                    <button onClick={handleDelete}>Delete</button><span> </span><button type="button" onClick={() => setDeleteCoach(null)}>Cancel</button>
                </form>
            </div>) : (<div></div>)}
            
        </div>
    )
}

export default Coaches;