
import { useState } from 'react';
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { expenseStuff, GetLoggedInUser, login } from '../../Services/DataService';
import axios from 'axios';
import { BASE_URL } from '../../constant';
import ExpenseForm from './ExpenseFrom';




const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };


  const handleSubmit = async () => {
    try {
      let userData: any = {
        username: username,
        password: password,
      };
  
      const token = await login(userData);
      console.log('From handleSubmit', token);
      
      if (token != null) {
        // localStorage.setItem("Token", token.token);
        await GetLoggedInUser(username);
        navigate('/ExpenseFrom');
      } else {
        console.error("Error retrieving token");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

  return (
    <Container>
      <Row>
        <Col className="form-container d-flex justify-content-center">
          <Form>
            <p className="text-center">Login</p>
            <Form.Group className="mb-3" controlId="Username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" onChange={ handleUser} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={ handlePassword} />
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>
              Login
            </Button>
            <p className="mt-3">Don't Have an Account?</p>
            <Button variant="primary" onClick={() => navigate('/ExpenseFrom')}>
              Create Account
            </Button> 
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;


