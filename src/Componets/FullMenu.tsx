import { useState, useMemo } from 'react';
import { useCart } from '../pages/CartContext.tsx';
import Navbar from '../Componets/Navbar.tsx';
import { ShoppingCart, Star, Clock, Zap, Filter, Search } from 'lucide-react';

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

const fullMocktails: Mocktail[] = [
  // Original 6 mocktails
  {
    id: '1',
    name: 'Sunset Bliss',
    description: 'A tropical blend of pineapple, coconut, and passion fruit with a hint of lime',
    price: 12.99,
    image: 'https://heybairtender.s3.amazonaws.com/recipes/sunset-bliss5823.png',
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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNkHcli-ZSniKnGUWi2tADa_dRtmkjUSWaxA&s',
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
  },
  // Additional 19 mocktails to make 25 total
  {
    id: '7',
    name: 'Mango Tango',
    description: 'Sweet mango puree with tangy lime and spicy ginger',
    price: 11.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMsVh_djmFtJueSlIhQeTr5CSE5xg7ePaEPw&s',
    category: 'signature',
    ingredients: ['Mango Puree', 'Fresh Lime', 'Ginger Syrup', 'Soda Water', 'Mint'],
    preparationTime: 5,
    calories: 160,
    tags: ['Tropical', 'Spicy', 'Sweet'],
    isBestSeller: true
  },
  {
    id: '8',
    name: 'Citrus Splash',
    description: 'A refreshing blend of orange, grapefruit, and lemon with a hint of rosemary',
    price: 10.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV5CSsyo8q3QenJXvM1WEM2VC3OVoupJm9OA&s',
    category: 'classic',
    ingredients: ['Orange Juice', 'Grapefruit Juice', 'Lemon', 'Rosemary', 'Sparkling Water'],
    preparationTime: 4,
    calories: 110,
    tags: ['Citrus', 'Refreshing', 'Herbal']
  },
  {
    id: '9',
    name: 'Pomegranate Sparkler',
    description: 'Antioxidant-rich pomegranate with lime and mint',
    price: 13.99,
    image: '/api/placeholder/400/400',
    category: 'premium',
    ingredients: ['Pomegranate Juice', 'Lime', 'Mint', 'Simple Syrup', 'Soda Water'],
    preparationTime: 6,
    calories: 130,
    tags: ['Antioxidant', 'Tart', 'Refreshing'],
    isNew: true
  },
  {
    id: '10',
    name: 'Vanilla Berry',
    description: 'Mixed berries infused with vanilla and lime',
    price: 12.99,
    image: '/api/placeholder/400/400',
    category: 'signature',
    ingredients: ['Mixed Berries', 'Vanilla Syrup', 'Lime', 'Sparkling Water', 'Ice'],
    preparationTime: 5,
    calories: 140,
    tags: ['Sweet', 'Creamy', 'Fruity']
  },
  {
    id: '11',
    name: 'Green Detox',
    description: 'Kale, spinach, apple, and lemon for a healthy boost',
    price: 14.99,
    image: '/api/placeholder/400/400',
    category: 'premium',
    ingredients: ['Kale', 'Spinach', 'Apple', 'Lemon', 'Ginger'],
    preparationTime: 7,
    calories: 80,
    tags: ['Healthy', 'Green', 'Detox']
  },
  {
    id: '12',
    name: 'Watermelon Wave',
    description: 'Fresh watermelon with mint and lime',
    price: 10.99,
    image: '/api/placeholder/400/400',
    category: 'seasonal',
    ingredients: ['Fresh Watermelon', 'Mint', 'Lime', 'Simple Syrup', 'Ice'],
    preparationTime: 6,
    calories: 120,
    tags: ['Refreshing', 'Summer', 'Light']
  },
  {
    id: '13',
    name: 'Coconut Dream',
    description: 'Creamy coconut with pineapple and vanilla',
    price: 13.99,
    image: '/api/placeholder/400/400',
    category: 'signature',
    ingredients: ['Coconut Cream', 'Pineapple Juice', 'Vanilla', 'Ice', 'Lime'],
    preparationTime: 5,
    calories: 190,
    tags: ['Creamy', 'Tropical', 'Sweet']
  },
  {
    id: '14',
    name: 'Ginger Zest',
    description: 'Spicy ginger with citrus and honey',
    price: 11.99,
    image: '/api/placeholder/400/400',
    category: 'classic',
    ingredients: ['Fresh Ginger', 'Lemon', 'Orange', 'Honey', 'Sparkling Water'],
    preparationTime: 6,
    calories: 100,
    tags: ['Spicy', 'Warm', 'Citrus']
  },
  {
    id: '15',
    name: 'Blue Lagoon',
    description: 'Blue curaçao with lemon and lime',
    price: 12.99,
    image: '/api/placeholder/400/400',
    category: 'signature',
    ingredients: ['Blue Curaçao', 'Lemon', 'Lime', 'Simple Syrup', 'Soda Water'],
    preparationTime: 4,
    calories: 150,
    tags: ['Colorful', 'Citrus', 'Sweet']
  },
  {
    id: '16',
    name: 'Autumn Spice',
    description: 'Apple cider with autumn spices and orange',
    price: 13.99,
    image: '/api/placeholder/400/400',
    category: 'seasonal',
    ingredients: ['Apple Cider', 'Cinnamon', 'Nutmeg', 'Orange', 'Cloves'],
    preparationTime: 8,
    calories: 140,
    tags: ['Spiced', 'Warm', 'Seasonal']
  },
  {
    id: '17',
    name: 'Tropical Storm',
    description: 'Passion fruit, mango, and orange with a spicy kick',
    price: 14.99,
    image: '/api/placeholder/400/400',
    category: 'premium',
    ingredients: ['Passion Fruit', 'Mango', 'Orange', 'Chili', 'Lime'],
    preparationTime: 7,
    calories: 170,
    tags: ['Spicy', 'Tropical', 'Complex']
  },
  {
    id: '18',
    name: 'Mint Julep',
    description: 'Fresh mint with lime and simple syrup',
    price: 10.99,
    image: '/api/placeholder/400/400',
    category: 'classic',
    ingredients: ['Fresh Mint', 'Lime', 'Simple Syrup', 'Crushed Ice', 'Soda Water'],
    preparationTime: 5,
    calories: 90,
    tags: ['Refreshing', 'Minty', 'Classic']
  },
  {
    id: '19',
    name: 'Ruby Red',
    description: 'Grapefruit with cranberry and lime',
    price: 11.99,
    image: '/api/placeholder/400/400',
    category: 'signature',
    ingredients: ['Grapefruit Juice', 'Cranberry Juice', 'Lime', 'Simple Syrup', 'Ice'],
    preparationTime: 4,
    calories: 110,
    tags: ['Tart', 'Refreshing', 'Red']
  },
  {
    id: '20',
    name: 'Honey Lemon',
    description: 'Fresh lemon with honey and thyme',
    price: 10.99,
    image: '/api/placeholder/400/400',
    category: 'classic',
    ingredients: ['Fresh Lemon', 'Honey', 'Thyme', 'Sparkling Water', 'Ice'],
    preparationTime: 5,
    calories: 95,
    tags: ['Sweet', 'Citrus', 'Herbal']
  },
  {
    id: '21',
    name: 'Peach Paradise',
    description: 'Fresh peach puree with vanilla and lemon',
    price: 12.99,
    image: '/api/placeholder/400/400',
    category: 'signature',
    ingredients: ['Peach Puree', 'Vanilla Syrup', 'Lemon', 'Sparkling Water', 'Mint'],
    preparationTime: 6,
    calories: 150,
    tags: ['Sweet', 'Fruity', 'Creamy']
  },
  {
    id: '22',
    name: 'Winter Berry',
    description: 'Mixed winter berries with cinnamon and orange',
    price: 13.99,
    image: '/api/placeholder/400/400',
    category: 'seasonal',
    ingredients: ['Winter Berries', 'Cinnamon', 'Orange', 'Simple Syrup', 'Sparkling Water'],
    preparationTime: 7,
    calories: 130,
    tags: ['Seasonal', 'Spiced', 'Berry']
  },
  {
    id: '23',
    name: 'Lavender Lemonade',
    description: 'Fresh lemonade with lavender syrup',
    price: 12.99,
    image: '/api/placeholder/400/400',
    category: 'premium',
    ingredients: ['Fresh Lemon', 'Lavender Syrup', 'Sparkling Water', 'Ice', 'Lavender Sprig'],
    preparationTime: 5,
    calories: 120,
    tags: ['Floral', 'Refreshing', 'Elegant']
  },
  {
    id: '24',
    name: 'Tropical Breeze',
    description: 'Pineapple, coconut, and banana smoothie style',
    price: 13.99,
    image: '/api/placeholder/400/400',
    category: 'signature',
    ingredients: ['Pineapple', 'Coconut Milk', 'Banana', 'Honey', 'Ice'],
    preparationTime: 6,
    calories: 200,
    tags: ['Creamy', 'Tropical', 'Smoothie']
  },
  {
    id: '25',
    name: 'Citrus Mint',
    description: 'Orange, lemon, and lime with fresh mint',
    price: 10.99,
    image: '/api/placeholder/400/400',
    category: 'classic',
    ingredients: ['Orange', 'Lemon', 'Lime', 'Fresh Mint', 'Sparkling Water'],
    preparationTime: 4,
    calories: 100,
    tags: ['Citrus', 'Minty', 'Refreshing']
  }
];

const FullMenu = () => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  const filteredMocktails = useMemo(() => {
    let filtered = fullMocktails.filter(mocktail => 
      mocktail.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mocktail.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mocktail.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(mocktail => mocktail.category === selectedCategory);
    }

    // Sort the results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'calories':
          return a.calories - b.calories;
        case 'preparationTime':
          return a.preparationTime - b.preparationTime;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const getQuantity = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    return item?.quantity || 0;
  };

  const handleAddToCart = (mocktail: Mocktail) => {
    addToCart(mocktail);
  };

  const handleIncreaseQuantity = (id: string) => {
    const currentQuantity = getQuantity(id);
    if (currentQuantity === 0) {
      const mocktail = fullMocktails.find(m => m.id === id);
      if (mocktail) {
        addToCart(mocktail);
      }
    } else {
      updateQuantity(id, currentQuantity + 1);
    }
  };

  const handleDecreaseQuantity = (id: string) => {
    const currentQuantity = getQuantity(id);
    if (currentQuantity > 0) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  const categories = ['all', 'classic', 'signature', 'seasonal', 'premium'];

  return (
    
    <div className="min-h-screen bg-gradient-to-b from-background to-rich-black/50 py-20 px-6">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-6xl md:text-8xl font-bold text-gradient-gold mb-6">
          Order Online
          </h1>
          <p className="font-body text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our complete collection of 25 handcrafted mocktails
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 p-6 bg-card/50 backdrop-blur-lg rounded-2xl border border-border/50">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search mocktails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="calories">Calories: Low to High</option>
              <option value="preparationTime">Prep Time: Low to High</option>
            </select>
          </div>
        </div>

        {/* Mocktails Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMocktails.map((mocktail) => (
            <div
              key={mocktail.id}
              className="group relative bg-card/50 backdrop-blur-lg rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden"
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
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {mocktail.name}
                  </h3>
                  <div className="text-right">
                    <div className="font-display text-xl font-bold text-gradient-gold">
                      ${mocktail.price.toFixed(2)}
                    </div>
                  </div>
                </div>

                <p className="font-body text-sm text-muted-foreground mb-3 line-clamp-2">
                  {mocktail.description}
                </p>

                <div className="flex justify-between items-center text-xs text-muted-foreground mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{mocktail.preparationTime} min</span>
                  </div>
                  <span>{mocktail.calories} cal</span>
                  <span className="capitalize">{mocktail.category}</span>
                </div>

                <div className="flex items-center justify-between">
                  {getQuantity(mocktail.id) === 0 ? (
                    <button
                      onClick={() => handleAddToCart(mocktail)}
                      className="w-full flex items-center justify-center space-x-1 bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-full font-semibold hover:scale-105 transform transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 text-sm"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-3 w-full">
                      <button
                        onClick={() => handleDecreaseQuantity(mocktail.id)}
                        className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors text-sm font-bold"
                      >
                        -
                      </button>
                      <span className="font-semibold text-foreground min-w-8 text-center text-base">
                        {getQuantity(mocktail.id)}
                      </span>
                      <button
                        onClick={() => handleIncreaseQuantity(mocktail.id)}
                        className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors text-sm font-bold"
                      >
                        +
                      </button>
                      <span className="ml-auto text-sm text-muted-foreground">
                        ${(mocktail.price * getQuantity(mocktail.id)).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMocktails.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No mocktails found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullMenu;