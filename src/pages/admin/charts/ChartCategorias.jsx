import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Colores para el gráfico
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919', '#19FFFF'];

function ChartCategorias({ products }) {
  
  // 1. Procesar los datos: Contar productos por categoría
  const categoryCount = products.reduce((acc, product) => {
    const category = product.categoria;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // 2. Formatear para recharts: [{ name: 'Tortas', value: 4 }, ...]
  const chartData = Object.entries(categoryCount).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartCategorias;