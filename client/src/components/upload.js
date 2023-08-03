import React from "react";
import { useNavigate } from "react-router-dom";

function Upload () {
    const navigate = useNavigate();
    const [newFile, setNewFile] = React.useState('');
    const [previewImg, setPreviewImg] = React.useState();


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
    
    
    return (
        <div>
            <form onSubmit={handleSubmitFile} >
                <input className="form-input" type="file" name="image" onChange={handleNewFile} value={newFile}/>
                <br />
                <button className="btn" type="submit" >Upload New Photo</button>
            </form>
            {previewImg && 
                <div>
                    <img src={previewImg} alt="choosen image" style={{width: '1000px'}} />
                </div>
            }
                
        </div>
    )
}

export default Upload;