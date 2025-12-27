import { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Mail, User, ArrowRight } from 'lucide-react';

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

const Checkout = () => {
  const { cartItems, total } = useCart();
  const [shippingInfo, setShippingInfo] = useState({ 
    name: '', 
    address: '', 
    email: '',
    phone: '',
    city: '',
    zipCode: ''
  });
  const navigate = useNavigate();

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to payment with shipping info
    navigate('/payment', {
      state: {
        shippingInfo,
      },
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-rich-black/50 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">Add some items to your cart before checkout.</p>
          <Link
            to="/Fmenu"
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-block"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = total;
  const tax = subtotal * 0.08;
  const shipping = 5.99;
  const finalTotal = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-rich-black/50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            to="/cart"
            className="text-primary hover:underline flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back to Cart</span>
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <div className="bg-card/50 backdrop-blur-lg rounded-2xl border border-border/50 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <MapPin className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Shipping Information</h2>
              </div>

              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={shippingInfo.name}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    className="w-full p-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="123 Main Street"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">City</label>
                    <input
                      type="text"
                      placeholder="New York"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      className="w-full p-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Zip Code</label>
                    <input
                      type="text"
                      placeholder="10001"
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                      className="w-full p-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-semibold hover:scale-105 transform transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center space-x-2 mt-6"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card/50 backdrop-blur-lg rounded-2xl border border-border/50 p-6 sticky top-6">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;