import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import Navbar from '../Componets/Navbar';

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

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, total } = useCart();

  const subtotal = total;
  const tax = subtotal * 0.08;
  const shipping = 5.99;
  const finalTotal = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-rich-black/50">
      <Navbar />
      <div className="py-12 px-6 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-8">Your Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="w-24 h-24 text-muted-foreground mx-auto mb-6 opacity-50" />
            <h2 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add some delicious mocktails to get started!</p>
            <Link
              to="/Fmenu"
              className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transform transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 inline-block"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item: Mocktail) => (
                <div
                  key={item.id}
                  className="bg-card/50 backdrop-blur-lg rounded-2xl border border-border/50 p-6 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-foreground mb-1">{item.name}</h2>
                      <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{item.description}</p>
                      <p className="text-primary font-semibold mb-4">${item.price.toFixed(2)} each</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold text-foreground min-w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-lg font-bold text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
                            title="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card/50 backdrop-blur-lg rounded-2xl border border-border/50 p-6 sticky top-6">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Order Summary</h2>
                
                <div className="border-t border-border pt-4 space-y-3 mb-6">
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
                  <div className="flex justify-between text-lg font-bold text-foreground pt-3 border-t border-border">
                    <span>Total</span>
                    <span className="text-gradient-gold">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-semibold hover:scale-105 transform transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/Fmenu"
                  className="w-full mt-4 text-center text-primary hover:underline text-sm"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;