import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ParentInfo = ({ parentId }) => {
    const axiosPrivate = useAxiosPrivate();
    const [result, setResult] = useState();

    const loadParent = async () => {
        let isMounted = true;
        const controller = new AbortController();
        try {
            const response = await axiosPrivate.post(`/api/searchParentId`, {
                parentId: parentId
            },{ signal: controller.signal });
            isMounted && setResult(response.data);
            return() => {
                isMounted = false;
                controller.abort();
            }
        } catch (err) {
            if (err.code === 'ERR_CANCELED') {
            return (
                <div>Error.... unable to load</div>
            )};
        }  
    };
    
    useEffect(() => {
        loadParent();
    }, []);

    return (
        <>
        {!result ? <div>Loading....</div> :    
            <div className="border border-black p-4 mb-4 flex-col">
                <div className="flex justify-between mb-4 text-xl">
                    <h3>Parent</h3>
                </div>

                <div className="flex my-1">
                    <div className="basis-1/3">Parent/Guardian: </div>
                    <div className="basis-2/3 bg-white rounded-md px-2">{result.name}</div>
                </div>
                <div className="flex my-1">
                    <div className="basis-1/3">Address: </div>
                    <div className="basis-2/3 bg-white rounded-md px-2">{result.address.street}</div>
                </div>
                <div className="flex my-1 gap-1">
                    <div className="basis-1/6">State: </div>
                    <div className="basis-1/6 bg-white rounded-md px-2">{result.address.state}</div>
                    <div  className="basis-1/3">Zipcode: </div>
                    <div  className="basis-1/3 bg-white rounded-md px-2">{result.address.zipcode}</div>
                </div>
                <div className="flex my-1">
                    <div className="basis-1/3">Phone: </div>
                    <div className="basis-2/3 bg-white rounded-md px-2">{result.phoneMain}</div>
                </div>
                <div className="flex my-1">
                    <div className="basis-1/3">Alt. Phone: </div>
                    <div className="basis-2/3 bg-white rounded-md px-2">{result.phoneAlt}</div>
                </div>
                
            </div>
        }</>
    )
}

export default ParentInfo;