import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import { useTheme } from "../../../contexts/themeContext";
import { useAuth } from "../../../contexts/authContext";

// Import componentes da NavBar
import { ThemeToggle } from "./NavBarComponents/ThemeToggle/ThemeToggle";
import { MiniCart } from "./NavBarComponents/MiniCart/MiniCart";
import { FontSizer } from "./NavBarComponents/FontSizer/FontSizer";

import {
  IoCartOutline,
  IoPersonCircleOutline,
  IoLogOutOutline,
  IoLogInOutline,
  IoPersonAddOutline,
  IoGridOutline,
  IoChatbubblesOutline,
  IoStorefrontOutline,
  IoHomeOutline,
  IoInformationCircleOutline,
  IoSunny,
  IoMoon
} from "react-icons/io5";
import styles from "./navbar.module.css";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMiniCartVisible, setIsMiniCartVisible] = useState(false);
  const { cartItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantidade || 0), 0);

  const isAdmin = user?.permissions?.some(
    (p) => p.name === "ROLE_ADMIN" || p.authority === "ROLE_ADMIN"
  );

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    closeMenu();
    logout();
  };

  const handleNavigate = (path) => {
    closeMenu();
    navigate(path);
  };

  return (
    <>
      <a href="#main-content" className="skip-link" accessKey="0">
        Pular para o conteúdo principal
      </a>
      
      <header>
        <nav className={styles.navbar} role="navigation" aria-label="Navegação principal">
          <div className={styles.container}>
            <Link to="/" className={styles.logo} aria-label="Techshirts - Ir para página inicial">
              <img
                src={theme === 'dark' ? "/assets/Techshirt-logo-escuro.png" : "/assets/Techshirt-logo-claro.png"}
                alt="Techshirts"
                className={styles.logoImage}
              />
            </Link>

            <div className={styles.menuDesktop}>
              <Link to="/" className={styles.menuItem} accessKey="1">Home</Link>
              <Link to="/loja" className={styles.menuItem} accessKey="2">Loja</Link>
              <Link to="/sobre" className={styles.menuItem} accessKey="3">Sobre</Link>
              <Link to="/faleconosco" className={styles.menuItem} accessKey="4">Fale Conosco</Link>
            </div>

            <div
              id="mobile-menu" 
              className={`${styles.menuMobile} ${isMenuOpen ? styles.menuOpen : ''}`}
              aria-hidden={!isMenuOpen}
            >
              <div className={styles.menuMobileHeader}>
                <h3>Menu</h3>
                <button 
                  onClick={closeMenu} 
                  className={styles.closeButton}
                  aria-label="Fechar menu"
                >
                  &times;
                </button>
              </div>
              
              {/* Links principais */}
              <Link to="/" className={styles.menuItem} onClick={closeMenu}><IoHomeOutline /> Home</Link>
              <Link to="/loja" className={styles.menuItem} onClick={closeMenu}><IoStorefrontOutline/> Loja</Link>
              <Link to="/sobre" className={styles.menuItem} onClick={closeMenu}><IoInformationCircleOutline/> Sobre</Link>
              <Link to="/faleconosco" className={styles.menuItem} onClick={closeMenu}><IoChatbubblesOutline/> Fale Conosco</Link>
              
              <hr className={styles.menuDivider} />
              
              {/* Carrinho sempre visível */}
              <button onClick={() => handleNavigate('/carrinho')} className={styles.menuItemButton}>
                <IoCartOutline /> Carrinho ({totalItems})
              </button>
              
              {/* Autenticação */}
              {isAuthenticated ? (
                  <>
                      <button onClick={() => handleNavigate('/profile')} className={styles.menuItemButton}>
                        <IoPersonCircleOutline /> Meu Perfil
                      </button>
                      {isAdmin && (
                        <button onClick={() => handleNavigate('/admin')} className={styles.menuItemButton}>
                          <IoGridOutline /> Painel
                        </button>
                      )}
                      <button onClick={handleLogout} className={styles.menuItemButton}>
                        <IoLogOutOutline /> Sair
                      </button>
                  </>
              ) : (
                  <>
                      <button onClick={() => handleNavigate('/login')} className={styles.menuItemButton}>
                        <IoLogInOutline /> Login
                      </button>
                      <button onClick={() => handleNavigate('/cadastro')} className={styles.menuItemButton}>
                        <IoPersonAddOutline /> Cadastro
                      </button>
                  </>
              )}
              
              <hr className={styles.menuDivider} />
              
              {/* Configurações - Tema */}
              <button 
                onClick={toggleTheme} 
                className={styles.menuItemButton}
                aria-label={`Mudar para tema ${theme === "light" ? "escuro" : "claro"}`}
              >
                {theme === "light" ? <IoMoon /> : <IoSunny />} 
                Tema {theme === "light" ? "Escuro" : "Claro"}
              </button>
            </div>

            <div className={styles.actions}>
              <FontSizer /> 
              
              <div className={styles.desktopActions}>
                  <div
                    className={styles.cartWrapper}
                    onMouseEnter={() => setIsMiniCartVisible(true)}
                    onMouseLeave={() => setIsMiniCartVisible(false)}
                  >
                    <Link to="/carrinho" className={styles.iconButton} aria-label={`Carrinho de compras - ${totalItems} itens`} title={`Carrinho (${totalItems})`}>
                      <IoCartOutline />
                      {totalItems > 0 && <span className={styles.cartBadge} aria-hidden="true">{totalItems}</span>}
                    </Link>
                    <MiniCart isVisible={isMiniCartVisible} onClose={() => setIsMiniCartVisible(false)} />
                  </div>

                  <ThemeToggle />

                  {isAuthenticated ? (
                      <>
                        <Link to="/profile" className={styles.iconButton} aria-label="Ir para meu perfil" title="Meu Perfil">
                          <IoPersonCircleOutline />
                        </Link>
                        {isAdmin && (
                          <Link to="/admin" className={styles.iconButton} aria-label="Painel do Administrador" title="Painel Admin">
                            <IoGridOutline />
                          </Link>
                        )}
                        <button onClick={logout} className={styles.iconButton} aria-label="Sair da conta" title="Sair">
                          <IoLogOutOutline />
                        </button>
                      </>
                  ) : (
                      <>
                        <Link to="/login" className={styles.authLink}>Login</Link>
                        <Link to="/cadastro" className={styles.authButton}>Cadastro</Link>
                      </>
                  )}
              </div>
             
              <button className={styles.hamburger} onClick={toggleMenu} aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={isMenuOpen} aria-controls="mobile-menu">
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}