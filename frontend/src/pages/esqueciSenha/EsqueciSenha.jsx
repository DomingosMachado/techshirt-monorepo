import { NavBar } from "../../components/Global/NavBar/NavBar";
import { Footer } from "../../components/Global/Footer/Footer";
import { Link } from 'react-router-dom';
import styles from './esqueciSenha.module.css';
import { FaExclamationTriangle, FaEnvelope, FaArrowLeft, FaTools } from 'react-icons/fa';

export function EsqueciSenha() {
    return (
        <>
            <NavBar />
            <main className={styles.esqueciSenhaContainer}>
                <div className={styles.contentBox}>
                    <div className={styles.iconWrapper}>
                        <FaTools className={styles.mainIcon} />
                    </div>
                    
                    <div className={styles.messageSection}>
                        <h1 className={styles.title}>Funcionalidade Temporariamente Indisponível</h1>

                        
                        <div className={styles.messageContent}>
 
                            <div className={styles.supportSection}>
                                <h3 className={styles.supportTitle}>
                                    <FaEnvelope className={styles.supportIcon} />
                                    Precisa de ajuda?
                                </h3>
                                <p className={styles.supportText}>
                                    Para redefinir sua senha ou resolver qualquer problema de acesso, 
                                    entre em contato com nosso suporte técnico:
                                </p>
                                <a 
                                    href="mailto:suporte@example.com" 
                                    className={styles.emailLink}
                                    aria-label="Enviar email para suporte técnico"
                                >
                                    suporte@example.com
                                </a>
                            </div>
                            
                            <div className={styles.estimatedTime}>
                                <p className={styles.timeText}>
                                    <strong>Previsão:</strong> Esta funcionalidade estará disponível em breve. 
                                    Agradecemos sua compreensão e paciência.
                                </p>
                            </div>
                        </div>
                        
                        <div className={styles.actionsSection}>
                            <Link to="/login" className={styles.backButton}>
                                <FaArrowLeft />
                                <span>Voltar ao Login</span>
                            </Link>

                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}