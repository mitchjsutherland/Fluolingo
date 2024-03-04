
import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import "./Register.css";



import { Card, Form, Button } from 'react-bootstrap'; // Import the necessary Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import "./Register.css";


function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users/register', {
        method: 'GET',
        credentials: 'include' // Include cookies in the request
      });

      

      if (response.ok) {
        // User is authenticated, redirect to dashboard
        const responseData = await response.json(); // Parse the response body as JSON
        const redirectUrl = responseData.redirect; // Access the redirect property

        window.location.href = redirectUrl;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Call the fetchData function only once when the component mounts



  const [errors, setErrors] = useState([]);

  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData.errors);
      }
      
      else{

        navigate("/users/login", {state: {successMessage: true}});

      }
  
      // Registration successful, redirect or perform any other action as needed
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle error, such as displaying an error message to the user
    }
  };

 return (
    <div>
        <div className="logo">
            <img src="../public/flamingologo.svg" alt="Logo" />
        </div>
        <h1 className="heading">Fluolingo</h1>
        {errors.length > 0 && (
            <div className="error-messages">
                <h2>Error(s) occurred during registration:</h2>
                {errors.map((error, index) => (
                    <p key={index}>{error.message}</p>
                ))}
            </div>
        )}
        <Card className="p-4"> {/* Use the Card component from Bootstrap */}
            <Card.Title as="h2">Register</Card.Title> {/* Use Card.Title for the heading */}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <br />
                </Form.Group>
                <Button variant="primary" className="register-button" type="submit">Register</Button>
            </Form>
            <br />
            <p>Already registered? <Link to="/users/login">Login here</Link></p>
        </Card>
    </div>
);
}

export default Register;
