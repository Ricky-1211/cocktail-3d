import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Menu = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !menuRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial visible state
      gsap.set([titleRef.current, menuRef.current?.children], {
        opacity: 1,
        visibility: 'visible',
      });

      gsap.from(titleRef.current, {
        opacity: 0,
        y: 60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
          toggleActions: 'play none none reverse',
        },
      });

      if (menuRef.current?.children) {
        gsap.from(Array.from(menuRef.current.children), {
          opacity: 0,
          x: -30,
          stagger: 0.15,
          scrollTrigger: {
            trigger: menuRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Refresh ScrollTrigger after a short delay to ensure proper calculation
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const menuItems = [
    { name: 'Classic Old Fashioned', price: '$16', description: 'Bourbon, bitters, sugar, orange' },
    { name: 'Negroni Sbagliato', price: '$14', description: 'Prosecco, Campari, sweet vermouth' },
    { name: 'Espresso Martini', price: '$15', description: 'Vodka, coffee liqueur, espresso' },
    { name: 'Whiskey Sour', price: '$14', description: 'Whiskey, lemon, sugar, egg white' },
    { name: 'Aperol Spritz', price: '$13', description: 'Aperol, prosecco, soda' },
    { name: 'French 75', price: '$16', description: 'Gin, champagne, lemon, sugar' },
  ];

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-32"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-rich-black via-background to-rich-black" />
      
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <h2
          ref={titleRef}
          className="font-display text-5xl md:text-7xl font-bold text-gradient-gold text-center mb-16 opacity-100"
        >
          Our Menu
        </h2>

        <div ref={menuRef} className="space-y-6 opacity-100">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="group flex justify-between items-start p-6 rounded-lg border border-border bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300"
            >
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {item.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <span className="font-display text-2xl font-bold text-primary ml-6">
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
