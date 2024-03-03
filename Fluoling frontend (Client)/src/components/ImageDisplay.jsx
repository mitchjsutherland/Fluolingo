import React, { useState, useEffect } from 'react';

const ImageDisplay = ({ imageUrl, size }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    if (imageUrl) {
      const img = new Image();
      img.onload = () => {
        setLoading(false);
      };
      img.onerror = () => {
        setLoading(false);
        setError(true);
      };
      img.src = imageUrl;
    } else {
      setLoading(false);
    }
  }, [imageUrl]);

  if (loading) {
    return <p>Loading image...</p>;
  }

  if (error) {
    return <p>Error: Failed to load image</p>;
  }

  return <img src={imageUrl} alt="GIF" style={{ width: size, height: 'auto' }} />;
};

export default ImageDisplay;
