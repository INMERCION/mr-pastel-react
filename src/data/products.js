// products.js - mock de productos; reemplazar por fetch a API cuando exista.

const products = [
  // Tortas Clásicas
  { id: 1, nombre: "Torta Cuadrada de Chocolate", categoria: "Tortas", precio: 45000, imagen: "./images/tarta-chocolate-ganache.jpg" },
  { id: 2, nombre: "Torta Cuadrada de Frutas", categoria: "Tortas", precio: 50000, imagen: "./images/torta-de-frutas.jpg" },
  { id: 3, nombre: "Torta Circular de Vainilla", categoria: "Tortas", precio: 40000, imagen: "./images/torta-de-vainilla.jpg" },
  { id: 4, nombre: "Torta Circular de Manjar", categoria: "Tortas", precio: 42000, imagen: "./images/torta-manjar-nuez.jpg" },

  // Postres Individuales
  { id: 5, nombre: "Mousse de Chocolate", categoria: "Postres", precio: 5000, imagen: "./images/mousse-chocolate.jpg" },
  { id: 6, nombre: "Tiramisú Clásico", categoria: "Postres", precio: 6000, imagen: "./images/tiramisu.jpg" },
  { id: 8, nombre: "Postre Cheesecake Sin Azúcar", categoria: "Postres", precio: 48000, imagen: "./images/chesecake.jpg" },

  // Tortas y productos sin azúcar
  { id: 7, nombre: "Torta Sin Azúcar de Naranja", categoria: "Sin Azúcar", precio: 48000, imagen: "./images/torta-naranja.jpg" },

  // Panadería y pastelería tradicional
  { id: 9, nombre: "Empanada de Manzana", categoria: "Panadería", precio: 3000, imagen: "./images/empanadas-manzana.jpg" },
  { id: 10, nombre: "Tarta de Santiago", categoria: "Panadería", precio: 6000, imagen: "./images/tarta-santiago.jpg" },

  // Sin Gluten
  { id: 11, nombre: "Brownie Sin Gluten", categoria: "Sin Gluten", precio: 4000, imagen: "./images/brownie-sin-gluten.jpg" },
  { id: 12, nombre: "Pan Sin Gluten", categoria: "Sin Gluten", precio: 3500, imagen: "./images/pan-sin-gluten.jpg" },

  // Veganos
  { id: 13, nombre: "Torta Vegana de Chocolate", categoria: "Veganos", precio: 50000, imagen: "./images/chocolate-vegano.jpg" },
  { id: 14, nombre: "Galletas Veganas de Avena", categoria: "Veganos", precio: 4500, imagen: "./images/galletas-avena.jpg" },

  // Especiales y personalizados
  { id: 15, nombre: "Torta Especial de Cumpleaños", categoria: "Especiales", precio: 55000, imagen: "./images/pastel-cumpleanos.jpg" },
  { id: 16, nombre: "Torta Especial de Boda", categoria: "Especiales", precio: 60000, imagen: "./images/pastel-boda.jpg" },
  { id: 17, nombre: "Torta Especial de Aniversario", categoria: "Especiales", precio: 58000, imagen: "./images/pastel-aniversario.jpg" },
  { id: 18, nombre: "Torta para Eventos Empresariales", categoria: "Especiales", precio: 65000, imagen: "./images/pastel-empresa.jpg" },
];

export default products;
