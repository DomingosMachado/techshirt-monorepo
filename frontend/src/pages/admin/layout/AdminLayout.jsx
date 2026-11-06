import React, { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import {
  MdDashboard,
  MdInventory,
  MdShoppingCart,
  MdPeople,
  MdPayment,
  MdHome,
  MdQrCode,
} from "react-icons/md";
import { ThemeToggle } from "../../../components/Global/NavBar/NavBarComponents/ThemeToggle/ThemeToggle";
import { FontSizer } from "../../../components/Global/NavBar/NavBarComponents/FontSizer/FontSizer";
import styles from "./adminLayout.module.css";

export function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={styles.adminContainer}>
      <a href="#main-content" className={styles.skipLink}>
        Pular para conteúdo principal
      </a>

      <header className={styles.mobileHeader}>
        <Link to="/" className={styles.logoLink}>
          <h1>Admin Panel</h1>
        </Link>
        <div className={styles.headerControls}>
          <FontSizer />
          <ThemeToggle />
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              isMobileMenuOpen
                ? "Fechar menu de navegação"
                : "Abrir menu de navegação"
            }
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={closeMobileMenu}
          aria-hidden="true"
        ></div>
      )}

      <aside
        className={`${styles.sidebar} ${
          isMobileMenuOpen ? styles.sidebarOpen : ""
        }`}
      >
        <div className={styles.sidebarHeader}>
          <Link to="/" className={styles.logoLink}>
            <h2>Admin</h2>
          </Link>
          <div className={styles.sidebarControls}>
            <FontSizer />
            <ThemeToggle />
          </div>
        </div>
        <nav className={styles.nav}>
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
            onClick={closeMobileMenu}
          >
            <MdDashboard className={styles.navIcon} />
            Dashboard
          </NavLink>
          <NavLink 
            to="/admin/produtos" 
            className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
            onClick={closeMobileMenu}
          >
            <MdInventory className={styles.navIcon} />
            Produtos
          </NavLink>
          <NavLink 
            to="/admin/pedidos" 
            className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
            onClick={closeMobileMenu}
          >
            <MdShoppingCart className={styles.navIcon} />
            Pedidos
          </NavLink>
          <NavLink 
            to="/admin/clientes" 
            className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
            onClick={closeMobileMenu}
          >
            <MdPeople className={styles.navIcon} />
            Clientes
          </NavLink>
          <NavLink 
            to="/admin/pagamentos" 
            className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
            onClick={closeMobileMenu}
          >
            <MdPayment className={styles.navIcon} />
            Pagamentos
          </NavLink>
          <NavLink 
            to="/admin/qrcodes" 
            className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
            onClick={closeMobileMenu}
          >
            <MdQrCode className={styles.navIcon} />
            QR Codes
          </NavLink>
        </nav>
        <div className={styles.sidebarFooter}>
          <Link
            to="/"
            className={styles.navLink}
            onClick={closeMobileMenu}
            aria-label="Voltar ao site principal"
          >
            <MdHome className={styles.navIcon} aria-hidden="true" />
            Voltar ao site
          </Link>
        </div>
      </aside>

      <main className={styles.content} id="main-content" role="main">
        <Outlet />
      </main>
    </div>
  );
}