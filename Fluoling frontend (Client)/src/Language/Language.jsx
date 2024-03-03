import React from 'react';
import { Card, Form, Button } from 'react-bootstrap'; // Import the necessary Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Language.css'; // Import the custom CSS file
import { FaFlag } from 'react-icons/fa'; // Import the flag icons from react-icons library

function Language({ user }) {
  return (
    <div>
      <div>
        <h1>Hello {user},</h1>
        <h1>Welcome to Fluolingo!</h1>
        <p>Select a language:</p>
        <div className="language-buttons"> {/* Apply the custom class for spacing */}
          <button><FaFlag /> Français</button>
          <button><FaFlag /> Czech</button>
          <button><FaFlag /> Türkçe</button>
          {/* Add more language selection buttons as needed */}
        </div>
      </div>
    </div>
  );
}

export default Language;
