// fetchImage.js
const APIkey = 'caailYVBDQ7hpb4Ls9S49MSR0NrCdykg';

const fetchImage = async () => {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${APIkey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch image: Network response was not ok');
    }
    const data = await response.json();
    const imageUrl = data.data.image_url;
    return imageUrl;
  } catch (error) {
    console.error('Error fetching image:', error.message);
    return null;
  }
};

export default fetchImage;
