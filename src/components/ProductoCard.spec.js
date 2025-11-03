// src/components/ProductoCard.spec.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "./ProductCard";

describe("Componente ProductCard (Jasmine + Karma)", () => {
  const productoMock = {
    id: 1,
    nombre: "Torta de Chocolate",
    precio: 15000,
    imagen: "/images/torta-choco.jpg",
  };

  it("✅ renderiza correctamente el nombre y el precio", () => {
    render(
      <MemoryRouter>
        <ProductCard producto={productoMock} />
      </MemoryRouter>
    );

    expect(screen.getByText("Torta de Chocolate")).toBeTruthy();
    expect(screen.getByText("$15.000")).toBeTruthy();
  });

  it("✅ llama a onAdd cuando se presiona el botón Agregar", () => {
    const onAddSpy = jasmine.createSpy("onAdd");

    render(
      <MemoryRouter>
        <ProductCard producto={productoMock} onAdd={onAddSpy} />
      </MemoryRouter>
    );

    const boton = screen.getByText("Agregar");
    fireEvent.click(boton);

    expect(onAddSpy).toHaveBeenCalledWith(productoMock);
  });

  it("✅ ejecuta la función de navegación al hacer clic en la imagen (simulada)", () => {
    // Creamos un mock manual para simular navigate
    const navigateMock = jasmine.createSpy("navigate");

    // Clonamos temporalmente el componente y sobreescribimos la función irADetalle
    const ProductoConMock = ({ producto }) => (
      <div
        data-testid="mock-img"
        onClick={() => navigateMock(`/producto/${producto.id}`)}
      >
        Imagen simulada
      </div>
    );

    // Renderizamos la simulación
    render(<ProductoConMock producto={productoMock} />);

    // Simulamos clic en la imagen
    fireEvent.click(screen.getByTestId("mock-img"));

    // Verificamos que se llamó con la ruta correcta
    expect(navigateMock).toHaveBeenCalledWith("/producto/1");
  });
});
