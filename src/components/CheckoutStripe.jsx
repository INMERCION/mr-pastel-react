import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import '../styles/CheckoutStripe.css';

// Configuración de API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Inicializar Stripe con tu publishable key (pk_test_)
const stripePromise = loadStripe('pk_test_51SezRh2cLwGPBbZUf4FHTBaPLAOWY665GY704ij40g63YITJ7MselCM2HWkdcrUSPNaBdkaEbjOWSwif7Q4FFOdR00Q0ushAYz');

// Componente del formulario de pago
function CheckoutForm({ amount, pedidoId, onSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setMessage('');

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/pago-confirmado`,
        },
        redirect: 'if_required',
      });

      if (error) {
        setMessage(error.message);
        if (onError) onError(error);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setMessage('¡Pago exitoso!');
        if (onSuccess) onSuccess(paymentIntent);
      }
    } catch (err) {
      setMessage('Error al procesar el pago');
      console.error('Error:', err);
      if (onError) onError(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="payment-element-container">
        <PaymentElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="pay-button"
      >
        {isProcessing ? 'Procesando...' : `Pagar $${amount?.toLocaleString('es-CL')}`}
      </button>

      {message && (
        <div className={`message ${message.includes('exitoso') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </form>
  );
}

// Componente principal de checkout
export default function CheckoutStripe({ amount, pedidoId, description, onSuccess, onError }) {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Crear el PaymentIntent cuando se monta el componente
    const createPaymentIntent = async () => {
      try {
        const response = await fetch(`${API_URL}/api/pagos/create-payment-intent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amount,
            currency: 'clp',
            description: description || `Pedido #${pedidoId}`,
            pedidoId: pedidoId,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al crear el intento de pago');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err.message);
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (amount && amount > 0) {
      createPaymentIntent();
    }
  }, [amount, pedidoId, description]);

  if (loading) {
    return (
      <div className="checkout-container">
        <div className="loading">Cargando pasarela de pago...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="checkout-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#ff6b9d',
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h2>Finalizar Pago</h2>
        <p className="amount">Total: ${amount?.toLocaleString('es-CL')}</p>
        {description && <p className="description">{description}</p>}
      </div>

      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            amount={amount}
            pedidoId={pedidoId}
            onSuccess={onSuccess}
            onError={onError}
          />
        </Elements>
      )}
    </div>
  );
}
