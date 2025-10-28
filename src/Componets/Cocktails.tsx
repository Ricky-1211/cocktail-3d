import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, Star, Clock, Zap } from 'lucide-react';
import { useCart } from '../pages/CartContext';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface Mocktail {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'classic' | 'signature' | 'seasonal' | 'premium';
  ingredients: string[];
  preparationTime: number;
  calories: number;
  tags: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
}
const mocktails: Mocktail[] = [
  {
    id: '1',
     name: 'Sunset Bliss',
     description: 'A tropical blend of pineapple, coconut, and passion fruit with a hint of lime',
     price: 12.99,
    image: 'https://images.squarespace-cdn.com/content/v1/60a3687912cea21e667234da/cdafc745-baa1-47d9-bc33-afd5235db4af/Drink03.jpg',
     category: 'signature',
     ingredients: ['Pineapple Juice', 'Coconut Cream', 'Passion Fruit', 'Fresh Lime', 'Agave Syrup'],
     preparationTime: 5,
     calories: 180,
    tags: ['Tropical', 'Creamy', 'Sweet'],
     isBestSeller: true
   },
    {
    id: '2',
    name: 'Berry Mojito',
    description: 'Fresh berries muddled with mint and lime, topped with sparkling water',
    price: 10.99,
    image: 'https://www.southernliving.com/thmb/CwYvneMNbiOfZhMgGhzTbtsEmC0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Blackberry_Mojito_011-1c8bd7ad9c6c4ab58e37f255343e677f.jpg',
    category: 'classic',
    ingredients: ['Mixed Berries', 'Fresh Mint', 'Lime', 'Simple Syrup', 'Sparkling Water'],
    preparationTime: 7,
    calories: 120,
    tags: ['Refreshing', 'Fruity', 'Sparkling'],
    isNew: true
  },
  {
    id: '3',
    name: 'Cucumber Cooler',
    description: 'Crisp cucumber and mint infused with elderflower and citrus notes',
    price: 11.99,
    image: 'https://www.southernliving.com/thmb/aWPzaVyuHWCx5XGWD8lm2rimymE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/27797_IK_GardenP_124-1-35456a684b184b1cbd6d988b23db4d37.jpg',
    category: 'signature',
    ingredients: ['Fresh Cucumber', 'Mint', 'Elderflower Cordial', 'Lime', 'Soda Water'],
    preparationTime: 6,
    calories: 90,
    tags: ['Refreshing', 'Light', 'Herbal']
  },
  {
    id: '4',
    name: 'Spiced Apple Fizz',
    description: 'Warm apple cider spices meet crisp sparkling apple cider',
    price: 13.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkQjvWaEfc0jjcPkpiAv5Ly26g6AAhcMR82A&s',
    category: 'seasonal',
    ingredients: ['Apple Cider', 'Cinnamon', 'Star Anise', 'Orange', 'Ginger Beer'],
    preparationTime: 8,
    calories: 150,
    tags: ['Spiced', 'Warm', 'Seasonal'],
    isBestSeller: true
  },
  {
    id: '5',
    name: 'Tropical Sunrise',
    description: 'Vibrant layers of orange, pineapple, and grenadine create a stunning visual',
    price: 11.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUbIVgOu2ZI8ft8H7S8UIW2ZXbwSF1HdQdeA&s',
    category: 'signature',
    ingredients: ['Orange Juice', 'Pineapple Juice', 'Grenadine', 'Lime', 'Ice'],
    preparationTime: 4,
    calories: 140,
    tags: ['Colorful', 'Sweet', 'Tropical']
  },
  {
    id: '6',
    name: 'Midnight Berry',
    description: 'Deep berry flavors with acai and blueberry, finished with lavender',
    price: 14.99,
    image: 'https://easybakery.net/wp-content/uploads/2014/07/capture-d_c3a9cran-2014-06-29-c3a0-17-11-57.png',
    category: 'premium',
    ingredients: ['Acai Berry', 'Blueberry', 'Blackberry', 'Lavender Syrup', 'Lemon'],
    preparationTime: 7,
    calories: 160,
    tags: ['Antioxidant', 'Rich', 'Floral'],
    isNew: true
  }
];

const Cocktails = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const { cartItems, addToCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 80,
        rotationX: 10,
        duration: 1.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1,
        },
      });

      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          rotationY: 15,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
          },
          delay: index * 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const setButtonRef = (id: string, el: HTMLButtonElement | null) => {
    buttonRefs.current[id] = el;
  };

  const handleAddToCart = (mocktail: Mocktail) => {
    addToCart(mocktail); // Use CartContext's addToCart directly

    // Animate the button
    const button = buttonRefs.current[mocktail.id];
    if (button) {
      gsap.to(button, {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
      });
    }
  };

  const getQuantity = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    return item?.quantity || 0;
  };

  const handleDecrement = (id: string) => {
    const currentQuantity = getQuantity(id);
    if (currentQuantity > 0) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  const handleIncrement = (id: string) => {
    const currentQuantity = getQuantity(id);
    updateQuantity(id, currentQuantity + 1);
  };

  const handleViewFullMenu = () => {
    navigate('/Fmenu');
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen px-6 py-32 bg-gradient-to-b from-background to-rich-black/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2
            ref={titleRef}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-gradient-gold mb-6"
            style={{
              textShadow: '0 0 30px rgba(255,215,0,0.3)',
            }}
          >
            Signature Mocktails
          </h2>
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Crafted with fresh ingredients and creative flair. Each mocktail tells a story of flavor and craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mocktails.map((mocktail) => (
            <div
              key={mocktail.id}
              ref={addToRefs}
              className="group relative bg-card/50 backdrop-blur-lg rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2">
                {mocktail.isBestSeller && (
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    <Star className="w-3 h-3" />
                    <span>Best Seller</span>
                  </div>
                )}
                {mocktail.isNew && (
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    <Zap className="w-3 h-3" />
                    <span>New</span>
                  </div>
                )}
              </div>

              <div className="relative aspect-square overflow-hidden">
                <img
                  src={mocktail.image}
                  alt={mocktail.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex justify-between items-center text-white text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{mocktail.preparationTime} min</span>
                    </div>
                    <span>{mocktail.calories} cal</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {mocktail.name}
                  </h3>
                  <div className="text-right">
                    <div className="font-display text-2xl font-bold text-gradient-gold">
                      ${mocktail.price.toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">per serving</div>
                  </div>
                </div>

                <p className="font-body text-muted-foreground mb-4 leading-relaxed">
                  {mocktail.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {mocktail.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Key Ingredients:</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {mocktail.ingredients.slice(0, 3).join(', ')}
                    {mocktail.ingredients.length > 3 && '...'}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleDecrement(mocktail.id)}
                      className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors disabled:opacity-50"
                      disabled={getQuantity(mocktail.id) === 0}
                    >
                      -
                    </button>
                    <span className="font-semibold text-foreground min-w-8 text-center">
                      {getQuantity(mocktail.id)}
                    </span>
                    <button
                      onClick={() => handleIncrement(mocktail.id)}
                      className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    ref={(el) => setButtonRef(mocktail.id, el)}
                    onClick={() => handleAddToCart(mocktail)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transform transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                    {getQuantity(mocktail.id) > 0 && (
                      <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                        {getQuantity(mocktail.id)}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-primary/0 via-accent/0 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={handleViewFullMenu}
            className="group relative overflow-hidden border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg tracking-wide hover:bg-primary hover:text-white transform transition-all duration-300"
          >
            <span className="relative z-10">View Full Menu</span>
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cocktails;