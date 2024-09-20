
import { useState } from 'react';
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { GetLoggedInUser, login } from '../../Services/DataService';
import axios from 'axios';
import { BASE_URL } from '../../constant';

interface UserData {
  username: string,
  password: string
}

interface LoginResponse {
  token: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUser = (e: string) => {
    setUsername(e);
  };

  const handlePassword = (e:string ) => {
    setPassword(e);
  };

  const handleSubmit = (e:string) => {
    // e.preventDefault();
    const userData: UserData = {
      username: username,
      password: password
    };
    console.log(userData);
  };

    const handleLogin = (loginUser: string) => {
      axios.post(BASE_URL + "/User/Login", loginUser)
      .then((res) => {
        let data = res.data;
        localStorage.setItem("Token", data.token)
      })
    }
    
    
  

  return (
    <Container>
      <Row>
        <Col className="form-container d-flex justify-content-center">
          <Form>
            <p className="text-center">Login</p>
            <Form.Group className="mb-3" controlId="Username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" onChange={(e) => handleUser(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => handlePassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={() => handleSubmit}>
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