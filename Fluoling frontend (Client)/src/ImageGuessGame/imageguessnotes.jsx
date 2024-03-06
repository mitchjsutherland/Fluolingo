// // CURRENT CODE --------------------------------------------------------

// // External import
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// // import Countdown from 'react-countdown';

// // Local import
// import './imageguess.css'
// import LetterTile from './lettertiles'; 


// // GIPHY API Key
// const APIkey = 'caailYVBDQ7hpb4Ls9S49MSR0NrCdykg';


// // Bug notes:
// // 'Beer' as a query term has shown a picture of a deer 


// function ImageGuess() {

//     const navigate = useNavigate();

//     const [imageURL, setImageURL] = useState('');
//     const [playerControl, setPlayerControl] = useState('hidden');
//     const [startButton, setStartButton] = useState('Start');
//     const [gameFeedback, setGameFeedback] = useState('');
//     const [words, setWords] = useState([]);
//     const [frenchWords, setFrenchWords] = useState([]);
//     const [czechWords, setCzechWords] = useState([]);
//     const [turkishWords, setTurkishWords] = useState([]);
//     const [gameClock, setGameClock] = useState('hidden');
//     const [timer, setTimer] = useState(60); 
//     const [letterTiles, setLetterTiles] = useState([]);
//     const [gameComment, setGameComment] = useState('');
//     const [gameCommentText, setGameCommentText] = useState('Are you ready?');

//     const [selectedLanguage, setSelectedLanguage] = useState('');
//     const [gameWords, setGameWords] = useState([]);
//     const [currentWord, setCurrentWord] = useState('');
//     const [correctAnswer, setCorrectAnswer] = useState('');

//     const [scoreBoard, setScoreBoard] = useState(0);
//     const [scoreBoardBox, setScoreBoardBox] = useState('hidden');


//     useEffect(() => {
        
//         fetch('http://localhost:4000/api/words/english')
//           .then(response => response.json())
//           .then(data => {
//             setWords(data);
//           })
//           .catch(error => {
//             console.error('Error fetching words:', error);
//           });
//     }, []);

//     useEffect(() => {
        
//         fetch('http://localhost:4000/api/words/french')
//           .then(response => response.json())
//           .then(data => {
//             setFrenchWords(data);
//           })
//           .catch(error => {
//             console.error('Error fetching words:', error);
//           });
//     }, []);

//     useEffect(() => {
        
//         fetch('http://localhost:4000/api/words/czech')
//           .then(response => response.json())
//           .then(data => {
//             setCzechWords(data);
//           })
//           .catch(error => {
//             console.error('Error fetching words:', error);
//           });
//     }, []);

//     useEffect(() => {
        
//         fetch('http://localhost:4000/api/words/turkish')
//           .then(response => response.json())
//           .then(data => {
//             setTurkishWords(data);
//           })
//           .catch(error => {
//             console.error('Error fetching words:', error);
//           });
//     }, []);


//     useEffect(() => {

//         chooseNewWord();

//     }, [gameWords, words]);



//     const chooseNewWord = () => {

//         if (gameWords.length > 0) {

//             const randomIndex = Math.floor(Math.random() * gameWords.length);
//             const currentWord = words[randomIndex];
//             setCurrentWord(currentWord);

//             const correctAnswer = gameWords[randomIndex]; // or the appropriate array
//             setCorrectAnswer(correctAnswer);

//         };

//     };


//     useEffect(() => {

//         if (selectedLanguage === 'french' && frenchWords.length > 0) {
//             setGameWords(frenchWords);
//         } else if (selectedLanguage === 'czech' && czechWords.length > 0) {
//             setGameWords(czechWords);
//         } else if (selectedLanguage === 'turkish' && turkishWords.length > 0) {
//             setGameWords(turkishWords);
//         } else if (selectedLanguage === 'english' && words.length > 0) {
//             setGameWords(words);
//         }
//     }, [selectedLanguage, words, frenchWords, czechWords, turkishWords]);


//     // Game functions ---------------------------------------------*

//     const handleLanguageChange = (language) => {
      
//         setSelectedLanguage(language);

//     };


//     const startGame = () => {
        
//         setPlayerControl('visible');
//         setGameClock('visible');
//         setGameCommentText("Let's Lingo")
//         setStartButton('Restart');
//         setTimer(60);
//         setScoreBoard(0);
//         setScoreBoardBox('hidden');

//         showImage();
//         startTimer();
        
//     };


//     const showImage = () => {

//         console.log(words);
//         console.log(gameWords);
//         console.log(currentWord);
//         console.log(correctAnswer);

//         const queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${currentWord}&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

//         fetch(queryURL)

//         .then((response) => 
//             response.json())
//         .then((data) => {
//         setImageURL(data.data[0]['images']['original']['url']);
//         });

//         createLetterTiles();
        
//     }


//     const startTimer = () => {
        
//         const intervalId = setInterval(() => {

//             setTimer(prevTimer => {

//                 if (prevTimer > 0) {
//                     return prevTimer - 1

//                 } else {
//                     clearInterval(intervalId);
//                     setPlayerControl('hidden');
//                     setGameCommentText("Game Over")
//                     // gameOver();
//                 }       
//             });
//         }, 1000);

//     };


//     const checkWord = () => {

//         // Action for Mitch - Review syntax on line below for verifying input in React
//         const userAnswer = document.getElementById('playerInput').value;
//         const newUserAnswer = userAnswer.charAt(0).toUpperCase() + userAnswer.slice(1);

//         // console.log(newUserAnswer);
//         console.log(correctAnswer);

//         if (newUserAnswer === correctAnswer) {

//             setGameFeedback(correctAnswer + ' is correct!');
//             setScoreBoardBox('visible');
//             setScoreBoard(score => score + 1);

//             const updatedTiles = letterTiles.map(tile => ({...tile, isGuessed: true }));
//             setLetterTiles(updatedTiles);

//             console.log(correctAnswer);

//             setTimeout(() => {
//                 chooseNewWord();
//                 showImage();
//                 setGameFeedback('');
//             }, "2000");

//         }   else {

//             setGameFeedback('Try again!')
//             updateLetterTiles(newUserAnswer);
//         };

//     };


//     const createLetterTiles = () => {

//         // console.log(currentWord);

//         const newTiles = correctAnswer.split('').map((letter, index) => ({

//             id: index,
//             letter,
//             isGuessed: false,

//         }));

//         console.log(newTiles);
//         setLetterTiles(newTiles);
 
//     };


//     const updateLetterTiles = (userAnswer) => {

//         const updatedTiles = letterTiles.map(tile => ({...tile, isGuessed: userAnswer.charAt(tile.id) === tile.letter}));

//         setLetterTiles(updatedTiles);

//     };


//     const handleExit = () => {
        
//         navigate("/image-guess-mode");
//     };


//     return (

//         <div className="gameMain">

//             <img src="../public/flamingo-logo.svg" alt="Fluolingo Logo" className="logo mb-5" />
//             {/* <h1 className="heading">Fluolingo</h1> */}

//             <div className="mb-5">
//                 <h3>Choose your language:</h3>
//                 <button className={`language-button ${selectedLanguage === 'french' ? 'selected' : ''}`} onClick={() => handleLanguageChange('french')}>French</button>
//                 <button className={`language-button ${selectedLanguage === 'czech' ? 'selected' : ''}`} onClick={() => handleLanguageChange('czech')}>Czech</button>
//                 <button className={`language-button ${selectedLanguage === 'turkish' ? 'selected' : ''}`} onClick={() => handleLanguageChange('turkish')}>Turkish</button>
//             </div>


//             <h1 className={gameComment}>{gameCommentText}</h1>


//             <div id="gameBox" className="mt-5">

//                 <div id="gameClock" className={gameClock}>
//                     {/* <Countdown date={Date.now() + 10000} renderer={countDown} /> */}
//                     {timer} 
//                 </div>

//                 <div id="imageBox" className="mt-3">
//                     {imageURL && <img src={imageURL} alt="Giphy" />}
//                 </div>

//                 {/* <div id="wordBox">{currentWord}</div> */}

//                 <div id="letterTiles" className="letterTiles">

//                     {letterTiles.map(({ id, letter, isGuessed }) => (
//                         <LetterTile key={id} letter={isGuessed ? letter : ' '} isGuessed={isGuessed} />
//                     ))}
                    
//                 </div>

//                 <div id="guessBox" className="mt-3">

//                     <div className="gameFeedback my-3">

//                         {gameFeedback}

//                         <div className={scoreBoardBox}>
//                             Lingo Score: {scoreBoard}
//                         </div>


//                     </div>

//                     <div id="playerControl" className={playerControl}>

//                         <input id="playerInput" type="type" />
//                         <button onClick={checkWord} id="answerSubmit">Enter</button>

//                     </div>

//                 </div>
                
//             </div>

//             <button onClick={startGame} className="mt-5 restartButton" >{startButton}</button>
//             <button onClick={handleExit} className="mt-5 exitButton">Exit Game</button>
//         </div>
//     );
// }

// export default ImageGuess;


// // NEW K CODE --------------------------------------------------------

// // External import
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// // import Countdown from 'react-countdown';

// // Local import
// import './imageguess.css'
// import LetterTile from './lettertiles'; 

// //import enWordArr from '../words(en)';


// // GIPHY API Key
// const APIkey = 'caailYVBDQ7hpb4Ls9S49MSR0NrCdykg';


// // Bug notes:
// // 'Beer' as a query term has shown a picture of a deer 


// function ImageGuess() {

//     const navigate = useNavigate();
//     const [currentWord, setCurrentWord] = useState('');
//     const [imageURL, setImageURL] = useState('');
//     const [playerControl, setPlayerControl] = useState('hidden');
//     const [startButton, setStartButton] = useState('Start');
//     const [gameFeedback, setGameFeedback] = useState('');
//     const [words, setWords] = useState([]);
//     const [czechWords, setCzechWords] = useState([]);
//     const [gameClock, setGameClock] = useState('hidden');
//     const [timer, setTimer] = useState(20); 
//     const [letterTiles, setLetterTiles] = useState([]);
//     const [gameComment, setGameComment] = useState('');
//     const [gameCommentText, setGameCommentText] = useState('Are you ready?');
//     const [selectedLanguage, setSelectedLanguage] = useState('');

//     // let tiles = [];
//     const [scoreBoard, setScoreBoard] = useState(0);
//     const [scoreBoardBox, setScoreBoardBox] = useState('hidden');




//     const [currentIndex, setCurrentIndex] = useState(0);

//     const chooseNewWord = (wordBank) => {
//         const randomIndex = Math.floor(Math.random() * wordBank.length);
//         console.log("Words length: ", wordBank.length);
//         console.log("Index: ", randomIndex);
//         setCurrentIndex(randomIndex);
//         const randomWord = wordBank[randomIndex];
//         console.log("Word: ", randomWord);
//         setCurrentWord(randomWord);
//         return randomWord;
//     }

//     useEffect(() => {
        
//         fetch('http://localhost:4000/api/words/english')
//           .then(response => response.json())
//           .then(data => {
//             setWords(data);
//             chooseNewWord(data);
//           })
//           .catch(error => {
//             console.error('Error fetching words:', error);
//           });
//     }, []);

//     // useEffect(() => {
        
//     //     fetch('http://localhost:4000/api/words/czech')
//     //       .then(response => response.json())
//     //       .then(data => {
//     //         setCzechWords(data); //czechWords
//     //       })
//     //       .catch(error => {
//     //         console.error('Error fetching words:', error);
//     //       });
//     // }, []);

//     // useEffect(() => {
        
//     //     fetch('http://localhost:4000/api/words/french')
//     //       .then(response => response.json())
//     //       .then(data => {
//     //         console.log(data);
//     //       })
//     //       .catch(error => {
//     //         console.error('Error fetching words:', error);
//     //       });
//     // }, []);

//     // useEffect(() => {
        
//     //     fetch('http://localhost:4000/api/words/turkish')
//     //       .then(response => response.json())
//     //       .then(data => {
//     //         console.log(data);
//     //       })
//     //       .catch(error => {
//     //         console.error('Error fetching words:', error);
//     //       });
//     // }, []);



//     // Game functions ---------------------------------------------*

//     const handleLanguageChange = (language) => {
      
//         setSelectedLanguage(language);
//     };


//     const startGame = () => {
        
//         setPlayerControl('visible');
//         setGameClock('visible');
//         setGameCommentText("Let's Lingo")
//         setStartButton('Restart');
//         setTimer(20);
//         setScoreBoard(0);
//         setScoreBoardBox('hidden');

//         showImage(currentWord);
//         startTimer();
        
//     };


//     const showImage = (imageWord) => {

//         // console.log(words);
//         console.log(imageWord);

//         const queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${imageWord}&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

//         fetch(queryURL)

//         .then((response) => 
//             // return 
//             response.json())
//         .then((data) => {
//             // console.log(data.data[0]['images']['original']['url']);
//             setImageURL(data.data[0]['images']['original']['url']);
//         });

//         createLetterTiles();
        
//     }


//     const startTimer = () => {
        
//         const intervalId = setInterval(() => {

//             setTimer(prevTimer => {

//                 if (prevTimer > 0) {
//                     return prevTimer - 1

//                 } else {
//                     clearInterval(intervalId);
//                     setPlayerControl('hidden');
//                     setGameCommentText("Game Over")
//                     // gameOver();
//                 }       
//             });
//         }, 1000);

//     };


//     const checkWord = (event) => {

//         // event.preventDefault();

//         const userAnswer = document.getElementById('playerInput').value;
//         const newUserAnswer = userAnswer.charAt(0).toUpperCase() + userAnswer.slice(1);

//         // console.log(userAnswer);
//         // console.log(newUserAnswer);

//         if (newUserAnswer === currentWord) {

//             setGameFeedback(currentWord + ' is correct!');
//             setScoreBoardBox('visible');
//             setScoreBoard(score => score + 1);

//             const updatedTiles = letterTiles.map(tile => ({...tile, isGuessed: true }));
//             setLetterTiles(updatedTiles);

//             const newWord = chooseNewWord(words);
//             showImage(newWord);

//             setTimeout(() => {
//                 // nextQuestion();
//                 setGameFeedback('');
//             }, "2000");

//         }   else {

//             setGameFeedback('Try again!')
//             updateLetterTiles(newUserAnswer);
//         }

//     };


//     const createLetterTiles = () => {

//         // console.log(randomWord);

//         const newTiles = currentWord.split('').map((letter, index) => ({

//             id: index,
//             letter,
//             isGuessed: false,

//         }));

//         console.log(newTiles);
//         setLetterTiles(newTiles);

//         // tiles.forEach(tile => {
//         //     console.log(tile.letter)
//         // });

//         // setLetterTiles(tiles);
 
//     };


//     const updateLetterTiles = (userAnswer) => {

//         const updatedTiles = letterTiles.map(tile => ({...tile, isGuessed: userAnswer.charAt(tile.id) === tile.letter}));

//         setLetterTiles(updatedTiles);

//     };


//     const handleExit = () => {
        
//         navigate("/image-guess-mode");
//     };


//     return (

//         <div className="gameMain">

//             <img src="../public/flamingo-logo.svg" alt="Fluolingo Logo" className="logo mb-5" />
//             {/* <h1 className="heading">Fluolingo</h1> */}

//             <div className="mb-5">
//                 <h3>Choose your language:</h3>
//                 <button className={`language-button ${selectedLanguage === 'english' ? 'selected' : ''}`} onClick={() => handleLanguageChange('english')}>English</button>
//                 <button className={`language-button ${selectedLanguage === 'french' ? 'selected' : ''}`} onClick={() => handleLanguageChange('french')}>French</button>
//                 <button className={`language-button ${selectedLanguage === 'czech' ? 'selected' : ''}`} onClick={() => handleLanguageChange('czech')}>Czech</button>
//                 <button className={`language-button ${selectedLanguage === 'turkish' ? 'selected' : ''}`} onClick={() => handleLanguageChange('turkish')}>Turkish</button>
//             </div>


//             <h1 className={gameComment}>{gameCommentText}</h1>


//             <div id="gameBox" className="mt-5">

//                 <div id="gameClock" className={gameClock}>
//                     {/* <Countdown date={Date.now() + 10000} renderer={countDown} /> */}
//                     {timer} 
//                 </div>

//                 <div id="imageBox" className="mt-3">
//                     {imageURL && <img src={imageURL} alt="Giphy" />}
//                 </div>

//                 {/* <div id="wordBox">{currentWord}</div> */}

//                 <div id="letterTiles" className="letterTiles">

//                     {letterTiles.map(({ id, letter, isGuessed }) => (
//                         <LetterTile key={id} letter={isGuessed ? letter : ' '} isGuessed={isGuessed} />
//                     ))}
                    
//                 </div>

//                 <div id="guessBox" className="mt-3">

//                     <div className="gameFeedback my-3">

//                         {gameFeedback}

//                         <div className={scoreBoardBox}>
//                             Lingo Score: {scoreBoard}
//                         </div>


//                     </div>

//                     <div id="playerControl" className={playerControl}>

//                         <input id="playerInput" type="type" />
//                         <button onClick={checkWord} id="answerSubmit">Enter</button>

//                     </div>

//                 </div>
                
//             </div>

//             <button onClick={startGame} className="mt-5 restartButton" >{startButton}</button>
//             <button onClick={handleExit} className="mt-5 exitButton">Exit Game</button>
//         </div>
//     );
// }

// export default ImageGuess;