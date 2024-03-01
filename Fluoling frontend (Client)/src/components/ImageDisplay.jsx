import React, { useState, useEffect } from 'react';

const ImageDisplay = () => {
  const [imageUrl, setImageUrl] = useState('');
  const APIkey = 'caailYVBDQ7hpb4Ls9S49MSR0NrCdykg';

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${APIkey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
        const data = await response.json();
        setImageUrl(data.data.image_url);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();

    return () => {
      // Cleanup function (if any)
    };
  }, []);

  return (
    <div>
      {imageUrl && <img src={imageUrl} alt="GIF" />}
    </div>
  );
};

export default ImageDisplay;
