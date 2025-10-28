import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Phone } from 'lucide-react';
import { Button } from '../Componets/ui/button.tsx';
import Navbar from '../Componets/Navbar.tsx';

gsap.registerPlugin(ScrollTrigger);

const VisitUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          scrub: 1,
        },
      });

      gsap.from(contentRef.current, {
        opacity: 0,
        y: 40,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 75%',
          end: 'top 50%',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const locationInfo = [
    {
      icon: MapPin,
      title: 'Address',
      detail: '123 Mocktail Street, Downtown, NY 10001',
    },
    {
      icon: Clock,
      title: 'Hours',
      detail: 'Mon-Sat: 10AM - 8PM | Sun: 11AM - 6PM',
    },
    {
      icon: Phone,
      title: 'Phone',
      detail: '+1 (555) 123-4567',
    },
  ];

  return (
    <section
      id="visit"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-32"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-rich-black to-background" />

      <Navbar />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <h2
          ref={titleRef}
          className="font-display text-5xl md:text-7xl font-bold text-gradient-gold text-center mb-6"
        >
          Visit Our Store
        </h2>
        <p className="font-body text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Come experience our mocktails in person at our beautiful downtown location
        </p>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Location Info */}
          <div className="space-y-6">
            {locationInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {info.title}
                  </h3>
                  <p className="font-body text-muted-foreground">
                    {info.detail}
                  </p>
                </div>
              </div>
            ))}

            <Button size="lg" className="w-full">
              Get Directions
            </Button>
          </div>

          {/* Map Placeholder */}
          <div className="rounded-lg overflow-hidden border border-border bg-card/50 backdrop-blur-sm h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Store Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitUs;