import { useState } from "react";
// 1. IMPORTAMOS los componentes de layout que vamos a usar
import {
  Form,
  Button,
  Alert,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
    // 2. Usamos un Container con margen vertical (my-5)
    // Esto soluciona el problema de la barra de navegación
    <Container className="my-5">
      {/* 3. Usamos Row y Col para centrar el contenido */}
      <Row className="justify-content-md-center">
        <Col md={6} lg={5} xl={4}>
          {/* 4. Envolvemos todo en una Card para más sofisticación */}
          <Card>
            <Card.Body className="p-4">
              {/* Movemos el H1 y lo centramos */}
              <h1 className="text-center text-danger fw-bold mb-4">Iniciar sesión</h1>

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

                {/* 5. Hacemos que el botón ocupe todo el ancho */}
                <Button type="submit" className="w-100">
                  Ingresar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}