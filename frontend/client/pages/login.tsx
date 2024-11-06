import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:3001/webmob/login', {username, password});
      if(response.status == 200){
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", response.data.id);
        await router.push("/");
      }
    } catch(error){
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="login-page">
    <Container className="d-flex align-items-center justify-content-center" style={{ height: "80vh", width: "70vh", borderRadius:"8px", margin:"auto", backgroundColor:"black", }}>
      <Row>
        <Col md={12}>
          <h3 className="text-center">Login</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formusername">
              <Form.Label>username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            <Button variant="primary" type="submit" className="w-100">
              Entrar
            </Button>
          </Form>
        </Col>
        <a href="/cadastro" style={{ color: "#0066CC", textDecoration: "underline", cursor: "pointer" }}>Criar conta</a>

      </Row>
    </Container>
    </div>
  );
}
