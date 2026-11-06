import { NavBar } from "../../components/Global/NavBar/NavBar";
import { Footer } from "../../components/Global/Footer/Footer";

import { useNavigate } from "react-router-dom";
import styles from "./profile.module.css";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { FaEdit, FaMapMarkerAlt, FaShoppingBag, FaSignOutAlt, FaUser, FaEnvelope, FaStar } from "react-icons/fa";

export function Profile(){
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const [user, setUser] = useState("")

    const dadosUser = () => {
    api
        .get("/users/user", { 
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((data) => {
            setUser(data.data)
            setNome(data.data.name)
            setEmail(data.data.email)   
        })
        .catch((error) => {
            console.error("Erro ao buscar dados do usuário:", error);
        })
    }

    useEffect(() =>{
        dadosUser();
    }, [])

    const handleSair = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("permições")
        localStorage.removeItem("2f")
        navigate("/")
    }
    
    const handleEditProfile = () =>{
        navigate("/editProfile")
    }
    const handleEndereco = () => {
        navigate("/address")
    }
    
    const handlePedidos = () => {
        navigate("/meusPedidos")
    }
    return (
        <div>
            <NavBar/>
            <div className={styles.areatotal}>
                <div className={styles.headerSection}>
                    <h1 className={styles.pageTitle}>Meu Perfil</h1>
                    <p className={styles.pageSubtitle}>Gerencie suas informações e preferências</p>
                </div>

                <div className={styles.areaCentral}>
                    <div className={styles.iconProfile}>
                        <FaUser className={styles.profileIcon} />
                        <div className={styles.statusIndicator}></div>
                    </div>
                    <div className={styles.welcomeSection}>
                        <h2 className={styles.textTitle}>Olá, {nome || "Usuário"}!</h2>
                        <p className={styles.welcomeText}>Bem-vindo de volta ao seu painel pessoal</p>
                    </div>
                </div>

                <div className={styles.contentGrid}>
                    <div className={styles.infoCard}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>
                                <FaUser className={styles.cardIcon} />
                                Informações Pessoais
                            </h3>
                        </div>
                        <div className={styles.cardContent}>
                            <div className={styles.infoItem}>
                                <div className={styles.infoRow}>
                                    <FaEnvelope className={styles.infoIcon} />
                                    <span className={styles.infoLabel}>Email:</span>
                                </div>
                                <span className={styles.infoValue}>{email || "Carregando..."}</span>
                            </div>
                            <button 
                                className={styles.editButton}
                                onClick={handleEditProfile}
                            >
                                <FaEdit />
                                Editar Perfil
                            </button>
                        </div>
                    </div>

                    <div className={styles.actionsCard}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Ações Rápidas</h3>
                        </div>
                        <div className={styles.actionsList}>
                            <button 
                                className={styles.actionItem}
                                onClick={handleEndereco}
                            >
                                <div className={styles.actionIcon}>
                                    <FaMapMarkerAlt />
                                </div>
                                <div className={styles.actionContent}>
                                    <span className={styles.actionTitle}>Meus Endereços</span>
                                    <span className={styles.actionDesc}>Gerencie seus endereços de entrega</span>
                                </div>
                                <div className={styles.actionArrow}>→</div>
                            </button>
                            
                            <button 
                                className={styles.actionItem}
                                onClick={handlePedidos}
                            >
                                <div className={styles.actionIcon}>
                                    <FaShoppingBag />
                                </div>
                                <div className={styles.actionContent}>
                                    <span className={styles.actionTitle}>Meus Pedidos</span>
                                    <span className={styles.actionDesc}>Acompanhe o status dos seus pedidos</span>
                                </div>
                                <div className={styles.actionArrow}>→</div>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles.logoutSection}>
                    <button
                        className={styles.logoutButton}
                        onClick={handleSair}
                    >
                        <FaSignOutAlt />
                        Sair da Conta
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}