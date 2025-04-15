import { useState } from 'react';
import '../App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleRegister(e) {
    e.preventDefault();

    const newUser = {
      email: email,
      password: password,
      fullName: fullName
    };

    axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, newUser)
      .then(response => {
        setMessage("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
        setError("");
      })
      .catch(error => {
        console.error(error);
        setError(error.response?.data || "Kayıt sırasında hata oluştu.");
        setMessage("");
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        {error && (
          <Toast bg="danger" show={true} onClose={() => setError("")}>
            <Toast.Header>
              <strong className="me-auto">Kayıt Hatası</strong>
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

        <Form className="register-form" onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Ad Soyad</Form.Label>
            <Form.Control
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Adınızı ve soyadınızı girin"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email adresi</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email adresi"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Şifre</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifre"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Kayıt Ol
          </Button>
        <br />
          <a
          className="App-link"
          href="/login"
        >
          Hesabın varsa Giriş Yap
        </a>
        </Form>
      </header>
    </div>
  );
}

export default RegisterPage;