/**
 * Utilidades de validación usadas por Registro.jsx y Contacto.jsx
 * Exporta: validarRUT(rut), dominioPermitido(email, allowed), passwordOk(p)
 */

/**
 * Limpia y normaliza un RUT (quita puntos y guión, transforma a mayúscula)
 * @param {string} rut
 * @returns {string}
 */
function _limpiarRUT(rut) {
  if (!rut && rut !== 0) return '';
  return String(rut).replace(/\./g, '').replace(/-/g, '').toUpperCase().trim();
}

/**
 * Valida un RUT chileno (formato: 12345678-9 o 12.345.678-9)
 * Devuelve true si el dígito verificador coincide.
 * @param {string} rut
 * @returns {boolean}
 */
export function validarRUT(rut) {
  const limpio = _limpiarRUT(rut);
  // Debe tener al menos 2 caracteres (cuerpo + dv)
  if (!/^\d{7,8}[0-9K]$/.test(limpio)) return false;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  let suma = 0;
  let factor = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }

  const resto = suma % 11;
  const calculado = 11 - resto;
  let dvCalc = '';
  if (calculado === 11) dvCalc = '0';
  else if (calculado === 10) dvCalc = 'K';
  else dvCalc = String(calculado);

  return dvCalc === dv;
}

/**
 * Comprueba si el dominio del email está permitido.
 * allowed puede ser:
 *  - array de strings (['gmail.com','miempresa.cl'])
 *  - regexp (/.*\.cl$/)
 *  - string único ('miempresa.cl')
 * Si no se pasa `allowed`, se usa una lista por defecto de dominios comunes.
 * @param {string} email
 * @param {string[]|string|RegExp} [allowed]
 * @returns {boolean}
 */
export function dominioPermitido(email, allowed) {
  if (!email || typeof email !== 'string') return false;
  const partes = email.split('@');
  if (partes.length !== 2) return false;
  const dominio = partes[1].toLowerCase();

  const porDefecto = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];
  if (allowed === undefined || allowed === null) allowed = porDefecto;

  if (allowed instanceof RegExp) {
    return allowed.test(dominio);
  }

  if (typeof allowed === 'string') {
    return dominio === allowed.toLowerCase();
  }

  if (Array.isArray(allowed)) {
    return allowed.map(d => d.toLowerCase()).includes(dominio);
  }

  return false;
}

/**
 * Valida que una contraseña cumpla con los requisitos
 * - Entre 4 y 10 caracteres
 * @param {string} password
 * @returns {boolean}
 */
export function passwordOk(password) {
  if (!password) return false;
  return password.length >= 4 && password.length <= 10;
}

/**
 * Valida que dos contraseñas coincidan
 * @param {string} password
 * @param {string} confirmation
 * @returns {boolean}
 */
export function passwordsMatch(password, confirmation) {
  return password === confirmation;
}

// Export por defecto un objeto para importaciones más simples si se desea
export default {
  validarRUT,
  dominioPermitido,
  passwordOk,
  passwordsMatch
};
