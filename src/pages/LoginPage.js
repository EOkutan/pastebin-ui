import { useState } from 'react';
import '../App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const credentials = {
      email: email,
      password: password,
    };

    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, credentials)
      .then(response => {
        const token = response.data.token;

        // Token'ı localStorage'a kaydet
        localStorage.setItem("token", token);

        setMessage("Giriş başarılı!");
        setError("");

        window.location.href = "/home";
      })
      .catch(error => {
        console.error(error);
        setError(error.response?.data || "Login failed.");
        setMessage("");
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        {error && (
          <Toast bg="danger" show={true} onClose={() => setError("")}>
            <Toast.Header>
              <strong className="me-auto">Login Error</strong>
            </Toast.Header>
            <Toast.Body>{error}</Toast.Body>
          </Toast>
        )}

        {message && (
          <Toast bg="success" show={true} onClose={() => setMessage("")}>
            <Toast.Header>
              <strong className="me-auto">Bilgi</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        )}

        <Form className="login-form" onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
          <br />
          <a className="App-link" href="/signup">
            Hemen kaydol!
          </a>
        </Form>
      </header>
    </div>
  );
}

export default LoginPage;