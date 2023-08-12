import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FiEdit, FiTrash } from "react-icons/fi";

const EmergencyInfo = ({ emergencyId }) => {
    const axiosPrivate = useAxiosPrivate();
    const [result, setResult] = useState();

    const loadEmergency = async () => {
        let isMounted = true;
        const controller = new AbortController();
        try {
            const response = await axiosPrivate.post(`/api/searchEmergencyId`, {
                signal: controller.signal,
                emergencyId: emergencyId
            },);
            isMounted && setResult(response.data);
            return() => {
                isMounted = false;
                controller.abort();
            }
        } catch (err) {
            if (err.code === 'ERR_CANCELED') {
            return (
                <div>Error.... unable to load parent</div>
            )};
        }  
    };
    
    useEffect(() => {
        loadEmergency();
    }, []);

    return (
        <>
        {!result ? <div>Loading....</div> :    
            <div className="border border-black p-4 mb-4 flex-col">
                <div className="flex justify-between mb-4 text-xl">
                    <h3>Emergency Contact</h3>
                </div>

                <div className="flex my-1">
                    <div className="basis-1/3">Parent/Guardian: </div>
                    <div className="basis-2/3 bg-white rounded-md px-2">{result[0].name}</div>
                </div>
                <div className="flex my-1">
                    <div className="basis-1/3">Relationship: </div>
                    <div className="basis-2/3 bg-white rounded-md px-2">{result[0].relationship}</div>
                </div>
                <div className="flex my-1">
                    <div className="basis-1/3">Address: </div>
                    <div className="basis-2/3 bg-white rounded-md px-2">{result[0].address.street}</div>
                </div>
                <div className="flex my-1 gap-1">
                    <div className="basis-1/6">State: </div>
                    <div className="basis-1/6 bg-white rounded-md px-2">{result[0].address.state}</div>
                    <div  className="basis-1/3">Zipcode: </div>
                    <div  className="basis-1/3 bg-white rounded-md px-2">{result[0].address.zipcode}</div>
                </div>
                <div className="flex my-1">
                    <div className="basis-1/3">Phone Number: </div>
                    <div className="basis-2/3 bg-white rounded-md px-2">{result[0].phoneMain}</div>
                </div>
                <div className="flex my-1">
                    <div className="basis-1/3">Alt. Number: </div>
                    <div className="basis-2/3 bg-white rounded-md px-2">{result[0].phoneAlt}</div>
                </div>
                
            </div>
        }</>
    )

}

export default EmergencyInfo;