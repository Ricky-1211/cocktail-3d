import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles } from 'lucide-react';
import heroImage from '../assets/hero-cocktail.jpg';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with 3D effect
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 100,
        rotationX: 45,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.3,
      });

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.8,
      });

      // Glass reflection animation
      gsap.from(glassRef.current, {
        opacity: 0,
        x: -100,
        rotationY: 30,
        duration: 1.4,
        ease: 'power2.out',
        delay: 0.5,
      });

      // Bubbles animation
      if (bubblesRef.current) {
        const bubbles = bubblesRef.current.children;
        gsap.from(bubbles, {
          opacity: 0,
          scale: 0,
          y: 100,
          stagger: 0.1,
          duration: 1,
          ease: 'back.out(1.7)',
          delay: 1,
        });

        // Floating bubbles animation
        gsap.to(bubbles, {
          y: -20,
          duration: 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.2,
        });
      }

      // Particles animation
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        gsap.from(particles, {
          opacity: 0,
          scale: 0,
          rotation: 360,
          duration: 1.5,
          stagger: 0.05,
          delay: 0.7,
        });
      }

      // Enhanced parallax effect
      gsap.to(imageRef.current, {
        y: 300,
        scale: 1.2,
        rotation: 0.5,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // 3D tilt effect on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        gsap.to(heroRef.current, {
          rotationY: x * 0.5,
          rotationX: -y * 0.5,
          transformPerspective: 1000,
          ease: 'power2.out',
          duration: 1,
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Fade out elements on scroll
      gsap.to([titleRef.current, subtitleRef.current, glassRef.current], {
        opacity: 0,
        y: -80,
        rotationX: -20,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'center top',
          scrub: 1,
        },
      });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Create bubbles
  const renderBubbles = () => {
    return Array.from({ length: 8 }, (_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-gradient-to-br from-primary/30 to-accent/20 backdrop-blur-sm border border-white/10"
        style={{
          width: `${Math.random() * 30 + 10}px`,
          height: `${Math.random() * 30 + 10}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ));
  };

  // Create particles
  const renderParticles = () => {
    return Array.from({ length: 15 }, (_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-gradient-to-r from-primary to-accent"
        style={{
          width: `${Math.random() * 6 + 2}px`,
          height: `${Math.random() * 6 + 2}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.5 + 0.3,
        }}
      />
    ));
  };

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center cursor-default"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Enhanced Background with Multiple Layers */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'translateZ(0)',
        }}
      >
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-transparent to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        
        {/* Animated light beams */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-10 w-1/3 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent rotate-45 animate-pulse" />
          <div className="absolute top-1/3 -right-10 w-1/3 h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent -rotate-45 animate-pulse delay-1000" />
        </div>
      </div>

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {renderParticles()}
      </div>

      {/* Glass Reflection Effect */}
      <div
        ref={glassRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(135deg, 
              transparent 0%, 
              rgba(255,255,255,0.1) 45%, 
              rgba(255,255,255,0.2) 50%, 
              rgba(255,255,255,0.1) 55%, 
              transparent 100%
            )
          `,
          mask: 'linear-gradient(black, transparent 70%)',
          transform: 'translateZ(20px)',
        }}
      />

      {/* Content Container with 3D Depth */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto" style={{ transform: 'translateZ(50px)' }}>
        {/* Main Title with Enhanced Effects */}
        <div className="relative inline-block">
          <Sparkles className="absolute -top-4 -left-4 w-8 h-8 text-primary animate-spin-slow" />
          <Sparkles className="absolute -bottom-4 -right-4 w-8 h-8 text-accent animate-spin-slow delay-500" />
          
          <h1
            ref={titleRef}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-gradient-gold mb-6 glow-gold relative"
            style={{
              textShadow: `
                0 0 30px rgba(255,215,0,0.3),
                0 0 60px rgba(255,215,0,0.2),
                0 0 90px rgba(255,215,0,0.1)
              `,
              transform: 'translateZ(40px)',
            }}
          >
            ELIXIR
          </h1>
        </div>

        {/* Subtitle with Enhanced Styling */}
        <p
          ref={subtitleRef}
          className="font-body text-xl md:text-2xl lg:text-3xl text-foreground/90 tracking-wide mb-8 relative"
          style={{ transform: 'translateZ(30px)' }}
        >
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            The Art of Mixology
          </span>
        </p>

        {/* CTA Button */}
        <button
          className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-full font-semibold text-lg tracking-wide hover:scale-105 transform transition-all duration-300 hover:shadow-2xl hover:shadow-primary/25"
          style={{ transform: 'translateZ(20px)' }}
        >
          <span className="relative z-10">Discover Cocktails</span>
          <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>

      {/* Animated Bubbles */}
      <div ref={bubblesRef} className="absolute inset-0 pointer-events-none">
        {renderBubbles()}
      </div>

      {/* Enhanced Scroll Indicator */}
      <div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce group cursor-pointer"
        style={{ transform: 'translateZ(10px)' }}
      >
        <div className="relative">
          <ChevronDown className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300 relative z-10" />
          <div className="absolute inset-0 w-12 h-12 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
        </div>
        <p className="text-sm text-foreground/60 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Scroll to explore
        </p>
      </div>
    </section>
  );
};

export default Hero;