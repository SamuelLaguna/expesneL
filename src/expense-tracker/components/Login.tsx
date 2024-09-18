
import { useState } from 'react';
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { checkToken, GetLoggedInUser, login } from "../Services/DataService";

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

  const handleUser = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData: UserData = {
      username: username,
      password: password
    };
    console.log(userData);

    login(userData)
      .then((token: LoginResponse) => {
        console.log(token);
        if (token?.token) {
          localStorage.setItem("Token", token.token);
          return GetLoggedInUser(username);
        }
      })
      .then(() => {
        navigate('/ExpenseFrom');
      })
     
  };

  return (
    <Container>
      <Row>
        <Col className="form-container d-flex justify-content-center">
          <Form>
            <p className="text-center">Login</p>
            <Form.Group className="mb-3" controlId="Username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" onChange={handleUser} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
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