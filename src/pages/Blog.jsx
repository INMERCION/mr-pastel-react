// Blog.jsx - listado de artículos del blog con tarjetas y enlaces
import { Link } from "react-router-dom";
import blogs from "../data/blogs";
import "../styles/blog.css";

export default function Blog() {
  return (
    <div className="container py-5 blog-page">
      <h1 className="text-center text-danger fw-bold mb-5">Nuestro Blog</h1>

      <div className="row justify-content-center g-4">
        {blogs.map((post) => (
          <div
            key={post.id}
            className="col-12 col-sm-6 col-md-4 d-flex justify-content-center"
          >
            <div className="card blog-card shadow-sm border-0 h-100">
              <img
                src={post.imagen}
                className="card-img-top blog-img"
                alt={post.titulo}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title text-danger fw-bold">
                    {post.titulo}
                  </h5>
                  <p className="card-text text-muted">{post.resumen}</p>
                </div>
                <div className="text-center mt-3">
                  <Link
                    to={`/blogs/${post.slug}`}
                    className="btn btn-danger rounded-pill fw-semibold"
                  >
                    Leer más
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
