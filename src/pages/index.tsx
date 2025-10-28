import Hero from '../Componets/Hero.tsx';
import About from '../Componets/About.tsx';
import Cocktails from '../Componets/Cocktails.tsx';
import Footer from '../Componets/Footer.tsx';
import MoctalGallery from "../Componets/MoctalGalleryComponent.tsx";
import ScrollProgress from '../Componets/ScrollProgress.tsx';
import Navbar from '../Componets/Navbar.tsx';
import Art from '../Componets/Art.tsx';
import Menu from '../Componets/Menu.tsx';
import Contact from '../Componets/Contact.tsx';
const Index = () => {
  return (
    <main className="relative">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <MoctalGallery />
      <Cocktails/>
      <Art />
      <Menu />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;