// src/pages/Login.jsx
import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { signIn, user } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", pass: "" });
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn(form.email, form.pass);
    if (res) {
      // signIn ahora devuelve el usuario sanitizado
      nav(res.role === "admin" ? "/admin" : "/");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <>
      <h1 className="mb-3">Iniciar sesión</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            required
            value={form.pass}
            onChange={(e) => setForm({ ...form, pass: e.target.value })}
          />
        </Form.Group>
        <Button type="submit">Ingresar</Button>
      </Form>

      <div className="mt-4">
        <strong>Usuarios de prueba:</strong>
        <ul className="small text-muted">
          <li>Admin → <code>admin@mrpastel.cl</code> / <code>admin123</code></li>
          <li>Cliente → <code>cliente@mrpastel.cl</code> / <code>cliente123</code></li>
        </ul>
      </div>
    </>
  );
}
