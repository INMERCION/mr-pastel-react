// Contacto.jsx - demo de formulario simple.
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function Contacto() {
  const [msg, setMsg] = useState({ nombre: '', email: '', mensaje: '' });
  const onSubmit = (e) => { e.preventDefault(); alert('Mensaje enviado ✅'); };

  return (
    <>
      <h1 className="mb-3">Contacto</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control required value={msg.nombre}
            onChange={e => setMsg({ ...msg, nombre: e.target.value })}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" value={msg.email}
            onChange={e => setMsg({ ...msg, email: e.target.value })}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control as="textarea" rows={4} required value={msg.mensaje}
            onChange={e => setMsg({ ...msg, mensaje: e.target.value })}/>
        </Form.Group>
        <Button type="submit">Enviar</Button>
      </Form>
    </>
  );
}
