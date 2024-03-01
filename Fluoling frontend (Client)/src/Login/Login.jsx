import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <div>
      <div className="logo-placeholder">
        <img src="logo-placeholder.png" alt="Logo Placeholder" />
      </div>
      <br /> {/* Add a break here */}
      <Card className="rounded p-3">
        <h2>Welcome!</h2>
        <Form onSubmit={handleSubmit}>
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
          <div>
            <br />
          </div>
          <Button variant="primary" type="submit" className="custom-submit-button">
            Login
          </Button>
        </Form>
        <div>
          <br />
        </div>
        <p>Don't have an account? <Link to="/users/register">Register here</Link></p>
      </Card>
    </div>
  );
}

export default Login;
