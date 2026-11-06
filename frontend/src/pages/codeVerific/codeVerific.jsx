import { useState } from "react";
import { Footer } from "../../components/Global/Footer/Footer";
import { NavBar } from "../../components/Global/NavBar/NavBar";
import styles from "./codeVerific.module.css";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/authContext';

export function CodeVerific() {
    const [codeValidation, setCodValid] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const temptoken = localStorage.getItem("tempToken");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleCodeVerific = async (e) => {
        e.preventDefault();
        
        if (!codeValidation) {
            toast.warn('Por favor, digite o código de verificação.');
            return;
        }
        
        if (codeValidation.length < 6) {
            toast.warn('O código deve ter pelo menos 6 dígitos.');
            return;
        }
        
        setIsLoading(true);
        
        try {
            const code = {
                tempToken: temptoken,
                code: codeValidation.replace('-', '')
            };
            
            const response = await api.post("/auth/verify-2fa", code);
            const { accessToken } = response.data;
            
            localStorage.removeItem("tempToken");
            
            login(accessToken, true);
            
            toast.success('Verificação concluída com sucesso!');
            navigate("/");
            
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Código inválido ou expirado. Tente novamente.');
            } else {
                toast.error('Erro na verificação. Tente novamente.');
            }
            console.error("Erro na verificação 2FA:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const formatCode = (value) => {
        // Remove caracteres não numéricos
        const numbers = value.replace(/\D/g, '');
        
        // Adiciona hífen após 3 dígitos
        if (numbers.length <= 3) {
            return numbers;
        }
        return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}`;
    };

    const handleInputChange = (e) => {
        const formatted = formatCode(e.target.value);
        setCodValid(formatted);
    };

    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.boxVerific}>
                    <div className={styles.boxTitle}>
                        <h1>Código de Verificação</h1>
                        <p>Digite o código fornecido pelo seu Authenticator</p>
                        <div className={styles.emailInfo}>
                            <span className={styles.infoIcon}>📧</span>
                            <small>O código também foi enviado para seu email</small>
                        </div>
                    </div>
                    <form onSubmit={handleCodeVerific} className={styles.formulario}>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                value={codeValidation}
                                onChange={handleInputChange}
                                placeholder="000-000"
                                maxLength="7"
                                autoComplete="one-time-code"
                                inputMode="numeric"
                                aria-label="Código de verificação de 6 dígitos"
                                disabled={isLoading}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading || codeValidation.length < 7}
                            className={isLoading ? styles.loading : ''}
                            data-tooltip={isLoading ? "Verificando..." : "Enviar código"}
                        >
                            {isLoading ? 'Verificando...' : 'Enviar'}
                        </button>
                        <div className={styles.helpText}>
                            <small>Não recebeu o código? Verifique sua caixa de spam</small>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}