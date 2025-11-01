import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  // 1. CORRECCIÓN ESLINT: Quitamos 'user' que no se usaba
  const { signIn } = useAuth();
  const nav = useNavigate();
  
  // 2. CORRECIÓN LÓGICA: Cambiamos 'pass' a 'password' para que coincida con AuthContext
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // 3. CORRECIÓN LÓGICA: Enviamos form.password
    const res = await signIn(form.email, form.password);
    
    if (res) {
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
            // 4. CORRECIÓN LÓGICA: Vinculamos a form.password
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </Form.Group>
        <Button type="submit">Ingresar</Button>
      </Form>
      
     
    </>
  );
}