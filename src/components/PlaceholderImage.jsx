import React, { useEffect, useState } from 'react';

const Shimmer = ({}) => {
  return (
   <img class="bg-gradient-to-r from-gray-300 to-gray-400 h-100 w-100 animate-pulse"></img>
  );
};

const PlaceholderImage = ({ src, alt, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [shimmer, setShimmer] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
      setShimmer(false);
    };
  }, [src]);

  return (
    <>
      {(!imageLoaded || shimmer) &&  <Shimmer className />}
      <img
        className ={className}
        src={imageSrc}
        alt={alt}
        style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
      />
    </>
  );
};

export default PlaceholderImage;