import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ThreeScene from './ThreeScene';
import LoginForm from './LoginForm';

const Login = () => {
  const particlesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Background color animation
    gsap.to('body', {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      duration: 2,
      ease: 'power2.inOut',
    });

    // Create particle container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'fixed inset-0 pointer-events-none -z-10';
    particlesRef.current = particlesContainer;
    document.body.appendChild(particlesContainer);

    // Create fewer particles for performance (reduced from 20 to 10)
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-white/20 rounded-full';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      gsap.to(particle, {
        y: '+=50', // Reduced movement range
        x: '+=25',
        rotation: 360,
        duration: Math.random() * 8 + 8,
        repeat: -1,
        ease: 'none',
        yoyo: true,
      });

      particlesContainer.appendChild(particle);
    }

    // Cleanup
    return () => {
      if (particlesRef.current && particlesRef.current.parentNode) {
        particlesRef.current.parentNode.removeChild(particlesRef.current);
      }
      gsap.to('body', {
        background: '',
        duration: 0.5,
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ThreeScene />
      <LoginForm />
    </div>
  );
};

export default Login;