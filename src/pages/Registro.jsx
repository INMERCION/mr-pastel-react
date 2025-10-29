// Registro.jsx - validación Bootstrap nativa (HTML5 + feedback).
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function Registro() {
  const [form, setForm] = useState({ nombre: '', email: '', pass: '' });
  const [validated, setValidated] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    if (!formEl.checkValidity()) {
      setValidated(true);
      return;
    }
    alert('Registro exitoso ✅');
  };

  return (
    <>
      <h1 className="mb-3">Registro</h1>
      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control required value={form.nombre}
            onChange={e => setForm({ ...form, nombre: e.target.value })}/>
          <Form.Control.Feedback type="invalid">Ingresa tu nombre.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}/>
          <Form.Control.Feedback type="invalid">Email válido requerido.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control required type="password" minLength={6} value={form.pass}
            onChange={e => setForm({ ...form, pass: e.target.value })}/>
          <Form.Control.Feedback type="invalid">Mínimo 6 caracteres.</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">Crear cuenta</Button>
      </Form>
    </>
  );
}
