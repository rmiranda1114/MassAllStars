import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


function Upload () {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [newFile, setNewFile] = React.useState('');
    const [previewImg, setPreviewImg] = React.useState(null);

    const handleNewFile = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewImg(reader.result);
        }
    }

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if(!previewImg) return;
        uploadImage(previewImg);
    }

    const uploadImage = async (base64EncodedImage) => {
        let isMounted = true;
        const controller = new AbortController();
        try{
            const res = axiosPrivate.post('http://localhost:5000/api/upload', {
                signal: controller.signal,
                data: base64EncodedImage
            });
            if (isMounted) {
                navigate('../../success');
            };
        }catch (err) {
            if (err.code === 'ERR_CANCELED') return;
        }
        return() => {
            isMounted = false;
            controller.abort();
        }
    }

    useEffect(() => {
        setPreviewImg(null);
    }, []);
    
    
    return (
        <div className="my-8 mx-auto max-w-lg flex-col bg-gray-300 p-7 rounded-xl shadow-black shadow-lg text-base font-medium">
            <h5 className="text-center underline font-bold mb-8">Add Photo to Gallery</h5>
            <form onSubmit={handleSubmitFile} >
                {!previewImg && <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="file" name="image" onChange={(e) => {handleNewFile(e)}} value={newFile}/>}
                {previewImg && <button className=" w-full bg-gray-400 rounded-lg px-2 py-1 my-4 hover:text-blue-700" type="submit" >Upload Photo</button>}
                {previewImg && <button className=" w-full bg-gray-400 rounded-lg px-2 py-1 my-4 hover:text-blue-700" onClick={() => setPreviewImg(null)}>Cancel</button>}
            </form>
            {previewImg && 
                <div>
                    <img src={previewImg} alt="choosen image" style={{width: '500px'}} />
                </div>
            }
                
        </div>
    )
}

export default Upload;