/* MultiChoice.jsx */
import React, { useState, useEffect } from 'react';
import ImageDisplay from './ImageDisplay';
import MultipleChoiceAnswers from './MultipleChoiceAnswers';
//import fetchQuestions from './fetchAnswers';
import fetchImage from './fetchImage';
import './MultiChoice.css';

const languageFlags = {
  French: '🇫🇷',
  Czech: '🇨🇿',
  Turkish: '🇹🇷'
};

const APIkey = 'g6UXY6FAX2jvOSVhDEvO4HSHmZCyZ3XQ';

const App = () => {
  const [image, setImage] = useState('');
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('French');
  const [activityStarted, setActivityStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [message, setMessage] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [words, setWords] = useState([]);

   
    
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/words/`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setWords(data);
        } catch (error) {
          console.error('Error fetching words:', error);
        }
      };
  
      fetchData();
    }, []);
  
    
  

  useEffect(() => {
    if (activityStarted) {
      const timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft === 0 || (difficulty === 'Beginner' && score >= 30) || (difficulty === 'Learner' && score >= 65) || (difficulty === 'Expert' && score >= 100)) {
            clearInterval(timer);
            if (difficulty === 'Beginner' && score >= 30) {
              setMessage('You won!');
            } else if (difficulty === 'Learner' && score >= 65) {
              setMessage('You won!');
            } else if (difficulty === 'Expert' && score >= 100) {
              setMessage('You won!');
            } else {
              setMessage('Time\'s up!');
              if (score < 30 && difficulty === 'Beginner') {
                setMessage('You lose! Your final score: ' + score);
              } else if (score < 65 && difficulty === 'Learner') {
                setMessage('You lose! Your final score: ' + score);
              } else if (score < 100 && difficulty === 'Expert') {
                setMessage('You lose! Your final score: ' + score);
              }
            }
          } else {
            if (prevTimeLeft === 45) { // Adjusted condition to trigger at 45 seconds
              setMessage('Halfway, hurry!');
              setTimeout(() => {
                setMessage('');
              }, 2000); // Clear the message after 2 seconds
            }
            return prevTimeLeft - 1;
          }
        });
      }, 1000);
  
      return () => clearInterval(timer);
    }
  }, [activityStarted, score, difficulty]);
  
  useEffect(() => {
    if (activityStarted) {
      fetchData();
    }
  }, [selectedLanguage, activityStarted]);

 

  const fetchData = async () => {
    try {
      const fetchedQuestions = words;
      if (fetchedQuestions.length > 0) {
        const selectedQuestion = fetchedQuestions[Math.floor(Math.random() * fetchedQuestions.length)];
        const imageUrl = await fetchImage(selectedQuestion.english_search_term);
        setImage(imageUrl);

        const allAnswers = [...selectedQuestion.incorrect_answers[selectedLanguage.toLowerCase()], selectedQuestion.correct_answer[selectedLanguage.toLowerCase()]];
        setAnswers(shuffleArray(allAnswers));
        setCorrectAnswer(selectedQuestion.correct_answer[selectedLanguage.toLowerCase()]);
      } else {
        console.error('No questions found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAnswerClick = async (selectedAnswer) => {
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
      setMessage('CORRECT! +1 POINT');
    } else {
      setScore(Math.max(0, score - 1));
      setMessage('INCORRECT! -1 POINT');
    }

    // Clear the message after a delay
    setTimeout(() => {
      setMessage('');
    }, 1000);

    fetchData(); // Fetch new question
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleStartActivity = (difficulty) => {
    setActivityStarted(true);
    setDifficulty(difficulty);
  };

  const handleRestartGame = () => {
    setScore(0);
    setTimeLeft(90);
    setMessage('');
  };

  const handleExitGame = () => {
    setActivityStarted(false);
    setScore(0);
    setTimeLeft(90);
    setMessage('');
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <div className="app-container">
      <div>
        <img src="../public/flamingo-logo.svg" alt="Fluolingo Logo" className="logo" />
        <h1 className="heading">Fluolingo</h1>
      </div>
      <div className="language-selector">
        <button className={`language-button ${selectedLanguage === 'French' ? 'selected' : ''}`} onClick={() => handleLanguageChange('French')}>French</button>
        <button className={`language-button ${selectedLanguage === 'Czech' ? 'selected' : ''}`} onClick={() => handleLanguageChange('Czech')}>Czech</button>
        <button className={`language-button ${selectedLanguage === 'Turkish' ? 'selected' : ''}`} onClick={() => handleLanguageChange('Turkish')}>Turkish</button>
      </div>
      <div className="difficulty-selector">
        <button className={`difficulty-button Beginner ${difficulty === 'Beginner' ? 'selected' : ''}`} onClick={() => handleStartActivity('Beginner')} title="Score 30 in 90 seconds.">Beginner</button>
        <button className={`difficulty-button Learner ${difficulty === 'Learner' ? 'selected' : ''}`} onClick={() => handleStartActivity('Learner')} title="Score 65 in 90 seconds.">Learner</button>
        <button className={`difficulty-button expert ${difficulty === 'Expert' ? 'selected' : ''}`} onClick={() => handleStartActivity('Expert')} title="Score 100 in 90 seconds.">Expert</button>
      </div>
      {activityStarted && (
  <div className="flag-display">
    {languageFlags[selectedLanguage]} 
    <span>{difficulty === 'Beginner' ? '🐥' : difficulty === 'Learner' ? '🦜' : '🦩'}</span> {/* Display difficulty symbol */}
  </div>
)}
      {!activityStarted ? null : (
        <>
          {message === 'You won!' || message.startsWith('You lose!') ? (
            <>
              <h2>{message}</h2>
              {message.startsWith('You lose!') && (
                <p>Better luck next time: {score}/{difficulty === 'Beginner' ? 30 : difficulty === 'Learner' ? 65 : 100}</p>
              )}
              {message === 'You won!' && (
                <p>Congratulations! You scored: {score}/{difficulty === 'Beginner' ? 30 : difficulty === 'Learner' ? 65 : 100}</p>
              )}
              <button onClick={handleRestartGame}>Restart Game</button>
              <button onClick={handleExitGame}>Exit Game</button>
            </>
          ) : (
            <>
              <ImageDisplay imageUrl={image} size="800px" />
              <MultipleChoiceAnswers answers={answers} handleAnswerClick={handleAnswerClick} />
              <div className="score-container">
              Score: {score} / {difficulty === 'Beginner' ? 30 : difficulty === 'Learner' ? 65 : 100}
              </div>
              <div className="timer-container">Time Left: {timeLeft <= 10 ? <span className="hot-pink">{timeLeft}</span> : timeLeft}</div>
              <div className="message-container">{message}</div>
              <button onClick={handleRestartGame}>Restart Game</button>
              <button onClick={handleExitGame}>Exit Game</button>
            </>
          )}
        </>
      )}
    </div>
  );
  
};

export default App;
