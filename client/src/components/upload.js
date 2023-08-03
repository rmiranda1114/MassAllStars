import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Upload () {
    const navigate = useNavigate();
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
        try{
            const res = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    data: base64EncodedImage
                })
            });
            if (res.status === 200){
                navigate('../../success');
            }

        }catch (err) {
            console.log(err);
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