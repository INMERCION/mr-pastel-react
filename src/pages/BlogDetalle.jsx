// BlogDetalle.jsx - muestra un artículo según su slug
import { useParams, Link } from "react-router-dom";
import blogs from "../data/blogs";
import "../styles/blog.css";

export default function BlogDetalle() {
  const { slug } = useParams();
  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger mb-3">Artículo no encontrado</h2>
        <Link to="/blog" className="btn btn-outline-danger rounded-pill">
          ← Volver al Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5 blog-detalle">
      <div className="text-center mb-5">
        <img
          src={post.imagen}
          alt={post.titulo}
          className="blog-detalle-img img-fluid rounded shadow-sm"
        />
      </div>

      <div className="blog-detalle-contenido mx-auto">
        <h1 className="fw-bold text-danger mb-4 text-center">
          {post.titulo}
        </h1>
        <p className="lead text-muted" style={{ whiteSpace: "pre-line" }}>
          {post.contenido}
        </p>

        <div className="text-center mt-5">
          <Link
            to="/blog"
            className="btn btn-outline-danger rounded-pill fw-semibold"
          >
            ← Volver al Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
