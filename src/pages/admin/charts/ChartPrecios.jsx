import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function ChartPrecios({ products }) {

  // 1. Definir los rangos de precio
  const priceRanges = {
    'Menos de $10.000': 0,
    '$10.000 - $30.000': 0,
    '$30.001 - $50.000': 0,
    'Más de $50.000': 0,
  };

  // 2. Clasificar productos
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

  // 3. Formatear para recharts
  const chartData = Object.entries(priceRanges).map(([name, value]) => ({
    name,
    Productos: value,
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Productos" fill="#0088FE" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartPrecios;