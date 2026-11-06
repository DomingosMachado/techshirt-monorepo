import { useState, useEffect } from 'react';
import { NavBar } from "../../components/Global/NavBar/NavBar";
import { Footer } from "../../components/Global/Footer/Footer";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/authContext';
import styles from './login.module.css';
import { Input } from '../../components/input/input';
import { GiConsoleController } from 'react-icons/gi';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { FaUser, FaLock, FaShieldAlt } from 'react-icons/fa';
import { Modal } from '../../components/modal/Modal';
import AuthErrorModal from '../../components/AuthErrorModal/AuthErrorModal';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { login, isAuthenticated, user } = useAuth();

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalWarning, setModalWarning] = useState("");
    const [modalButtonText, setModalButtonText] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            const isAdmin = user?.permissions?.some(p => p.name === 'ROLE_ADMIN');
            const redirectTimeout = setTimeout(() => {
                if (isAdmin) {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/');
                }
            }, 0);
            return () => clearTimeout(redirectTimeout);
        }
    }, [isAuthenticated, user, navigate]);

    const handleEntra = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setIsOpenModal(true);
            setModalTitle("Erro em campo(s) invalido(s)");
            setModalWarning("Por favor preencha todos os campos para realizar login.");
            setModalButtonText("Tentar Novamente!");

            return;
        }

        setIsLoading(true);

        try {
            const credentials = { username: email, password };
            const response = await api.post('/auth/user', credentials);

            const { accessToken, twoFactorRequired } = response.data;

            if (twoFactorRequired) {
                localStorage.setItem("tempToken", accessToken);
                navigate("/2-factor");
            } else {
                login(accessToken, false);
                toast.success('Login realizado com sucesso! Redirecionando...');
            }

        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.error('Pedido inválido. Verifique os dados enviados.');
                } else if (error.response.status === 401) {
                    toast.error('Usuário ou senha incorretos.');
                    setIsOpenModal(true);
                    setModalTitle("Erro ao realizar login");
                    setModalWarning("Suas credenciais estão incorretas. Por favor tente novamente!");
                    setModalButtonText("Tentar Novamente!");
                } else {
                    toast.error(`Erro: ${error.response.status}. Tente novamente.`);
                }
            } else {
                toast.error('Ocorreu um erro de rede. Tente novamente.');
            }
            console.error("Erro de login:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const closeModal = () => {
        setIsOpenModal(false);
    };

    return (
        <>
            <NavBar />
            <main className={styles.loginContainer}>
                <div className={styles.backgroundPattern}></div>
                <div className={styles.loginBox}>
                    <div className={styles.loginHeader}>
                        <div className={styles.iconWrapper}>
                            <FaShieldAlt className={styles.shieldIcon} />
                        </div>
                        <h2 className={styles.title}>Acessar Conta</h2>
                        <p className={styles.subtitle}>Bem-vindo de volta! Faça login para continuar.</p>
                    </div>

                    <form onSubmit={handleEntra} className={styles.form}>
                        <div className={styles.inputWrapper}>
                            <FaUser className={styles.inputIcon} />
                            <input
                                label="Email"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seuemail@exemplo.com"
                                className={styles.input}
                            />
                        </div>
                        
                        <div className={styles.inputWrapper}>
                            <FaLock className={styles.inputIcon} />
                            <input
                                label="Senha"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                className={styles.input}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className={styles.passwordToggle}
                                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                            >
                                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                            </button>
                        </div>
                        
                        <button type="submit" className={styles.loginButton} disabled={isLoading}>
                            {isLoading ? (
                                <span className={styles.loadingSpinner}></span>
                            ) : (
                                'Entrar'
                            )}
                        </button>
                    </form>
                    <div className={styles.forgotPasswordSection}>
                        <Link to="/esqueci-senha" className={styles.forgotPasswordLink}>
                            Esqueci minha senha
                        </Link>
                    </div>

                    {isOpenModal && (
                        <div className={styles.modalBackdrop}>
                            <AuthErrorModal
                                onClose={closeModal}
                                title={modalTitle}
                                warning={modalWarning}
                                buttonText={modalButtonText}
                            />
                        </div>
                    )}

                    <div className={styles.divider}>
                        <span>ou</span>
                    </div>

                    <p className={styles.signupText}>
                        Não tem uma conta?{' '}
                        <Link to="/cadastro" className={styles.signupLink}>
                            Cadastre-se
                        </Link>
                    </p>
                </div>
            </main>
            <Footer />
        </>
    );
}