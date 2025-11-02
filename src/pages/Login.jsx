import { useState } from "react";
import {
  Form,
  Button,
  Alert,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
// 1. IMPORTAMOS Link PARA LA NAVEGACIÓN
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { signIn } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn(form.email, form.password);

    if (res) {
      nav(res.role === "admin" ? "/admin" : "/");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={6} lg={5} xl={4}>
          <Card className="border-0 shadow">
            <Card.Body className="p-4">
              <h1 className="text-center text-danger fw-bold mb-4">
                Iniciar sesión
              </h1>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </Form.Group>

                <Button type="submit" className="w-100">
                  Ingresar
                </Button>
              </Form>

              {/* 2. AQUÍ AGREGAMOS LA LÍNEA */}
              <div className="mt-3 text-center">
                <span>¿No tienes una cuenta? </span>
                <Link to="/registro">Regístrate</Link>
              </div>
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}