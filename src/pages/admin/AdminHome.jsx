import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductsContext';
import { Container, Row, Col, Card } from 'react-bootstrap';
// Iconos para las tarjetas
import { FaUsers, FaBoxOpen, FaUserShield, FaTags } from 'react-icons/fa';

// 1. IMPORTAMOS LOS COMPONENTES DE RECHARTS
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

// Estilo para los iconos de las tarjetas
const cardIconStyle = {
  fontSize: '3rem',
  opacity: 0.3
};

// --- Colores para el gráfico de torta ---
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919', '#19FFFF'];

function DashboardAdmin() {
  // 1. Consumir los contextos
  const { users } = useAuth();
  const { products } = useProducts();

  // 2. Calcular las métricas (Tarjetas)
  const totalUsuarios = users.length;
  const totalProductos = products.length;
  const totalAdmins = users.filter(u => u.role === 'admin').length;
  const totalCategorias = new Set(products.map(p => p.categoria)).size;

  // --- 3. PROCESAR DATOS PARA LOS GRÁFICOS ---

  // A. Datos para Gráfico de Categorías (Torta)
  const categoryCount = products.reduce((acc, product) => {
    const category = product.categoria;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  
  const chartDataCategorias = Object.entries(categoryCount).map(([name, value]) => ({
    name,
    value,
  }));

  // B. Datos para Gráfico de Stock (Barras)
  // (Asegúrate de que 'stock' exista en tu products.js)
  const lowStockData = products
    .sort((a, b) => a.stock - b.stock) // Ordena de menor a mayor stock
    .slice(0, 5) // Toma solo los primeros 5
    .map(p => ({
      name: p.nombre.substring(0, 20) + '...', // Acortar nombre
      stock: p.stock || 0 // Usar 0 si 'stock' no está definido
    }));

  // C. Datos para Gráfico de Precios (Barras)
  const priceRanges = {
    'Menos de $10.000': 0,
    '$10.000 - $30.000': 0,
    '$30.001 - $50.000': 0,
    'Más de $50.000': 0,
  };

  products.forEach(p => {
    if (p.precio <= 10000) {
      priceRanges['Menos de $10.000']++;
    } else if (p.precio <= 30000) {
      priceRanges['$10.000 - $30.000']++;
    } else if (p.precio <= 50000) {
      priceRanges['$30.001 - $50.000']++;
    } else {
      priceRanges['Más de $50.000']++;
    }
  });

  const chartDataPrecios = Object.entries(priceRanges).map(([name, value]) => ({
    name,
    Productos: value,
  }));

  // --- 4. RENDERIZADO DEL COMPONENTE ---
  return (
    <Container fluid>
      <Row className="my-3">
        <Col>
          <h2>Dashboard</h2>
          <p className="text-muted">Resumen rápido del estado de la tienda.</p>
        </Col>
      </Row>

      {/* Fila de Tarjetas de Estadísticas */}
      <Row>
        {/* Tarjeta 1: Total Usuarios */}
        <Col md={6} lg={3} className="mb-3">
          <Card className="shadow-sm">
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title as="h5" className="text-muted">Total Usuarios</Card.Title>
                  <Card.Text as="h2" className="fw-bold">{totalUsuarios}</Card.Text>
                </Col>
                <Col xs="auto" className="d-flex align-items-center">
                  <FaUsers style={cardIconStyle} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Tarjeta 2: Total Productos */}
        <Col md={6} lg={3} className="mb-3">
          <Card className="shadow-sm">
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title as="h5" className="text-muted">Total Productos</Card.Title>
                  <Card.Text as="h2" className="fw-bold">{totalProductos}</Card.Text>
                </Col>
                <Col xs="auto" className="d-flex align-items-center">
                  <FaBoxOpen style={cardIconStyle} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Tarjeta 3: Total Admins */}
        <Col md={6} lg={3} className="mb-3">
          <Card className="shadow-sm">
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title as="h5" className="text-muted">Administradores</Card.Title>
                  <Card.Text as="h2" className="fw-bold">{totalAdmins}</Card.Text>
                </Col>
                <Col xs="auto" className="d-flex align-items-center">
                  <FaUserShield style={cardIconStyle} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Tarjeta 4: Total Categorías */}
        <Col md={6} lg={3} className="mb-3">
          <Card className="shadow-sm">
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title as="h5" className="text-muted">Categorías</Card.Title>
                  <Card.Text as="h2" className="fw-bold">{totalCategorias}</Card.Text>
                </Col>
                <Col xs="auto" className="d-flex align-items-center">
                  <FaTags style={cardIconStyle} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* --- 5. FILA DE GRÁFICOS --- */}
      <Row className="my-4">
        {/* Gráfico de Categorías */}
        <Col lg={6} className="mb-3">
          <Card className="shadow-sm">
            <Card.Header>Productos por Categoría</Card.Header>
            <Card.Body style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartDataCategorias}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {chartDataCategorias.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Gráfico de Precios */}
        <Col lg={6} className="mb-3">
          <Card className="shadow-sm">
            <Card.Header>Distribución de Precios</Card.Header>
            <Card.Body style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartDataPrecios}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Productos" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* --- 6. FILA GRÁFICO DE STOCK --- */}
      <Row className="my-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Header>Top 5 Productos con Menor Stock</Card.Header>
            <Card.Body style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={lowStockData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="stock" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
}

export default DashboardAdmin;