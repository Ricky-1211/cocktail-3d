import { useState } from 'react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface Mocktail {
  id: string;
  name: string;
  price: number;
  quantity: number;
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

interface ShippingInfo {
  name: string;
  address: string;
  email: string;
  phone?: string;
  city?: string;
  zipCode?: string;
}

interface PaymentInfo {
  paymentMethod: 'credit' | 'paypal' | 'applepay';
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardName: string;
}

const Payment = () => {
  const { cartItems, total, clearCart } = useCart();
  const { addOrder, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const shippingInfo = (location.state?.shippingInfo as ShippingInfo) || {
    name: '',
    address: '',
    email: '',
  };

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    paymentMethod: 'credit',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validatePayment = (): boolean => {
    if (paymentInfo.paymentMethod === 'credit') {
      if (!paymentInfo.cardNumber || paymentInfo.cardNumber.replace(/\s/g, '').length < 16) {
        setErrorMessage('Please enter a valid card number');
        return false;
      }
      if (!paymentInfo.expiry || paymentInfo.expiry.length < 5) {
        setErrorMessage('Please enter a valid expiry date');
        return false;
      }
      if (!paymentInfo.cvv || paymentInfo.cvv.length < 3) {
        setErrorMessage('Please enter a valid CVV');
        return false;
      }
      if (!paymentInfo.cardName) {
        setErrorMessage('Please enter the cardholder name');
        return false;
      }
    }
    return true;
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePayment()) {
      setPaymentStatus('error');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');
    setErrorMessage('');

    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Simulate random success/failure (90% success rate for demo)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        setPaymentStatus('success');
        
        // Save orders to AuthContext for each item in cart
        if (user && cartItems.length > 0) {
          cartItems.forEach((item) => {
            addOrder({
              name: item.name,
              ingredients: item.ingredients || [],
              price: item.price * item.quantity,
              specialInstructions: `Quantity: ${item.quantity}`,
            });
          });
        }
        
        // Clear cart and navigate to confirmation after a brief delay
        setTimeout(() => {
          clearCart();
          navigate('/confirmation', {
            state: {
              orderDetails: {
                items: cartItems,
                total,
                shippingInfo,
                paymentInfo: {
                  ...paymentInfo,
                  cardNumber: '**** **** **** ' + paymentInfo.cardNumber.slice(-4),
                },
                orderNumber: `ORD-${Date.now()}`,
                orderDate: new Date().toISOString(),
              },
            },
          });
        }, 1500);
      } else {
        setPaymentStatus('error');
        setErrorMessage('Payment failed. Please check your card details and try again.');
        setIsProcessing(false);
      }
    } catch (error) {
      setPaymentStatus('error');
      setErrorMessage('An error occurred during payment processing. Please try again.');
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0 && !location.state?.shippingInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-rich-black/50 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">No Items to Checkout</h1>
          <p className="text-muted-foreground mb-6">Your cart is empty or you haven't completed shipping information.</p>
          <Link
            to="/cart"
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Go to Cart
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = total;
  const tax = subtotal * 0.08; // 8% tax
  const shipping = 5.99; // Fixed shipping cost
  const finalTotal = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-rich-black/50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            to="/checkout"
            className="text-primary hover:underline flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back to Checkout</span>
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-8">Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-card/50 backdrop-blur-lg rounded-2xl border border-border/50 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Lock className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Secure Payment</h2>
              </div>

              {paymentStatus === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h3>
                  <p className="text-muted-foreground">Redirecting to confirmation...</p>
                </div>
              ) : (
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  {/* Payment Method Selection */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentInfo({ ...paymentInfo, paymentMethod: 'credit' })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          paymentInfo.paymentMethod === 'credit'
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <CreditCard className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-sm font-medium">Credit Card</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentInfo({ ...paymentInfo, paymentMethod: 'paypal' })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          paymentInfo.paymentMethod === 'paypal'
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <span className="text-sm font-medium">PayPal</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentInfo({ ...paymentInfo, paymentMethod: 'applepay' })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          paymentInfo.paymentMethod === 'applepay'
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <span className="text-sm font-medium">Apple Pay</span>
                      </button>
                    </div>
                  </div>

                  {paymentInfo.paymentMethod === 'credit' && (
                    <>
                      {/* Card Name */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={paymentInfo.cardName}
                          onChange={(e) =>
                            setPaymentInfo({ ...paymentInfo, cardName: e.target.value })
                          }
                          className="w-full p-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                          required
                        />
                      </div>

                      {/* Card Number */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={paymentInfo.cardNumber}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cardNumber: formatCardNumber(e.target.value),
                            })
                          }
                          maxLength={19}
                          className="w-full p-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                          required
                        />
                      </div>

                      {/* Expiry and CVV */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={paymentInfo.expiry}
                            onChange={(e) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                expiry: formatExpiry(e.target.value),
                              })
                            }
                            maxLength={5}
                            className="w-full p-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            value={paymentInfo.cvv}
                            onChange={(e) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                cvv: e.target.value.replace(/\D/g, '').slice(0, 4),
                              })
                            }
                            maxLength={4}
                            className="w-full p-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {paymentInfo.paymentMethod === 'paypal' && (
                    <div className="p-6 bg-background/30 rounded-xl border border-border">
                      <p className="text-muted-foreground text-center">
                        You will be redirected to PayPal to complete your payment.
                      </p>
                    </div>
                  )}

                  {paymentInfo.paymentMethod === 'applepay' && (
                    <div className="p-6 bg-background/30 rounded-xl border border-border">
                      <p className="text-muted-foreground text-center">
                        Click the button below to pay with Apple Pay.
                      </p>
                    </div>
                  )}

                  {paymentStatus === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl">
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing || paymentStatus === 'processing'}
                    className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-semibold hover:scale-105 transform transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isProcessing || paymentStatus === 'processing' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing Payment...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        <span>Pay ${finalTotal.toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card/50 backdrop-blur-lg rounded-2xl border border-border/50 p-6 sticky top-6">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item: Mocktail) => (
                  <div key={item.id} className="flex items-start space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-sm">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium text-primary mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-foreground pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-gradient-gold">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-background/30 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-2 text-sm">Shipping To:</h3>
                <p className="text-sm text-muted-foreground">{shippingInfo.name}</p>
                <p className="text-sm text-muted-foreground">{shippingInfo.address}</p>
                <p className="text-sm text-muted-foreground">{shippingInfo.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

