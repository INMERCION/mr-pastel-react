// Blog.jsx - placeholder sencillo; a futuro: fetch a API o markdowns.
const posts = [
  { id: 1, titulo: 'Cómo elegir tu torta ideal', resumen: 'Guía rápida para eventos.' },
  { id: 2, titulo: 'Técnicas de glaseado', resumen: 'Tips y trucos de pastelería.' },
];

export default function Blog() {
  return (
    <>
      <h1 className="mb-3">Blog</h1>
      <ul className="list-group">
        {posts.map(p => (
          <li key={p.id} className="list-group-item">
            <h5 className="mb-1">{p.titulo}</h5>
            <p className="mb-0 text-muted">{p.resumen}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
