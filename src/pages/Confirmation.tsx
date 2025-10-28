const Confirmation = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-green-400 mb-4">Order Confirmed!</h1>
      <p className="text-xl mb-8">Thank you for your order. We'll prepare your mocktails shortly.</p>
      <a href="/" className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600">
        Back to Home
      </a>
    </div>
  );
};

export default Confirmation;