import { useEffect } from "react";
import { NavBar } from "../../components/Global/NavBar/NavBar";
import { Footer } from "../../components/Global/Footer/Footer";
import { FaQrcode, FaGraduationCap, FaTshirt, FaLightbulb, FaHeart, FaShieldAlt } from "react-icons/fa";
import style from "./sobre.module.css";

export function Sobre() {
  useEffect(() => {
    document.body.classList.add("pagina-sobre");
    return () => {
      document.body.classList.remove("pagina-sobre");
    };
  }, []);

  const valores = [
    {
      icon: <FaLightbulb />,
      titulo: "Inovação",
      descricao: "Conectamos moda e tecnologia de forma única através de QR Codes, criando experiências que vão além do produto físico."
    },
    {
      icon: <FaHeart />,
      titulo: "Qualidade",
      descricao: "Oferecemos camisetas de alta qualidade e conteúdo educativo cuidadosamente selecionado para agregar valor real."
    },
    {
      icon: <FaShieldAlt />,
      titulo: "Confiança",
      descricao: "Garantimos uma experiência de compra segura, transparente e acessível, priorizando a privacidade dos nossos clientes."
    }
  ];

  const principios = [
    {
      icon: <FaGraduationCap />,
      titulo: "Aprendizado Contínuo",
      descricao: "Cada camiseta é uma porta de entrada para o conhecimento, incentivando o crescimento pessoal e profissional."
    },
    {
      icon: <FaQrcode />,
      titulo: "Tecnologia Acessível",
      descricao: "Tornamos a tecnologia simples e acessível, criando pontes entre o mundo físico e digital de forma intuitiva."
    },
    {
      icon: <FaTshirt />,
      titulo: "Moda com Propósito",
      descricao: "Transformamos itens de vestuário em ferramentas de descoberta, onde estilo e educação se encontram harmoniosamente."
    }
  ];

  return (
    <div className={style.bgWrap}>
      <NavBar />
      <main id="main-content" className={style.container} role="main" aria-label="Sobre a Techshirt">
        
        {/* Hero Section */}
        <div className={style.heroSection}>
          <h1 className={style.title}>Sobre a <span>Techshirt</span></h1>
          <p className={style.subtitle}>
            Transformando moda em conhecimento através da tecnologia
          </p>
        </div>

        {/* História e Missão */}
        <section className={style.contentSection}>
          <div className={style.card}>
            <h2 className={style.sectionTitle}>Nossa História</h2>
            <p className={style.sectionText}>
              A Techshirt nasceu da visão de criar camisetas que vão além do estilo. Cada peça que produzimos carrega um QR Code exclusivo que conecta o mundo físico ao digital, transformando uma simples camiseta em uma porta de entrada para o conhecimento.
            </p>
            <p className={style.sectionText}>
              Através dessa tecnologia, oferecemos acesso a conteúdos educativos exclusivos, criando uma experiência única onde moda e aprendizado se encontram. Nossa plataforma foi desenvolvida para tornar esse processo simples, seguro e acessível a todos.
            </p>
          </div>

          <div className={style.card}>
            <h2 className={style.sectionTitle}>Nossa Missão</h2>
            <p className={style.sectionText}>
              Proporcionar camisetas de alta qualidade que incentivem o aprendizado contínuo através de QR Codes exclusivos, conectando moda, tecnologia e educação.
            </p>
            <p className={style.sectionText}>
              Nosso compromisso é facilitar o acesso ao conhecimento de forma inovadora, promovendo uma experiência de compra e uso que agregue valor real à vida de nossos clientes através de conteúdos educativos cuidadosamente selecionados.
            </p>
          </div>
        </section>

        {/* Nossos Valores */}
        <section className={style.valoresSection}>
          <h2 className={style.sectionTitleCenter}>Nossos Valores</h2>
          <div className={style.valoresGrid}>
            {valores.map((valor, index) => (
              <div key={index} className={style.valorCard}>
                <div className={style.valorIcon}>
                  {valor.icon}
                </div>
                <h3 className={style.valorTitulo}>{valor.titulo}</h3>
                <p className={style.valorDescricao}>{valor.descricao}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Nossos Princípios */}
        <section className={style.principiosSection}>
          <h2 className={style.sectionTitleCenter}>Nossos Princípios</h2>
          <div className={style.principiosGrid}>
            {principios.map((principio, index) => (
              <div key={index} className={style.principioCard}>
                <div className={style.principioHeader}>
                  <div className={style.principioIcon}>
                    {principio.icon}
                  </div>
                  <h3 className={style.principioTitulo}>{principio.titulo}</h3>
                </div>
                <p className={style.principioDescricao}>{principio.descricao}</p>
              </div>
            ))}
          </div>
        </section>


      </main>
      <Footer />
    </div>
  );
}