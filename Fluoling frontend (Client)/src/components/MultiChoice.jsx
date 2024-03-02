import React, { useState, useEffect } from 'react';
import ImageDisplay from './ImageDisplay';
import MultipleChoiceAnswers from './MultipleChoiceAnswers';
import fetchQuestions from './fetchAnswers';
import fetchImage from './fetchImage';

const APIkey = 'caailYVBDQ7hpb4Ls9S49MSR0NrCdykg';

const App = () => {
  const [image, setImage] = useState('');
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('French');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imageUrl = await fetchImage();
        setImage(imageUrl);

        const fetchedAnswers = await fetchQuestions();
        if (fetchedAnswers.length > 0) {
          const selectedQuestion = fetchedAnswers[Math.floor(Math.random() * fetchedAnswers.length)];
          setAnswers([...selectedQuestion.incorrect_answers[selectedLanguage.toLowerCase()], selectedQuestion.correct_answer[selectedLanguage.toLowerCase()]]);
          setCorrectAnswer(selectedQuestion.correct_answer[selectedLanguage.toLowerCase()]);
        } else {
          console.error('No answers found for the selected language:', selectedLanguage.toLowerCase());
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [selectedLanguage]);
 
  const handleAnswerClick = async (selectedAnswer) => {
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    } else {
      setScore(Math.max(0, score - 1));
    }
  
    try {
      const fetchedAnswers = await fetchQuestions();
      if (fetchedAnswers.length > 0) {
        const selectedQuestion = fetchedAnswers[Math.floor(Math.random() * fetchedAnswers.length)];
        setAnswers([...selectedQuestion.incorrect_answers[selectedLanguage.toLowerCase()], selectedQuestion.correct_answer[selectedLanguage.toLowerCase()]]);
        setCorrectAnswer(selectedQuestion.correct_answer[selectedLanguage.toLowerCase()]);
      } else {
        console.error('No answers found for the selected language:', selectedLanguage.toLowerCase());
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
