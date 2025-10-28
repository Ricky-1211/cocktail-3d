import { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate, Link } from 'react-router-dom';

interface Mocktail {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  description: string;
  image: string;
  category: 'classic' | 'signature' | 'seasonal' | 'premium';
  ingredients: string[];
  preparationTime: number;
  calories: number;
  tags: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
}

const Checkout = () => {
  const { cartItems, total, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', email: '' });
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const navigate = useNavigate();

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setStep(3);
  };

  const handleConfirm = () => {
    clearCart();
    navigate('/confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-amber-400 mb-8">Checkout</h1>
      <div className="mb-6">
        <Link
          to={step === 1 ? '/cart' : step === 2 ? '#' : '/cart'}
          onClick={() => step === 2 && setStep(1)}
          className="text-amber-400 hover:underline"
        >
          ← Back to {step === 1 ? 'Cart' : 'Shipping'}
        </Link>
      </div>
      {step === 1 && (
        <form onSubmit={handleShippingSubmit} className="space-y-4 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold">Shipping Information</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={shippingInfo.name}
            onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
            className="w-full p-3 bg-gray-800 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={shippingInfo.address}
            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
            className="w-full p-3 bg-gray-800 rounded-lg"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={shippingInfo.email}
            onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
            className="w-full p-3 bg-gray-800 rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600"
          >
            Proceed to Payment
          </button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handlePaymentSubmit} className="space-y-4 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold">Payment Information</h2>
          <select className="w-full p-3 bg-gray-800 rounded-lg">
            <option>Credit Card</option>
            <option>PayPal</option>
            <option>Apple Pay</option>
          </select>
          <input
            type="text"
            placeholder="Card Number"
            value={paymentInfo.cardNumber}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
            className="w-full p-3 bg-gray-800 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            value={paymentInfo.expiry}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
            className="w-full p-3 bg-gray-800 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="CVV"
            value={paymentInfo.cvv}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
            className="w-full p-3 bg-gray-800 rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600"
          >
            Pay ${total.toFixed(2)}
          </button>
        </form>
      )}
      {step === 3 && (
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <ul className="space-y-2 mb-6">
            {cartItems.map((item: Mocktail) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity || 1}
                </span>
                <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
              </li>
            ))}
            <li className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </li>
          </ul>
          <button
            onClick={handleConfirm}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;