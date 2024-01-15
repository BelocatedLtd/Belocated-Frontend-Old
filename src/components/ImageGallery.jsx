import React from 'react'
import { useEffect } from 'react'

const ImageGallery = ({images}) => {

    useEffect(() => {
      console.log(images)
    }, [])
    
  return (
    <div>
        {images?.map((image, index) => (
            <img key={index} src={image?.secure_url} alt={`Image ${index}`} />
        ))}
    </div>
  )
}

export default ImageGallery