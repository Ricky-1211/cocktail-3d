import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, Calendar, CreditCard } from 'lucide-react';

const Confirmation = () => {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-rich-black/50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground">
            Thank you for your order. We'll prepare your mocktails shortly.
          </p>
        </div>

        {orderDetails && (
          <div className="bg-card/50 backdrop-blur-lg rounded-2xl border border-border/50 p-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Package className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Order Details</h2>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Order Number</span>
                  <span className="font-semibold text-foreground">{orderDetails.orderNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Order Date</span>
                  </span>
                  <span className="font-semibold text-foreground">
                    {new Date(orderDetails.orderDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="font-bold text-gradient-gold text-lg">
                    ${orderDetails.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mt-4">
                <h3 className="font-semibold text-foreground mb-3">Shipping Address</h3>
                <p className="text-muted-foreground">{orderDetails.shippingInfo.name}</p>
                <p className="text-muted-foreground">{orderDetails.shippingInfo.address}</p>
                <p className="text-muted-foreground">{orderDetails.shippingInfo.email}</p>
              </div>

              <div className="border-t border-border pt-4 mt-4">
                <h3 className="font-semibold text-foreground mb-3">Payment Method</h3>
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {orderDetails.paymentInfo.paymentMethod === 'credit' && 'Credit Card'}
                    {orderDetails.paymentInfo.paymentMethod === 'paypal' && 'PayPal'}
                    {orderDetails.paymentInfo.paymentMethod === 'applepay' && 'Apple Pay'}
                  </span>
                  {orderDetails.paymentInfo.cardNumber && (
                    <span className="text-muted-foreground">
                      ({orderDetails.paymentInfo.cardNumber})
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-border pt-4 mt-4">
                <h3 className="font-semibold text-foreground mb-3">Items Ordered</h3>
                <div className="space-y-2">
                  {orderDetails.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="text-foreground font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <Link
            to="/"
            className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transform transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 inline-block"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;