// src/test.spec.js
describe("Prueba de entorno", function () {

  it("Debería sumar correctamente dos números", function () {
    const resultado = 2 + 3;
    expect(resultado).toBe(5);
  });

  it("Debería verificar que una cadena contiene otra", function () {
    const mensaje = "Bienvenido a Mr Pastel";
    expect(mensaje).toContain("Mr Pastel");
  });

  it("Debería validar que un objeto tenga una propiedad específica", function () {
    const producto = { nombre: "Torta Tres Leches", precio: 12000 };
    expect(producto.precio).toBeGreaterThan(0);
  });

});
