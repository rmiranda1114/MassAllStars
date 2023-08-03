import { Image } from 'cloudinary-react';


function GalleryModal ({ clicked, rotateRight, rotateLeft, setSelectedImg }) {

    const handleClick = (e) => {
        if (e.target.classList.contains("dismiss")) {
            setSelectedImg(null);

        }
    }
   
    return (
        <div className="overlay dismiss" onClick={handleClick} >
           
            <Image  cloudName='ddfwmzehx' publicID={clicked} width="500" height="400" crop="fill"  />
           
        </div>
    )
}

export default GalleryModal