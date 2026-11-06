import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.css";
import Particles from "../../components/Particles/Particles";

export function PageNotFound() {
  const [colors, setColors] = useState(["#ffffff", "#ffffff", "#ffffff"]);

  useEffect(() => {
  const updateColors = () => {
    const isDark = document.body.classList.contains("dark-theme");
    const paletteDark = ["#F0F6FC", "#58A6FF", "#D2A8FF"];
    const paletteLight = ["#0D1117", "#1E293B", "#4B5563"];
    setColors(isDark ? paletteDark : paletteLight);
  };

  updateColors(); // executa uma vez ao montar

  const observer = new MutationObserver(() => {
    updateColors();
  });

  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  return () => {
    observer.disconnect();
  };
}, []); 

  return (
    <div className={styles.wrapper}>
      <Particles
  key={colors.join("-")} // força nova montagem quando as cores mudam
  className={styles.particles}
  particleColors={colors}
/>
      <main
        className={`${styles.paginaNaoEncontrada} ${styles.container}`}
        role="main"
      >
        <h1>404 - Página não encontrada</h1>
        <p>
          Ops... Parece que o endereço <strong>não existe</strong> ou foi digitado incorretamente.
        </p>
        <Link to="/" className={styles.botaoVoltar}>
          Voltar para a página inicial
        </Link>
      </main>
    </div>
  );
}