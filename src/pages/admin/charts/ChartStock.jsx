import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ChartStock({ products }) {
  
  // 1. Procesar los datos: Obtener los 5 productos con menor stock
  // (Asegúrate de que 'stock' exista en tu products.js)
  const lowStockData = products
    .sort((a, b) => a.stock - b.stock) // Ordena de menor a mayor stock
    .slice(0, 5) // Toma solo los primeros 5
    .map(p => ({
      name: p.nombre.substring(0, 20) + '...', // Acortar nombre
      stock: p.stock
    }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
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
    </div>
  );
}

export default ChartStock;