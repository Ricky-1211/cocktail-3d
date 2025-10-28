import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MoctalPanelProps {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
}

const MoctalPanel = ({ id, image, title, subtitle, description }: MoctalPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={panelRef}
      className="moctal-panel relative w-screen h-screen flex-shrink-0 flex items-center justify-center perspective-1000"
      data-panel-id={id}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transform-gpu transition-transform duration-1000"
        style={{
          backgroundImage: `url(${image})`,
          transform: 'translateZ(0)',
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
      </div>

      {/* 3D Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center text-white transform-gpu transition-all duration-1000 max-w-4xl mx-auto px-8"
      >
        <div className="bg-gradient-to-br from-amber-500/20 to-purple-500/20 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
          <h2 className="font-display text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-amber-300 to-purple-300 bg-clip-text text-transparent">
            {title}
          </h2>
          {subtitle && (
            <p className="text-2xl md:text-3xl text-amber-200 mb-6 font-light">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-lg text-amber-100/80 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Panel Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-amber-200/60">
        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-mono">0{id}</span>
      </div>
    </section>
  );
};

const MoctalGallery = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const initLenis = async () => {
      try {
        const Lenis = (await import('@studio-freight/lenis')).default;
        
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
          direction: 'horizontal', // Enable horizontal scrolling
        });

        let rafId = 0;
        function frame(time: number) {
          lenis.raf(time);
          rafId = requestAnimationFrame(frame);
        }
        rafId = requestAnimationFrame(frame);

        return () => {
          cancelAnimationFrame(rafId);
          lenis.destroy();
        };
      } catch (error) {
        console.warn('Lenis not available, using native scrolling');
      }
    };

    initLenis();
  }, []);

  const moctalPanels: MoctalPanelProps[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'AURORA',
      subtitle: 'Northern Lights Elixir',
      description: 'A mesmerizing blend of blueberry and lavender with sparkling elderflower essence'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'SUNSET',
      subtitle: 'Tropical Paradise Mix',
      description: 'Passion fruit, mango, and pineapple fusion with a hint of chili spice'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2066&q=80',
      title: 'MOONLIGHT',
      subtitle: 'Midnight Serenade',
      description: 'Blackberry and mint infused with activated charcoal and lime zest'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2066&q=80',
      title: 'FOREST',
      subtitle: 'Emerald Canopy',
      description: 'Matcha green tea, cucumber, and basil with honeydew melon undertones'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      title: 'VOLCANO',
      subtitle: 'Spicy Ginger Blaze',
      description: 'Fresh ginger, turmeric, and citrus with a cayenne pepper kick'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2057&q=80',
      title: 'OCEAN',
      subtitle: 'Deep Blue Dream',
      description: 'Butterfly pea flower, coconut, and lychee with sea salt foam'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!horizontalRef.current || !containerRef.current) return;

      const panels = gsap.utils.toArray('.moctal-panel') as HTMLElement[];
      const totalWidth = panels.length * window.innerWidth;

      // Set up horizontal scrolling
      gsap.to(horizontalRef.current, {
        x: () => - (totalWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Individual panel animations
      panels.forEach((panel, index) => {
        const content = panel.querySelector('.relative.z-10') as HTMLElement;
        const background = panel.querySelector('.absolute.inset-0') as HTMLElement;

        // Initial state
        gsap.set(panel, {
          opacity: 0,
          rotationY: -30,
          scale: 0.8,
          transformPerspective: 1000,
        });

        gsap.set(content, {
          x: 100,
          opacity: 0,
          scale: 0.9,
        });

        gsap.set(background, {
          scale: 1.2,
        });

        // Create scroll trigger for each panel with horizontal positioning
        ScrollTrigger.create({
          trigger: panel,
          start: () => `left ${window.innerWidth * 0.3}`,
          end: () => `left ${-window.innerWidth * 0.3}`,
          scrub: 1,
          containerAnimation: ScrollTrigger.getById('horizontal') as any,
          onEnter: () => {
            gsap.to(panel, {
              opacity: 1,
              rotationY: 0,
              scale: 1,
              duration: 1.5,
              ease: 'power2.out',
            });

            gsap.to(content, {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: 'back.out(1.7)',
              delay: 0.3,
            });

            gsap.to(background, {
              scale: 1,
              duration: 2,
              ease: 'power2.out',
            });
          },
          onEnterBack: () => {
            gsap.to(panel, {
              opacity: 1,
              rotationY: 0,
              scale: 1,
              duration: 1.5,
              ease: 'power2.out',
            });

            gsap.to(content, {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: 'back.out(1.7)',
              delay: 0.3,
            });
          },
          onLeave: () => {
            gsap.to(panel, {
              opacity: 0,
              rotationY: 30,
              scale: 0.9,
              duration: 1,
              ease: 'power2.in',
            });

            gsap.to(content, {
              x: -100,
              opacity: 0,
              scale: 0.8,
              duration: 0.8,
              ease: 'power2.in',
            });
          },
          onLeaveBack: () => {
            gsap.to(panel, {
              opacity: 0,
              rotationY: -30,
              scale: 0.9,
              duration: 1,
              ease: 'power2.in',
            });

            gsap.to(content, {
              x: 100,
              opacity: 0,
              scale: 0.8,
              duration: 0.8,
              ease: 'power2.in',
            });
          },
        });

        // Add hover effects
        const handleMouseEnter = () => {
          gsap.to(content, {
            x: -10,
            scale: 1.05,
            duration: 0.6,
            ease: 'power2.out',
          });

          gsap.to(background, {
            scale: 1.1,
            duration: 0.8,
            ease: 'power2.out',
          });
        };

        const handleMouseLeave = () => {
          gsap.to(content, {
            x: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
          });

          gsap.to(background, {
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
          });
        };

        panel.addEventListener('mouseenter', handleMouseEnter);
        panel.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup event listeners
        return () => {
          panel.removeEventListener('mouseenter', handleMouseEnter);
          panel.removeEventListener('mouseleave', handleMouseLeave);
        };
      });

    }, galleryRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={galleryRef}
      className="relative moctal-gallery bg-gradient-to-b from-rich-black via-purple-900/20 to-rich-black overflow-hidden"
    >
      <div
        ref={horizontalRef}
        className="horizontal-container flex relative"
        style={{
          width: `${moctalPanels.length * 100}vw`,
        }}
      >
        <div
          ref={containerRef}
          className="moctal-container flex relative"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          {moctalPanels.map((panel) => (
            <MoctalPanel
              key={panel.id}
              id={panel.id}
              image={panel.image}
              title={panel.title}
              subtitle={panel.subtitle}
              description={panel.description}
            />
          ))}
        </div>
      </div>

      {/* Scroll Instruction - Updated for horizontal */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 text-amber-200/70">
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-6 border-2 border-amber-400/50 rounded-full flex justify-center relative">
            <div className="w-3 h-1 bg-amber-400/70 rounded-full mt-2 animate-bounce-horizontal"></div>
          </div>
          <span className="text-xs font-mono tracking-widest">SWIPE</span>
        </div>
      </div>

      {/* Custom CSS for horizontal bounce animation */}
      <style jsx>{`
        @keyframes bounce-horizontal {
          0%, 100% {
            transform: translateX(-25%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateX(25%);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        .animate-bounce-horizontal {
          animation: bounce-horizontal 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default MoctalGallery;