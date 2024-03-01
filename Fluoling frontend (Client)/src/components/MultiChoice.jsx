import React, { useState, useEffect } from 'react';
import ImageDisplay from './ImageDisplay';
import MultipleChoiceAnswers from './MultipleChoiceAnswers';
import fetchQuestions from './fetchAnswers';

// Import your API key from a secure location
const APIkey = 'caailYVBDQ7hpb4Ls9S49MSR0NrCdykg';

const App = () => {
  const [image, setImage] = useState('');
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('French'); // Default language

  useEffect(() => {


  const fetchImage = async () => {
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${APIkey}`);
      const data = await response.json();
      const imageUrl = data.data.image_url;
      setImage(imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error.message);
      // Handle error gracefully, e.g., display a placeholder image
    }
  };

  const fetchAnswers = async (language) => {
    try {
      // Fetch answers from your vocabulary database based on the selected language
      // const response = await fetch(`YOUR_BACKEND_ENDPOINT/${language}`);
      const fetchedAnswers = await fetchQuestions();
      console.log (fetchedAnswers) 
      if (fetchedAnswers.length > 0) {
        const selectedQuestion = fetchedAnswers[Math.floor(Math.random() * fetchedAnswers.length)];
        setAnswers([...selectedQuestion.incorrect_answers[language], selectedQuestion.correct_answer[language]]);
        setCorrectAnswer(selectedQuestion.correct_answer[language]);
      } else {
        console.error('No answers found for the selected language:', language);
      }
    } catch (error) {
      console.error('Error fetching answers:', error);
      // Handle error gracefully, e.g., display a message to the user
    }
  };

    fetchImage();
    fetchAnswers(selectedLanguage.toLowerCase());
  }, [selectedLanguage]);

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    } else {
      setScore(Math.max(0, score - 1));
    }
    fetchImage();
    fetchAnswers(selectedLanguage);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div className="app-container">
      <div className="language-selector">
        <button onClick={() => handleLanguageChange('French')}>French</button>
        <button onClick={() => handleLanguageChange('Czech')}>Czech</button>
        <button onClick={() => handleLanguageChange('Turkish')}>Turkish</button>
      </div>
      <ImageDisplay imageUrl={image} />
      <MultipleChoiceAnswers answers={answers} handleAnswerClick={handleAnswerClick} />
      <div className="score-container">Score: {score}</div>
    </div>
  );
};

export default App;
