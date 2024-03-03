
import React, {useState, useEffect} from 'react';

import { useLocation } from 'react-router';


import App from "../components/MultiChoice";



import { useParams } from 'react-router-dom';


import { Link } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap'; // Import the necessary Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Dashboard.css'; // Import the custom CSS file

import ImageGuessMode from '../imageguessmode';





function Dashboard({user}) {

    const [selectedGame, setSelectedGame] = useState(null);
    const [showMessage, setShowMessage] = useState(true);
    const location = useLocation();
    const { state } = location;
    const userName = state?.userName;
    const [count,setCount] =useState(0);

    const {email} = useParams();

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/users/dashboard', {
          method: 'GET',
          credentials: 'include' // Include cookies in the request
        });

        // if(response.ok){

        

        // }
  

        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = '/users/login'; // User is not authenticated, redirect to login
          } else {
            throw new Error('Failed to fetch user data');
          }
        }
        else{

          const responseData = await response.json(); // Parse the response body as JSON
          const redirectUrl = responseData.redirect; // Access the redirect property
          const userEmail = responseData.userEmail;
          const url = responseData.url;

          console.log(url);
          console.log(userEmail);
          console.log(email);

          const urlSegments = redirectUrl.split('/');

          console.log(urlSegments.length)

          if(email !== userEmail){

          setCount(count+1);  
          window.location.href = redirectUrl;

          }


        }
        
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);

  
    const handleGameSelection = (game) => {
      setSelectedGame(game);
      setShowMessage(false); // Hide the message after game selection
    };

    const handleLogout = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/users/logout', {
          method: 'POST',
          credentials: 'include'
        });
    
        if (!response.ok) {
          throw new Error('Failed to logout');
        }
    
        const responseData = await response.json();
    
        if (responseData.success) {
          // Successful logout, redirect to the home page
          window.location.href = responseData.redirect;
        } else {
          // Handle logout failure
          console.error('Failed to logout');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };



  
    return (
      <div>
        {showMessage && <div><h1>Hello {email}. Welcome to Fluolingo!</h1>
        <p>Select a language game:</p>
        <div>
          <button onClick={() => handleGameSelection('Image Guess')}>Image Guess</button>
          <button onClick={() => handleGameSelection('Game2')}>MultiChoice Quiz</button>
          {/* Add more game selection buttons as needed */}
        </div>
        
        <a href="#" onClick={handleLogout}>Logout</a>

        </div>}
        <div>

          {selectedGame === 'Image Guess' && <ImageGuess />}
          {selectedGame === 'Game2' && <App />}

          {/* Add more game components as needed */}

 

        </div>
      
      
    </div>
  );
}

export default Dashboard;
