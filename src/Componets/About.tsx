import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Star, 
  Award, 
  Leaf, 
  Clock, 
  Truck, 
  Smartphone, 
  Users, 
  Gift,
  Heart,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import Navbar from '../Componets/Navbar.tsx';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const offersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });

      // Story section animation
      gsap.from(storyRef.current?.children || [], {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top 70%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      });

      // Process steps animation
      gsap.from(processRef.current?.children || [], {
        opacity: 0,
        x: -30,
        stagger: 0.3,
        duration: 1,
        scrollTrigger: {
          trigger: processRef.current,
          start: 'top 70%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Reviews animation
      gsap.from(reviewsRef.current?.children || [], {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: reviewsRef.current,
          start: 'top 70%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Offers animation
      gsap.from(offersRef.current?.children || [], {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        scrollTrigger: {
          trigger: offersRef.current,
          start: 'top 70%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Story features
  const storyFeatures = [
    {
      icon: Leaf,
      title: '100% Natural Ingredients',
      description: 'We use only fresh, organic fruits and herbs in our mocktails'
    },
    {
      icon: Award,
      title: 'Award-Winning Recipes',
      description: 'Our creations have been recognized by mixology experts worldwide'
    },
    {
      icon: Clock,
      title: 'Crafted with Patience',
      description: 'Each mocktail is carefully prepared to perfection'
    },
    {
      icon: Heart,
      title: 'Zero Alcohol, Full Flavor',
      description: 'Enjoy the complexity of cocktails without the alcohol'
    }
  ];

  // Process steps
  const processSteps = [
    {
      icon: Smartphone,
      step: '01',
      title: 'Browse Our Menu',
      description: 'Explore our curated collection of signature mocktails',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      step: '02',
      title: 'Order Online',
      description: 'Place your order through our easy-to-use platform',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Truck,
      step: '03',
      title: 'Enjoy Your Drink',
      description: 'Pick up at our bar or get delivery to your doorstep',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      image: '👩‍💼',
      rating: 5,
      text: 'The most creative mocktails I\'ve ever tasted! The Tropical Sunset is my absolute favorite.',
      featured: true
    },
    {
      name: 'Mike Chen',
      role: 'Food Blogger',
      image: '👨‍💻',
      rating: 5,
      text: 'As someone who doesn\'t drink alcohol, I finally found a place that takes mocktails seriously!',
      featured: false
    },
    {
      name: 'Emily Rodriguez',
      role: 'First-time Visitor',
      image: '👩‍🎨',
      rating: 5,
      text: 'The ambiance and drinks are incredible. Perfect for social gatherings without alcohol.',
      featured: false
    },
    {
      name: 'David Kim',
      role: 'Mocktail Enthusiast',
      image: '👨‍🍳',
      rating: 5,
      text: 'The ingredients are always fresh, and the flavor combinations are mind-blowing!',
      featured: true
    }
  ];

  // Special offers
  const specialOffers = [
    {
      icon: Gift,
      title: 'First Order 20% OFF!',
      description: 'Use code WELCOME20 on your first order',
      highlight: true,
      cta: 'Get Offer'
    },
    {
      icon: Users,
      title: 'Mocktail Club',
      description: 'Join our loyalty program and earn points for free drinks',
      highlight: false,
      cta: 'Join Now'
    },
    {
      icon: Sparkles,
      title: 'Seasonal Specials',
      description: 'Limited-time mocktails featuring seasonal ingredients',
      highlight: false,
      cta: 'View Menu'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-rich-black via-background to-rich-black"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <Navbar />
        {/* Header */}
        <div className="text-center mb-20">
          <h1
            ref={titleRef}
            className="font-display text-6xl md:text-8xl font-bold text-gradient-gold mb-6"
          >
            About Us
          </h1>
          <p className="text-xl text-amber-200/80 max-w-3xl mx-auto">
            Crafting extraordinary non-alcoholic experiences through innovative mixology, 
            premium ingredients, and passionate craftsmanship.
          </p>
        </div>

        {/* Our Story Section */}
        <div ref={storyRef} className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-amber-100 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-amber-200/80 mb-6">
                Founded in 2020, Elixir emerged from a simple belief: everyone deserves 
                to experience the artistry and sophistication of craft cocktails, regardless 
                of their choice to consume alcohol.
              </p>
              <p className="text-lg text-amber-200/80 mb-8">
                Our master mixologists spent years perfecting recipes that capture the 
                complexity and elegance of traditional cocktails while using only the 
                finest natural ingredients. From house-made syrups to freshly pressed 
                juices, every element is crafted with intention.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {storyFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-amber-100 mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-amber-200/70">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="group bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25 flex items-center gap-2">
                Learn More About Us
                <Sparkles className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
              </button>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden group">
                <div className="aspect-square bg-gradient-to-br from-amber-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                      <span className="text-6xl">🍹</span>
                    </div>
                    <h3 className="text-2xl font-bold text-amber-100 mb-2">
                      Our Craft
                    </h3>
                    <p className="text-amber-200/70">
                      Where artistry meets flavor in every glass
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-rich-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                  <button className="bg-amber-500 text-white px-6 py-2 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div ref={processRef} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-amber-100 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-amber-200/80 max-w-2xl mx-auto">
              Getting your perfect mocktail is simple and straightforward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={index}
                  className="group relative text-center p-8 rounded-3xl border border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-transparent backdrop-blur-sm hover:bg-amber-500/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/10"
                >
                  <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {step.step}
                  </div>
                  
                  <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-amber-100 mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-amber-200/70 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials Section */}
        <div ref={reviewsRef} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-amber-100 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-amber-200/80 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our delighted customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`group p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:scale-105 ${
                  testimonial.featured
                    ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10'
                    : 'bg-amber-500/5 border-amber-500/20 hover:bg-amber-500/10'
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-xl">
                    {testimonial.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-100">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-amber-200/70">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-amber-200/80 italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Special Offers Section */}
        <div ref={offersRef} className="text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-amber-100 mb-4">
            Special Offers
          </h2>
          <p className="text-xl text-amber-200/80 mb-12 max-w-2xl mx-auto">
            Enjoy exclusive benefits and discover why we're the preferred choice for mocktail enthusiasts
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {specialOffers.map((offer, index) => {
              const IconComponent = offer.icon;
              return (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:scale-105 ${
                    offer.highlight
                      ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/40 relative overflow-hidden'
                      : 'bg-amber-500/10 border-amber-500/20'
                  }`}
                >
                  {offer.highlight && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold rotate-12 shadow-lg">
                      Popular
                    </div>
                  )}
                  
                  <div className={`w-16 h-16 ${
                    offer.highlight ? 'bg-amber-500' : 'bg-amber-500/20'
                  } rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${
                      offer.highlight ? 'text-white' : 'text-amber-400'
                    }`} />
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-amber-100 mb-3">
                    {offer.title}
                  </h3>
                  
                  <p className="text-amber-200/70 mb-6">
                    {offer.description}
                  </p>
                  
                  <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    offer.highlight
                      ? 'bg-amber-500 text-white hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/25'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500 hover:text-white'
                  }`}>
                    {offer.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;