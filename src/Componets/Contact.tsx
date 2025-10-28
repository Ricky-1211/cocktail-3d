import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Phone, Mail, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

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

      gsap.from(infoRef.current, {
        opacity: 0,
        scale: 0.8,
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      });

      gsap.from(contactRef.current?.children || [], {
        opacity: 0,
        x: -30,
        stagger: 0.15,
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 75%',
          end: 'top 45%',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactMethods = [
    { 
      icon: Phone,
      title: 'Call Us', 
      description: '(555) 123-ELIXIR',
      subtext: 'Direct line to our bar',
      action: 'tel:5551233549',
      buttonText: 'Call Now'
    },
    { 
      icon: Mail,
      title: 'Email Us', 
      description: 'hello@elixir.com',
      subtext: 'General inquiries & events',
      action: 'mailto:hello@elixir.com',
      buttonText: 'Send Email'
    },
    { 
      icon: MessageCircle,
      title: 'Social Media', 
      description: '@elixirbar',
      subtext: 'Follow us for updates',
      action: 'https://instagram.com',
      buttonText: 'Follow Us'
    },
  ];

  const visitInfo = [
    {
      icon: MapPin,
      title: 'Our Location',
      description: '123 Cocktail Lane, Mixology District',
      subtext: 'New York, NY 10001'
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      description: 'Monday - Sunday: 4:00 PM - 2:00 AM',
      subtext: 'Happy Hour: 4 PM - 7 PM'
    },
    {
      icon: Phone,
      title: 'Reservations',
      description: '(555) 123-RESERVE',
      subtext: 'Book your table in advance'
    }
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-32"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-rich-black via-background to-rich-black" />
      
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <h2
          ref={titleRef}
          className="font-display text-5xl md:text-7xl font-bold text-gradient-gold text-center mb-8"
        >
          Get in Touch
        </h2>

        {/* Contact Introduction */}
        <div
          ref={infoRef}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
              <h3 className="font-display text-2xl font-bold text-amber-400">
                We'd Love to Hear From You
              </h3>
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
            </div>
            <p className="text-amber-200/80 text-lg mb-6">
              Whether you're planning a visit, have questions about our menu, or want to host an event, 
              we're here to help. Choose your preferred way to connect with us.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {visitInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-4 py-3 bg-amber-500/5 rounded-lg border border-amber-500/20 hover:bg-amber-500/10 transition-all duration-300"
                  >
                    <IconComponent className="w-5 h-5 text-amber-400" />
                    <div className="text-left">
                      <p className="text-amber-300 text-sm font-semibold">{item.title}</p>
                      <p className="text-amber-200/70 text-xs">{item.description}</p>
                      <p className="text-amber-200/50 text-xs">{item.subtext}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div ref={contactRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <div
                key={index}
                className="group flex flex-col justify-between p-6 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent backdrop-blur-sm hover:bg-amber-500/10 transition-all duration-500 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center group-hover:bg-amber-500/30 transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-amber-400" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-amber-100">
                      {method.title}
                    </h3>
                  </div>
                  <p className="font-body text-lg text-amber-200 font-semibold mb-2">
                    {method.description}
                  </p>
                  <p className="font-body text-sm text-amber-200/70 mb-6">
                    {method.subtext}
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    if (method.action.startsWith('http') || method.action.startsWith('mailto') || method.action.startsWith('tel')) {
                      window.open(method.action, method.action.startsWith('http') ? '_blank' : '_self');
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-xl font-semibold hover:bg-amber-500 hover:text-white transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-amber-500/25"
                >
                  <IconComponent className="w-4 h-4" />
                  {method.buttonText}
                </button>
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-8 border border-amber-500/20 backdrop-blur-sm">
            <h3 className="font-display text-2xl font-bold text-amber-100 mb-4">
              Visit Our Sanctuary of Spirits
            </h3>
            <p className="text-amber-200/70 text-lg mb-6 max-w-2xl mx-auto">
              Experience the perfect blend of ambiance, craftsmanship, and hospitality. 
              Our team is dedicated to making every visit memorable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => window.open('https://maps.google.com', '_blank')}
                className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25"
              >
                <MapPin className="w-5 h-5" />
                Get Directions
              </button>
              <button
                onClick={() => window.location.href = 'tel:5551233549'}
                className="flex items-center gap-2 px-6 py-3 bg-transparent border border-amber-500 text-amber-400 hover:bg-amber-500/10 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Make Reservation
              </button>
            </div>
          </div>
        </div>

        {/* Quick Response Notice */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <p className="text-green-400 text-sm font-medium">
              We typically respond within 2 hours during business hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;