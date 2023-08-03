import GalleryModal from './GalleryModal';
import { Image } from 'cloudinary-react';
import { useState, useEffect } from "react";

function GalleryContainer () {
    const [imageIds, setImageIds] = useState([]);
    const [selectedImg, setSelectedImg] = useState();

    const loadImages = async() => {
        try{
            const res = await(await fetch('http://localhost:5000/api/images')).json();
            setImageIds(res);
        }catch (err){
            console.log(err);
        }
    }

    useEffect (() => {
        loadImages();
    }, [])

    function handleClick (e) {
        e.preventDefault();
        setSelectedImg(e.target.id);
    }

    const galleryElement = imageIds.map((item, index) => {
        return <Image key={index} cloudName='ddfwmzehx' id={index} className="galleryIcons"publicID={item} width="500" crop="fill" height="600" onClick={handleClick} />
      })

   
   
    
    return (
        <div className="mainContent">
            <div className="galleryContainer">
                {galleryElement}
            </div>
            {selectedImg && ( <GalleryModal setSelectedImg={setSelectedImg} clicked={imageIds[selectedImg]}  /> )}
        </div>
    )
}

export default GalleryContainer