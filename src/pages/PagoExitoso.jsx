import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/PagoExitoso.css';

export default function PagoExitoso() {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener información del pago desde el state o localStorage
    const info = location.state || JSON.parse(localStorage.getItem('ultimoPagoInfo') || '{}');
    
    if (info.paymentIntentId) {
      // Opcional: Verificar el estado del pago con el backend
      verifyPayment(info.paymentIntentId);
    } else {
      setLoading(false);
    }
    
    setPaymentInfo(info);

    // Limpiar el localStorage
    localStorage.removeItem('pedidoPago');
    localStorage.removeItem('ultimoPagoId');
  }, [location]);

  const verifyPayment = async (paymentIntentId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/pagos/payment-intent/${paymentIntentId}`
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log('Estado del pago verificado:', data);
      }
    } catch (error) {
      console.error('Error al verificar el pago:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pago-exitoso-container">
        <div className="loading">Verificando pago...</div>
      </div>
    );
  }

  return (
    <div className="pago-exitoso-container">
      <div className="success-card">
        <div className="success-icon">
          <svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
            <circle className="success-circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="success-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>

        <h1>¡Pago Exitoso!</h1>
        <p className="success-message">
          Tu pago se ha procesado correctamente
        </p>

        {paymentInfo?.pedidoId && (
          <div className="payment-details">
            <div className="detail-row">
              <span className="label">Pedido:</span>
              <span className="value">#{paymentInfo.pedidoId}</span>
            </div>
            
            {paymentInfo.amount && (
              <div className="detail-row">
                <span className="label">Monto:</span>
                <span className="value amount">
                  ${paymentInfo.amount.toLocaleString('es-CL')}
                </span>
              </div>
            )}

            {paymentInfo.paymentIntentId && (
              <div className="detail-row">
                <span className="label">ID de Transacción:</span>
                <span className="value transaction-id">
                  {paymentInfo.paymentIntentId.substring(0, 20)}...
                </span>
              </div>
            )}
          </div>
        )}

        <div className="success-actions">
          <button 
            onClick={() => navigate('/pedidos')} 
            className="btn-primary"
          >
            Ver mis pedidos
          </button>
          
          <button 
            onClick={() => navigate('/')} 
            className="btn-secondary"
          >
            Volver al inicio
          </button>
        </div>

        <p className="email-notice">
          Recibirás un correo de confirmación con los detalles de tu pedido
        </p>
      </div>
    </div>
  );
}
