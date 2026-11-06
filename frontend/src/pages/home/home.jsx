import { useEffect } from "react"; 

// Imports Globais
import { NavBar } from "../../components/Global/NavBar/NavBar";
import { Footer } from "../../components/Global/Footer/Footer";

// Imports apenas da Home
import styles from "./home.module.css";
import { Hero } from "../../components/Home/Hero/Hero";
import { Categorias } from "../../components/Home/Categorias/Categorias";
import { QRCodeExperience } from "../../components/Home/QRCode/QRCodeExperience";

export function HomePage() {

    useEffect(() => {
        document.title = "Techshirt - Moda, Tecnologia e Ensino";
    }, []);

    return (
        <div className={styles.container}>
            <NavBar />
            {/* skip link */}
            <main id="main-content">
                <Hero />
                <Categorias />
                <QRCodeExperience />
            </main>
            <Footer />
        </div>
    );
}