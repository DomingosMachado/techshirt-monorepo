import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaDatabase, FaServer, FaChartLine, FaTasks } from 'react-icons/fa';
import styles from './categorias.module.css';

export function Categorias() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const categorias = [
    {
      id: 6,
      nome: "FullStack",
      descricao: "Desenvolvimento web completo",
      icon: <FaCode />,
      color: "#0D47A1",
      gradient: "linear-gradient(135deg, #0D47A1, #1976D2)"
    },
    {
      id: 2,
      nome: "STEM",
      descricao: "Ciência, tecnologia e matemática",
      icon: <FaChartLine />,
      color: "#00695C",
      gradient: "linear-gradient(135deg, #00695C, #00897B)"
    },
    {
      id: 4,
      nome: "Infra",
      descricao: "Redes, servidores e sistemas",
      icon: <FaServer />,
      color: "#7B1FA2",
      gradient: "linear-gradient(135deg, #7B1FA2, #9C27B0)"
    },
    {
      id: 3,
      nome: "Dados",
      descricao: "Análise e ciência de dados",
      icon: <FaDatabase />,
      color: "#F57C00",
      gradient: "linear-gradient(135deg, #F57C00, #FF9800)"
    },
    {
      id: 5,
      nome: "Gestão",
      descricao: "Projetos e metodologias ágeis",
      icon: <FaTasks />,
      color: "#C62828",
      gradient: "linear-gradient(135deg, #C62828, #E53935)"
    }
  ];

  const handleScroll = () => {
    if (gridRef.current && isMobile) {
      const scrollLeft = gridRef.current.scrollLeft;
      const cardWidth = gridRef.current.offsetWidth * 0.9 + 24;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentCard(Math.max(0, Math.min(newIndex, categorias.length - 1)));
    }
  };

  const scrollToCard = (index) => {
    if (gridRef.current && isMobile) {
      const cardWidth = gridRef.current.offsetWidth * 0.9 + 24;
      const padding = gridRef.current.offsetWidth * 0.05;
      
      gridRef.current.scrollTo({
        left: (index * cardWidth) + padding - (gridRef.current.offsetWidth * 0.05),
        behavior: 'smooth'
      });
      setCurrentCard(index);
    }
  };

  return (
    <section className={styles.categoriasSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nossas Categorias</h2>
          <p className={styles.subtitle}>
            Explore nossas coleções especializadas para cada área da tecnologia
          </p>
        </div>

        <div 
          className={styles.categoriasGrid}
          ref={gridRef}
          onScroll={handleScroll}
        >
          {categorias.map((categoria) => (
            <Link
              key={categoria.id}
              to={`/loja?categoria=${encodeURIComponent(categoria.nome.toLowerCase())}`}
              className={styles.categoriaCard}
              onMouseEnter={() => setHoveredCard(categoria.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                '--card-gradient': categoria.gradient,
                '--card-color': categoria.color
              }}
            >
              <div className={styles.cardIconWrapper}>
                <div className={styles.cardIcon}>{categoria.icon}</div>
              </div>
              <h3 className={styles.cardTitle}>{categoria.nome}</h3>
              <p className={styles.cardDescription}>{categoria.descricao}</p>
              
              <div className={`${styles.cardHoverEffect} ${hoveredCard === categoria.id ? styles.active : ''}`}>
                <span>Explorar →</span>
              </div>
            </Link>
          ))}
        </div>

        {isMobile && (
          <div className={styles.mobileNavigation}>
            {categorias.map((_, index) => (
              <button
                key={index}
                className={`${styles.navDot} ${currentCard === index ? styles.activeDot : ''}`}
                onClick={() => scrollToCard(index)}
                aria-label={`Ir para categoria ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}