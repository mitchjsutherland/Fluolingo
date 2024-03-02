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
  const [activityStarted, setActivityStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds countdown

  useEffect(() => {
    if (activityStarted) {
      const timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft === 0) {
            clearInterval(timer);
            // Handle end of activity (e.g., show results)
          } else {
            return prevTimeLeft - 1;
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [activityStarted]);

  useEffect(() => {
    if (activityStarted) {
      fetchData();
    }
  }, [selectedLanguage, activityStarted]);

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

  const handleAnswerClick = async (selectedAnswer) => {
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    } else {
      setScore(Math.max(0, score - 1));
    }
    fetchData(); // Fetch new question
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleStartActivity = () => {
    setActivityStarted(true);
  };

  return (
    <div className="app-container">
      {!activityStarted ? (
        <button onClick={handleStartActivity}>Start Activity</button>
      ) : (
        <>
          <div className="language-selector">
            <button onClick={() => handleLanguageChange('French')}>French</button>
            <button onClick={() => handleLanguageChange('Czech')}>Czech</button>
            <button onClick={() => handleLanguageChange('Turkish')}>Turkish</button>
          </div>
          <ImageDisplay imageUrl={image} />
          <MultipleChoiceAnswers answers={answers} handleAnswerClick={handleAnswerClick} />
          <div className="score-container">Score: {score}</div>
          <div className="timer-container">Time Left: {timeLeft}</div>
        </>
      )}
    </div>
  );
};

export default App;
