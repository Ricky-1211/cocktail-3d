import Cocktails from '../Componets/Cocktails.tsx';
// Or extend with more items if needed

const OnlineOrder = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Cocktails/> {/* Reuse or extend */}
      {/* Add more sections if needed for full menu */}
    </div>
  );
};

export default OnlineOrder;