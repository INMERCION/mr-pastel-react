// Footer.jsx - pie de página simple para todo el sitio.
export default function Footer() {
  return (
    <footer className="py-4 text-center text-muted">
      <small>© {new Date().getFullYear()} Mr. Pastel — Todos los derechos reservados</small>
    </footer>
  );
}
