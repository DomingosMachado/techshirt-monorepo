import { useState, useEffect } from "react";
import { NavBar } from "../../components/Global/NavBar/NavBar";
import { Footer } from "../../components/Global/Footer/Footer";
import { api } from "../../services/api";
import styles from "./editProfile.module.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaShieldAlt, FaTrash, FaCheck, FaTimes, FaArrowLeft } from "react-icons/fa";
import { Confirm2FModal } from "../../components/2fConfirmModal/2fConfirmModal";
import { Desativ2FModal } from "../../components/2fDesativModal/2fDesativModal";
import { DeleteModal } from "../../components/DeleteModal/DeleteModal";
import { Modal } from "../../components/modal/Modal";
import { toast } from 'react-toastify';
import { useAuth } from "../../contexts/authContext";

export function EditProfile() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { user, isTwoFactorActive, updateTwoFactorStatus } = useAuth();

    const [senha, setSenha] = useState("");
    const [code, setCode] = useState("");
    const [qrCodeUrl, setQrCodeUrl] = useState("");

    const [isConfirm2FModalOpen, setIsConfirm2FModalOpen] = useState(false);
    const [isDesativ2FModalOpen, setIsDesativ2FModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isSenhaModalOpen, setIsSenhaModalOpen] = useState(false);
    
    const handleBackToProfile = () => {
        navigate("/profile");
    };

    const handleTrocaSenha = async (e) => {
        e.preventDefault();
        if (!senha) {
            toast.warn("O campo de nova senha não pode estar vazio.");
            return;
        }
        try {
            await api.put("/users", { password: senha }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSenha("");
            setIsSenhaModalOpen(true);
        } catch (error) {
            console.error("Erro ao trocar senha", error);
            toast.error("Ocorreu um erro ao tentar alterar a senha.");
        }
    };

    const handleHabilitar2F = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post("/2fa/setup", {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setQrCodeUrl(data.qrCodeImageUri || data.qrCodeImageUrl);
            setIsConfirm2FModalOpen(true);
        } catch (error) {
            console.error("Erro ao iniciar processo 2FA", error);
            toast.error("Não foi possível iniciar a habilitação do 2FA.");
        }
    };

    const handleVerificar2F = async (e) => {
        e.preventDefault();
        try {
            await api.post("/2fa/confirm", { code }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Autenticação de 2 Fatores habilitada com sucesso!");
            updateTwoFactorStatus(true);
            setIsConfirm2FModalOpen(false);
            setCode("");
            setQrCodeUrl("");
        } catch (error) {
            console.error("Erro ao confirmar código 2FA", error);
            toast.error("Código inválido ou expirado. Tente novamente.");
        }
    };

    const handleDesativar2F = async (e) => {
        e.preventDefault();
        try {
            await api.post("/2fa/disable", { code }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Autenticação de 2 Fatores desabilitada.");
            updateTwoFactorStatus(false);
            setIsDesativ2FModalOpen(false);
            setCode("");
        } catch (error) {
            console.error("Erro ao desativar 2FA", error);
            toast.error("Código inválido. Não foi possível desativar o 2FA.");
        }
    };

    const handleDelModal = async () => {
        try {
            await api.delete("/users", {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Usuário deletado com sucesso.");
            localStorage.removeItem("token");
            localStorage.removeItem("permissions");
            navigate("/");
        } catch (error) {
            console.error("Erro ao deletar usuário", error);
            toast.error("Ocorreu um erro ao tentar excluir a conta.");
        }
    };

    if (!user) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <NavBar />
            <div className={styles.pageWrapper}>
                <button onClick={handleBackToProfile} className={styles.backButton}>
                    <FaArrowLeft />
                    Voltar para o Perfil
                </button>
                <div className={styles.areatotal}>
                    <div className={styles.headerSection}>
                        <h1>Editar Perfil</h1>
                        <p>Gerencie suas informações pessoais e configurações de segurança</p>
                    </div>

                    <div className={styles.profileContainer}>
                        <div className={styles.iconProfile}>
                            <FaUser className={styles.profileIcon} />
                            <div className={styles.editBadge}><FaLock /></div>
                        </div>

                        <div className={styles.areaEdit}>
                            <div className={styles.infoCard}>
                                <div className={styles.cardHeader}><h3>Informações Pessoais</h3></div>
                                <div className={styles.campo}>
                                    <div className={styles.labelGroup}><FaUser className={styles.fieldIcon} /><h4>Nome:</h4></div>
                                    <p>{user.name}</p>
                                </div>
                                <div className={styles.campo}>
                                    <div className={styles.labelGroup}><FaEnvelope className={styles.fieldIcon} /><h4>Email:</h4></div>
                                    <p>{user.email}</p>
                                </div>
                            </div>

                            <div className={styles.securityCard}>
                                <div className={styles.cardHeader}><h3>Segurança</h3></div>
                                <div className={styles.passwordSection}>
                                    <div className={styles.labelGroup}><FaLock className={styles.fieldIcon} /><h4>Alterar Senha</h4></div>
                                    <form onSubmit={handleTrocaSenha} className={styles.form}>
                                        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Nova senha" className={styles.passwordInput} />
                                        <button type="submit" className={styles.saveButton}><FaCheck /> Alterar</button>
                                    </form>
                                </div>
                                <div className={styles.twoFactorSection}>
                                    <div className={styles.twoFactorHeader}>
                                        <div className={styles.labelGroup}><FaShieldAlt className={styles.fieldIcon} /><h4>Autenticação de 2 Fatores</h4></div>
                                        <span className={`${styles.status} ${isTwoFactorActive ? styles.active : styles.inactive}`}>
                                            {isTwoFactorActive ? "Ativo" : "Inativo"}
                                        </span>
                                    </div>
                                    {!isTwoFactorActive ? (
                                        <form onSubmit={handleHabilitar2F}>
                                            <button type="submit" className={styles.enableButton}><FaShieldAlt /> Habilitar 2FA</button>
                                        </form>
                                    ) : (
                                        <form onSubmit={(e) => { e.preventDefault(); setIsDesativ2FModalOpen(true); }}>
                                            <button type="submit" className={styles.disableButton}><FaTimes /> Desativar 2FA</button>
                                        </form>
                                    )}
                                </div>
                            </div>

                            <div className={styles.dangerZone}>
                                <div className={styles.cardHeader}><h3>Zona de Perigo</h3></div>
                                <p className={styles.dangerWarning}>Esta ação é permanente e não pode ser desfeita.</p>
                                <button type="button" onClick={() => setDeleteModalOpen(true)} className={styles.deleteButton}><FaTrash /> Excluir Conta</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Confirm2FModal isOpen={isConfirm2FModalOpen} onClose={() => setIsConfirm2FModalOpen(false)}>
                <h2>Configure o 2FA</h2>
                <p>Escaneie o QR Code abaixo com seu app autenticador e insira o código gerado.</p>
                {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code 2FA" style={{ margin: '20px auto', display: 'block' }} />}
                <form className={styles.inputModal} onSubmit={handleVerificar2F}>
                    <h3>Informe o código:</h3>
                    <input className={styles.inputCod} value={code} onChange={(e) => setCode(e.target.value)} type="text" placeholder="XXX-XXX" />
                    <button type="submit" className={styles.buttonHab}>Enviar</button>
                </form>
            </Confirm2FModal>

            <Desativ2FModal isOpen={isDesativ2FModalOpen} onClose={() => setIsDesativ2FModalOpen(false)}>
                <p>Informe o código do Google Authenticator para desativar.</p>
                <form className={styles.inputModal} onSubmit={handleDesativar2F}>
                    <h3>Informe o código:</h3>
                    <input className={styles.inputCod} value={code} onChange={(e) => setCode(e.target.value)} type="text" placeholder="XXX-XXX" />
                    <button type="submit" className={styles.buttonHab}>Enviar</button>
                </form>
            </Desativ2FModal>

            <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                <p>Tem certeza que deseja deletar a conta?</p>
                <div className={styles.inputModal}>
                    <button className={styles.buttonDell} onClick={handleDelModal}>Excluir</button>
                    <button className={styles.buttonDisab} onClick={() => setDeleteModalOpen(false)}>Cancelar</button>
                </div>
            </DeleteModal>

            <Modal isOpen={isSenhaModalOpen} onClose={() => setIsSenhaModalOpen(false)}>
                <div className={styles.confirTroca}>
                    <h1>Senha alterada com sucesso</h1>
                    <button className={styles.buttonConf} onClick={() => setIsSenhaModalOpen(false)}>Fechar</button>
                </div>
            </Modal>

            <Footer />
        </div>
    );
}