import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutStripe from '../components/CheckoutStripe';
import '../styles/PagoConfirmacion.css';

export default function PagoConfirmacion() {
  const navigate = useNavigate();
  const [pedidoInfo] = useState(() => {
    // Obtener info del pedido desde localStorage o state
    const savedInfo = localStorage.getItem('pedidoPago');
    return savedInfo ? JSON.parse(savedInfo) : null;
  });

  const handlePaymentSuccess = (paymentIntent) => {
    console.log('Pago exitoso:', paymentIntent);
    
    // Guardar el paymentIntentId con el pedido
    localStorage.setItem('ultimoPagoId', paymentIntent.id);
    
    // Redirigir a confirmación
    navigate('/pago-confirmado', {
      state: {
        paymentIntentId: paymentIntent.id,
        pedidoId: pedidoInfo?.pedidoId,
        amount: pedidoInfo?.amount
      }
    });
  };

  const handlePaymentError = (error) => {
    console.error('Error en el pago:', error);
    alert('Hubo un error al procesar tu pago. Por favor, intenta nuevamente.');
  };

  if (!pedidoInfo) {
    return (
      <div className="pago-container">
        <div className="error-message">
          <h2>No hay información de pago</h2>
          <button onClick={() => navigate('/carrito')} className="btn-volver">
            Volver al Carrito
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pago-container">
      <CheckoutStripe
        amount={pedidoInfo.amount}
        pedidoId={pedidoInfo.pedidoId}
        description={pedidoInfo.description}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
      
      <div className="pago-actions">
        <button onClick={() => navigate('/carrito')} className="btn-cancelar">
          Cancelar y volver
        </button>
      </div>
    </div>
  );
}
