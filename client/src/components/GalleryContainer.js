import { Image } from 'cloudinary-react';
import { useState, useEffect } from "react";

function GalleryContainer () {
    const [imageIds, setImageIds] = useState([]);

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

    

    const galleryElement = imageIds.map((item, index) => {
        return <Image key={index} cloudName='ddfwmzehx' id={index} className="w-11/12 h-auto sm:max-w-md" publicID={item} crop="fill" height="600" />
      })

    return (

        <div className="flex flex-wrap justify-center gap-4 mt-8 ">
            {galleryElement}
        </div>
        
    )
}

export default GalleryContainer