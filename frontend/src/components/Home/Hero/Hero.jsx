import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaCube, FaQrcode, FaGraduationCap } from 'react-icons/fa';
import styles from './hero.module.css';
import heroDesktopImage from '/assets/Hero-Desktop.png';
import heroMobileImage from '/assets/Hero-Mobile.png';

export function Hero() {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 992);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  
  // Typewriter effect
  const [displayText, setDisplayText] = useState('');
  const fullText = "Moda, Tecnologia e Ensino!";
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 992);
  };

  // Mouse parallax effect
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  const backgroundImage = isDesktop ? heroDesktopImage : heroMobileImage;

  // Particles generation
  const particles = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className={styles.particle}
      style={{
        '--delay': `${Math.random() * 5}s`,
        '--duration': `${5 + Math.random() * 10}s`,
        '--x': `${Math.random() * 100}%`,
      }}
    >
      {['<', '/>', '{', '}', ';', '()'][Math.floor(Math.random() * 6)]}
    </div>
  ));

  // Steps data
   const steps = [
     {
       icon: <FaCube />,
      title: "Peça",
     description: "Compre suas camisetas favoritas"
     },
    {
      icon: <FaQrcode />,
     title: "Escaneie",
      description: "Escaneie os QR Codes recebidos por email."
    },
    {
      icon: <FaGraduationCap />,
      title: "Aprenda",
       description: "Acesse conteúdo exclusivo"
     }
   ];

  return (
    <section className={styles.heroWrapper}>
      <div 
        ref={heroRef}
        className={styles.hero}
        onMouseMove={handleMouseMove}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          '--mouse-x': mousePosition.x,
          '--mouse-y': mousePosition.y,
        }}
      >
        <div className={styles.gradientOverlay}></div>
        <div className={styles.overlay}></div>
        <div className={styles.particlesContainer}>{particles}</div>
        
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              {displayText}
              {/* Moda, Tecnologia e Ensino! */}
              <span className={styles.cursor}>|</span>
            </h1>
            <p className={styles.subtitle}>
              Descubra camisetas com estampas únicas que unem o mundo da programação, design e aprendizado.
            </p>
            
            <div className={styles.actions}>
              <Link to="/loja" className={`${styles.btn} ${styles.btnPrimary}`}>
                <span className={styles.btnText}>Ver Loja</span>
                <span className={styles.btnIcon}>→</span>
                <div className={styles.btnGlow}></div>
              </Link>
              
              <Link to="/login" className={`${styles.btn} ${styles.btnSecondary}`}>
                <span className={styles.btnText}>Fazer Login</span>
                <span className={styles.btnTerminal}>_</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Steps visual info at bottom */}
      <div className={styles.stepsContainer}>
        {steps.map((step, index) => (
          <div key={index} className={styles.step}>
            <div className={styles.stepIcon}>{step.icon}</div>
            <div className={styles.stepInfo}>
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
