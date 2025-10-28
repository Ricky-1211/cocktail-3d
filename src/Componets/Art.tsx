import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Brush, Sparkles, Eye, Target, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Unique type definitions for art pieces
type ArtTechnique = 'fluid' | 'layered' | 'smoked' | 'crystal' | 'flamed' | 'garnished';
type DifficultyLevel = 'beginner' | 'intermediate' | 'expert' | 'master';
type SensoryExperience = 'visual' | 'aromatic' | 'textural' | 'flavor' | 'theatrical';

interface ArtPiece {
  id: string;
  title: string;
  description: string;
  technique: ArtTechnique;
  difficulty: DifficultyLevel;
  sensoryFocus: SensoryExperience[];
  icon: JSX.Element;
  color: string;
  gradient: string;
  features: string[];
  duration: string;
  tools: string[];
}

const Art = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced title animation with 3D effect
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 80,
        rotationX: 15,
        duration: 1.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1,
        },
      });

      // Staggered card animations with 3D effects
      gsap.from(cardsRef.current?.children || [], {
        opacity: 0,
        y: 60,
        rotationY: 20,
        stagger: 0.3,
        duration: 1.2,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1,
        },
      });

      // Floating particles animation
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        gsap.fromTo(particles,
          {
            opacity: 0,
            scale: 0,
          },
          {
            opacity: 1,
            scale: 1,
            y: -100,
            duration: 3,
            stagger: 0.1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          }
        );
      }

      // Hover animations for cards
      cardsRef.current?.childNodes.forEach((card) => {
        gsap.to(card, {
          y: -10,
          duration: 0.3,
          paused: true,
          ease: 'power2.out',
        });

        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -10, duration: 0.3 });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, duration: 0.3 });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const artPieces: ArtPiece[] = [
    {
      id: 'fluid-artistry',
      title: 'Fluid Artistry',
      description: 'Master the dance of liquids with precision pouring and swirling techniques that create mesmerizing patterns in every glass.',
      technique: 'fluid',
      difficulty: 'expert',
      sensoryFocus: ['visual', 'textural'],
      icon: <Palette className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-400',
      gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-400/20',
      features: ['Layered Colors', 'Swirl Patterns', 'Precision Pouring'],
      duration: '5-8 minutes',
      tools: ['Jigger', 'Pouring Spouts', 'Lighting']
    },
    {
      id: 'smoked-elegance',
      title: 'Smoked Elegance',
      description: 'Infuse cocktails with aromatic smoke using different woods and herbs to create multi-sensory experiences.',
      technique: 'smoked',
      difficulty: 'intermediate',
      sensoryFocus: ['aromatic', 'theatrical'],
      icon: <Sparkles className="w-8 h-8" />,
      color: 'from-amber-600 to-orange-400',
      gradient: 'bg-gradient-to-br from-amber-600/20 to-orange-400/20',
      features: ['Wood Selection', 'Smoke Density', 'Aroma Control'],
      duration: '3-5 minutes',
      tools: ['Smoking Gun', 'Cloche', 'Different Woods']
    },
    {
      id: 'crystal-clarity',
      title: 'Crystal Clarity',
      description: 'Achieve perfect clarity and purity through advanced filtration and clarification methods.',
      technique: 'crystal',
      difficulty: 'master',
      sensoryFocus: ['visual', 'flavor'],
      icon: <Eye className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-400',
      gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-400/20',
      features: ['Milk Washing', 'Agar Filtration', 'Centrifuge'],
      duration: '24-48 hours',
      tools: ['Filters', 'Centrifuge', 'Clarifying Agents']
    },
    {
      id: 'layered-perfection',
      title: 'Layered Perfection',
      description: 'Create stunning visual depth by carefully layering liquids of different densities and colors.',
      technique: 'layered',
      difficulty: 'intermediate',
      sensoryFocus: ['visual', 'textural'],
      icon: <Brush className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-400',
      gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-400/20',
      features: ['Density Control', 'Color Theory', 'Pouring Techniques'],
      duration: '2-4 minutes',
      tools: ['Bar Spoon', 'Back of Spoon', 'Graduated Glass']
    },
    {
      id: 'flamed-drama',
      title: 'Flamed Drama',
      description: 'Add theatrical flair with controlled flame techniques that caramelize sugars and release aromas.',
      technique: 'flamed',
      difficulty: 'expert',
      sensoryFocus: ['theatrical', 'aromatic'],
      icon: <Target className="w-8 h-8" />,
      color: 'from-red-500 to-orange-400',
      gradient: 'bg-gradient-to-br from-red-500/20 to-orange-400/20',
      features: ['Safety Control', 'Flame Types', 'Timing Precision'],
      duration: '1-2 minutes',
      tools: ['Torch', 'High-proof Spirits', 'Heat-resistant Surface']
    },
    {
      id: 'garnish-mastery',
      title: 'Garnish Mastery',
      description: 'Transform cocktails with artistic garnishes that enhance both flavor and visual appeal.',
      technique: 'garnished',
      difficulty: 'beginner',
      sensoryFocus: ['visual', 'flavor'],
      icon: <Heart className="w-8 h-8" />,
      color: 'from-rose-500 to-pink-400',
      gradient: 'bg-gradient-to-br from-rose-500/20 to-pink-400/20',
      features: ['Fruit Carving', 'Herb Selection', 'Edible Flowers'],
      duration: '1-3 minutes',
      tools: ['Channel Knife', 'Peeler', 'Herb Scissors']
    }
  ];

  const getDifficultyColor = (difficulty: DifficultyLevel): string => {
    const colors = {
      beginner: 'text-green-400',
      intermediate: 'text-yellow-400',
      expert: 'text-orange-400',
      master: 'text-red-400'
    };
    return colors[difficulty];
  };

  const renderParticles = () => {
    return Array.from({ length: 12 }, (_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-gradient-to-r from-primary/30 to-accent/30"
        style={{
          width: `${Math.random() * 8 + 4}px`,
          height: `${Math.random() * 8 + 4}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.6 + 0.2,
        }}
      />
    ));
  };

  return (
    <section
      id="art"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-rich-black/95 to-background" />
      
      {/* Animated Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {renderParticles()}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary/20 rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-accent/20 rounded-full animate-pulse delay-1000" />
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-primary/30 rounded-full animate-pulse delay-500" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Enhanced Title */}
        <div className="text-center mb-20">
          <h2
            ref={titleRef}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-gradient-gold mb-6"
            style={{
              textShadow: '0 0 30px rgba(255,215,0,0.3)',
            }}
          >
            The Artistry
          </h2>
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Discover the sophisticated techniques and creative processes behind masterful cocktail creation
          </p>
        </div>

        {/* Enhanced Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artPieces.map((piece) => (
            <div
              key={piece.id}
              className="group relative p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-lg hover:bg-card/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 ${piece.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
              
              {/* Header */}
              <div className="relative flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${piece.color} text-white`}>
                    {piece.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {piece.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs font-semibold ${getDifficultyColor(piece.difficulty)}`}>
                        {piece.difficulty.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{piece.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="relative font-body text-muted-foreground mb-4 leading-relaxed">
                {piece.description}
              </p>

              {/* Sensory Focus */}
              <div className="relative mb-4">
                <div className="flex flex-wrap gap-2">
                  {piece.sensoryFocus.map((sense) => (
                    <span
                      key={sense}
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {sense}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="relative mb-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">Key Features:</h4>
                <ul className="space-y-1">
                  {piece.features.map((feature, index) => (
                    <li key={index} className="text-xs text-muted-foreground flex items-center">
                      <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools */}
              <div className="relative">
                <h4 className="text-sm font-semibold text-foreground mb-2">Essential Tools:</h4>
                <div className="flex flex-wrap gap-2">
                  {piece.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-background/50 text-muted-foreground rounded-lg border border-border"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-primary/0 via-accent/0 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <button className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-full font-semibold text-lg tracking-wide hover:scale-105 transform transition-all duration-300 hover:shadow-2xl hover:shadow-primary/25">
            <span className="relative z-10">Begin Your Mixology Journey</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Art;