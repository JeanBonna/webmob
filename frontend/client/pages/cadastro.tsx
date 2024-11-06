import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/webmob/user', {
        username,
        email,
        password,
        bio,
      });

      if (response.status === 201) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", response.data.id);
        await router.push("/");
      }
    } catch (error) {
      setError("Erro ao criar conta. Tente novamente.");
    }
  };

  return (
    <div className="register-page">
      <Container className="d-flex align-items-center justify-content-center" style={{ height: "100vh", width: "90vh", borderRadius: "8px", margin: "auto", backgroundColor: "black" }}>
        <Row>
          <Col md={12}>
            <h3 className="text-center">Cadastro</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite seu username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBio">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Digite sua bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Cadastrar
              </Button>
            </Form>
          </Col>
          <a href="/login" style={{ color: "#0066CC", textDecoration: "underline", cursor: "pointer" }}>Logar</a>
        </Row>
      </Container>
    </div>
  );
}
