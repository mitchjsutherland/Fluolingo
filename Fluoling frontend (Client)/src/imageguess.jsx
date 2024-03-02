// External import
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Countdown from 'react-countdown';

// Local import
import './imageguess.css'
//import enWordArr from '../words(en)';


// GIPHY API Key
const APIkey = 'caailYVBDQ7hpb4Ls9S49MSR0NrCdykg';


// Bug notes:
// 'Beer' as a query term has shown a picture of a deer 


function ImageGuess() {

    const [currentWord, setCurrentWord] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [playerControl, setPlayerControl] = useState('hidden');
    const [startButton, setStartButton] = useState('Start');
    const [gameFeedback, setGameFeedback] = useState('');
    const [words, setWords] = useState([]);
    const [gameClock, setGameClock] = useState('hidden');
    const [timer, setTimer] = useState(10); 
    const [userInput, setUserInput] = useState('');


    useEffect(() => {
        
        fetch('http://localhost:4000/api/words/english')
          .then(response => response.json())
          .then(data => {
            setWords(data);
          })
          .catch(error => {
            console.error('Error fetching words:', error);
          });
    }, []);


    const startGame = () => {
        
        setPlayerControl('visible');
        setGameClock('visible');
        setStartButton('Restart');
        setTimer(10);

        showImage();
        startTimer();
        
    };


    const showImage = () => {

        const randomIndex = Math.floor(Math.random() * words.length);
        const randomWord = words[randomIndex];

        // console.log(words);
        console.log(randomWord);

        setCurrentWord(randomWord);

        const queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${randomWord}&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

        fetch(queryURL)

        .then((response) => 
            // return 
            response.json())
        .then((data) => {
        // console.log(data.data[0]['images']['original']['url']);
        setImageURL(data.data[0]['images']['original']['url']);
        });
        
    }


    const startTimer = () => {
        
        const intervalId = setInterval(() => {

            setTimer(prevTimer => {

                if (prevTimer > 0) {
                    return prevTimer - 1

                } else {
                    clearInterval(intervalId);
                    setPlayerControl('hidden');
                    // gameOver();
                }       
            });
        }, 1000);

    };


    const checkWord = (event) => {

        // event.preventDefault();

        const userAnswer = document.getElementById('playerInput').value;
        const newUserAnswer = userAnswer.charAt(0).toUpperCase() + userAnswer.slice(1);

        // console.log(userAnswer);
        // console.log(newUserAnswer);

        if (newUserAnswer === currentWord) {
            setGameFeedback(currentWord + ' is correct!');
            setTimeout(() => {
                // nextQuestion();
                showImage();
                setGameFeedback('');
              }, "2000");
        }   else {
                setGameFeedback('Try again!')
        };

    };


    const handleExit = () => {
        // Refresh the page
        window.location.reload();
    };


    return (

        <div className="gameMain">

            <h1 className="mb-5">Let the games begin...</h1>

            <div id="gameBox">

                <div id="gameClock" className={gameClock}>
                    {/* <Countdown date={Date.now() + 10000} renderer={countDown} /> */}
                    {timer} 
                </div>

                <div id="imageBox" className="mt-5">
                    {imageURL && <img src={imageURL} alt="Giphy" />}
                </div>

                {/* <div id="wordBox">{currentWord}</div> */}

                <div id="guessBox" className="mt-5">

                    <div className="gameFeedback my-5">

                        {gameFeedback}

                    </div>

                    <div id="playerControl" className={playerControl}>

                        <input id="playerInput" type="type" />
                        <button onClick={checkWord} id="answerSubmit">Enter</button>

                    </div>

                </div>
                
            </div>

            <button onClick={startGame} className="mt-5" >{startButton}</button>
            <button onClick={handleExit} className="mt-5">Exit Game</button>
        </div>
    );
}

export default ImageGuess;