import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Our Menu', href: '/menu' },
    { name: 'About Us', href: '/about' },
    { name: 'Visit Us', href: '/visit' },
    { name: 'Contact', href: '/contact' },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      text: '123 Cocktail Lane, Mixology District',
      subtext: 'New York, NY 10001'
    },
    {
      icon: Phone,
      text: '(555) 123-ELIXIR',
      subtext: 'Reservations & Inquiries'
    },
    {
      icon: Mail,
      text: 'hello@elixir.com',
      subtext: 'General Questions'
    },
    {
      icon: Clock,
      text: 'Monday - Sunday: 4:00 PM - 2:00 AM',
      subtext: 'Happy Hour: 4 PM - 7 PM'
    }
  ];

  return (
    <footer className="relative border-t border-amber-500/20 bg-gradient-to-b from-gray-900 to-rich-black py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-10 w-48 h-48 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div>
                <h3 className="font-display text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  ELIXIR
                </h3>
                <p className="text-xs text-amber-200/80 font-medium tracking-wide">The Art of Mixology</p>
              </div>
            </div>
            <p className="text-amber-200/80 mb-6 max-w-md text-lg leading-relaxed">
              Experience the pinnacle of craft mocktails. Where artistry meets flavor in every glass. 
              Visit us to discover your perfect non-alcoholic masterpiece.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:scale-110 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-amber-400 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:scale-110 transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-amber-400 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:scale-110 transition-all duration-300 group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-amber-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl font-bold text-amber-100 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-amber-200/80 hover:text-amber-400 transition-all duration-300 hover:translate-x-2 flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-xl font-bold text-amber-100 mb-6">Visit Us</h4>
            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <IconComponent className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-amber-100 font-medium text-sm">{item.text}</p>
                      <p className="text-amber-200/60 text-xs">{item.subtext}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-amber-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-amber-200/60 text-sm">
              © 2025 Elixir. Crafted with passion and precision.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-amber-200/60 hover:text-amber-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-amber-200/60 hover:text-amber-400 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-amber-200/60 hover:text-amber-400 transition-colors duration-300">
                Accessibility
              </a>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-500/20 backdrop-blur-sm">
            <h4 className="font-display text-xl font-bold text-amber-100 mb-2">
             THANK YOU FOR VISITING ELIXIR!
            </h4>
           
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;