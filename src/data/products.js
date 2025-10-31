// src/data/products.js
// Datos "semilla" (seed) con la estructura completa.

const products = [
  // IDs como string, campos renombrados (name, img), y campos añadidos (stock, category, description)
  { 
    id: "1", 
    name: "Torta Cuadrada de Chocolate", 
    price: 45000, 
    img: "./images/tarta-chocolate-ganache.jpg",
    stock: 15,
    category: "Tortas",
    description: "Deliciosa torta de chocolate con cobertura de ganache." 
  },
  { 
    id: "2", 
    name: "Torta Cuadrada de Frutas", 
    price: 50000, 
    img: "./images/torta-de-frutas.jpg",
    stock: 10,
    category: "Tortas",
    description: "Torta fresca con frutas de la estación y crema." 
  },
  { 
    id: "3", 
    name: "Torta Circular de Vainilla", 
    price: 40000, 
    img: "./images/torta-de-vainilla.jpg",
    stock: 20,
    category: "Tortas",
    description: "Torta clásica de vainilla, suave y esponjosa." 
  },
  { 
    id: "4", 
    name: "Torta Circular de Manjar", 
    price: 42000, 
    img: "./images/torta-manjar-nuez.jpg",
    stock: 12,
    category: "Tortas",
    description: "Torta rellena de manjar y cubierta de nueces." 
  },
  { 
    id: "5", 
    name: "Mousse de Chocolate", 
    price: 5000, 
    img: "./images/mousse-chocolate.jpg",
    stock: 30,
    category: "Postres",
    description: "Postre individual de mousse de chocolate aireado." 
  },
  { 
    id: "6", 
    name: "Tiramisú Clásico", 
    price: 6000, 
    img: "./images/tiramisu.jpg",
    stock: 0, // Agotado (para probar el KPI)
    category: "Postres",
    description: "El clásico postre italiano con queso mascarpone y café." 
  },
  { 
    id: "7", 
    name: "Torta Sin Azúcar de Naranja", 
    price: 48000, 
    img: "./images/torta-naranja.jpg",
    stock: 8, // Bajo stock (para probar el KPI)
    category: "Saludable",
    description: "Torta endulzada naturalmente, con un toque de naranja." 
  },
  { 
    id: "8", 
    name: "Postre Cheesecake Sin Azúcar",
    price: 48000, 
    img: "./images/chesecake.jpg",
    stock: 5, // Bajo stock
    category: "Saludable",
    description: "Cheesecake cremoso apto para dietas bajas en azúcar." 
  },
  { 
    id: "9", 
    name: "Empanada de Manzana", 
    price: 3000, 
    img: "./images/empanadas-manzana.jpg",
    stock: 25,
    category: "Pastelería",
    description: "Empanada dulce rellena de compota de manzana." 
  },
  { 
    id: "10", 
    name: "Tarta de Santiago", 
    price: 6000, 
    img: "./images/tarta-santiago.jpg",
    stock: 10,
    category: "Pastelería",
    description: "Tarta de almendras tradicional de Galicia." 
  },
  { 
    id: "11", 
    name: "Brownie Sin Gluten", 
    price: 4000, 
    img: "./images/brownie-sin-gluten.jpg",
    stock: 18,
    category: "Sin Gluten",
    description: "Brownie de chocolate denso, apto para celíacos." 
  },
  { 
    id: "12", 
    name: "Pan Sin Gluten", 
    price: 3500, 
    img: "./images/pan-sin-gluten.jpg",
    stock: 22,
    category: "Sin Gluten",
    description: "Pan de molde suave y apto para celíacos." 
  },
  { 
    id: "13", 
    name: "Torta Vegana de Chocolate", 
    price: 50000, 
    img: "./images/chocolate-vegano.jpg",
    stock: 7, // Bajo stock
    category: "Vegano",
    description: "Torta de chocolate sin ingredientes de origen animal." 
  },
  { 
    id: "14", 
    name: "Galletas Veganas de Avena", 
    price: 4500, 
    img: "./images/galletas-avena.jpg",
    stock: 40,
    category: "Vegano",
    description: "Paquete de 6 galletas de avena, pasas y sin mantequilla." 
  },
  { 
    id: "15", 
    name: "Torta Especial de Cumpleaños",
    price: 55000, 
    img: "./images/pastel-cumpleanos.jpg",
    stock: 5,
    category: "Especiales",
    description: "Torta personalizada para celebraciones de cumpleaños." 
  },
  { 
    id: "16", 
    name: "Torta Especial de Boda", 
    price: 60000, 
    img: "./images/pastel-boda.jpg",
    stock: 2,
    category: "Especiales",
    description: "Torta de varios pisos para matrimonios. Precio base." 
  },
  { 
    id: "17", 
    name: "Torta Especial de Aniversario",
    price: 58000, 
    img: "./images/pastel-aniversario.jpg",
    stock: 3,
    category: "Especiales",
    description: "Torta romántica para celebrar aniversarios." 
  },
  { 
    id: "18", 
    name: "Torta para Eventos Empresariales", 
    price: 65000, 
    img: "./images/pastel-empresa.jpg", // Ruta corregida (quitado ../)
    stock: 10,
    category: "Especiales",
    description: "Torta de gran tamaño para eventos corporativos." 
  },
];

export default products;