import { NavBar } from "../../components/Global/NavBar/NavBar";
import { Footer } from "../../components/Global/Footer/Footer";

import styles from "./register.module.css"
import { Input } from "../../components/input/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../services/api";
import { MessageCard } from "../../components/messageCard/message";
import AuthErrorModal from "../../components/AuthErrorModal/AuthErrorModal";

import { TbLockPassword } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";

export function Cadastro() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confSenha, setConfSenha] = useState("")
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")
    const [showMessage, setShowMessage] = useState(false);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalWarning, setModalWarning] = useState("");
    const [modalButtonText, setModalButtonText] = useState("");

    const [validations, setValidations] = useState({
        hasUpper: false,
        hasLower: false,
        hasNumber: false,
        hasSpecial: false,
    });

    const validatePassword = (value) => {
        setValidations({
            hasUpper: /[A-Z]/.test(value),
            hasLower: /[a-z]/.test(value),
            hasNumber: /[0-9]/.test(value),
            hasSpecial: /[@#$%^&*!?.]/.test(value),
        });
    };

    const handleEntra = (event) => {
        event.preventDefault();

        if (!nome || !email || !senha || !confSenha) {
            setIsOpenModal(true);
            setModalTitle("Erro em campo(s) invalido(s)");
            setModalWarning("Por favor preencha todos os campos para realizar o cadastro.");
            setModalButtonText("Tentar Novamente!");

            return;
        }

        if (senha !== confSenha) {
            setIsOpenModal(true);
            setModalTitle("Senhas diferentes");
            setModalWarning("Por favor preencha as senhas de forma que sejam iguais.");
            setModalButtonText("Tentar Novamente!");

            return;
        }

        if (validations.hasUpper === false || validations.hasLower === false ||
            validations.hasNumber === false || validations.hasSpecial === false) {
            setIsOpenModal(true);
            setModalTitle("Senha fraca");
            setModalWarning("Por favor preencha a senha cumprindo as exigências mínimas.");
            setModalButtonText("Tentar Novamente!");
        }

        const user = {
            name: nome,
            email: email,
            password: senha,
        };

        api
            .post("/users", user)
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setMessage("Bem vindo")
                    setType("sucess")
                    setShowMessage(true)
                    setNome(""); setEmail(""); setSenha(""); setConfSenha("");
                    navigate("/login")
                }
            })
            .catch((error) => {
                console.error("Erro ao cadastrar usuário:", error);
                setMessage("Erro ao cadastrar o usuário, verifique os campos")
                setType("error")
                setShowMessage(true)
            });
    }

    const closeModal = () => {
        setIsOpenModal(false);
    };

    return (
        <div>
            {/* Skip link para acessibilidade */}
            <a href="#main-content" className="skip-link">
                Ir para o conteúdo principal
            </a>

            <NavBar />

            <main className={styles.areatotal} id="main-content">
                <div className={styles.areaRegister}>
                    <h1>Cadastro</h1>
                    <p className={styles.subtitle}>Crie sua conta para acessar nossa loja</p>

                    <form
                        className={styles.formRegister}
                        onSubmit={handleEntra}
                        noValidate
                        aria-describedby="form-instructions"
                    >
                        <div id="form-instructions" className="sr-only">
                            Preencha todos os campos obrigatórios para criar sua conta
                        </div>

                        <div>
                            <MessageCard
                                message={message}
                                type={type}
                                position="bottom-left"
                            />
                        </div>

                        <div className={styles.divField}>
                            <label htmlFor="nome" className={styles.fieldLabel}>
                                Nome: <span aria-label="campo obrigatório">*</span>
                            </label>
                            <input
                                id="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                type="text"
                                placeholder="Digite seu nome"
                                required
                                aria-describedby="nome-hint"
                                aria-invalid={!nome && "true"}
                            />
                            <div id="nome-hint" className="sr-only">
                                Informe seu nome completo
                            </div>
                        </div>

                        <div className={styles.divField}>
                            <label htmlFor="email" className={styles.fieldLabel}>
                                Email: <span aria-label="campo obrigatório">*</span>
                            </label>
                            <input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Digite seu email"
                                required
                                aria-describedby="email-hint"
                                aria-invalid={!email && "true"}
                            />
                            <div id="email-hint" className="sr-only">
                                Informe um endereço de email válido
                            </div>
                        </div>

                        <div className={styles.divField}>
                            <label htmlFor="senha" className={styles.fieldLabel}>
                                Senha: <span aria-label="campo obrigatório">*</span>
                            </label>
                            <input
                                id="senha"
                                value={senha}
                                onChange={(e) => {
                                    setSenha(e.target.value)
                                    validatePassword(e.target.value)
                                }}
                                type="password"
                                placeholder="Digite sua senha"
                                required
                                aria-describedby="senha-hint"
                                aria-invalid={!senha && "true"}
                            />
                            <div id="senha-hint" className="sr-only">
                                Crie uma senha segura com pelo menos 6 caracteres
                            </div>
                        </div>

                        <div className={styles.divField}>
                            <label htmlFor="confSenha" className={styles.fieldLabel}>
                                Confirmar senha: <span aria-label="campo obrigatório">*</span>
                            </label>
                            <input
                                id="confSenha"
                                value={confSenha}
                                onChange={(e) => setConfSenha(e.target.value)}
                                type="password"
                                placeholder="Confirme sua senha"
                                required
                                aria-describedby="conf-senha-hint"
                                aria-invalid={senha !== confSenha && "true"}
                            />
                            <div id="conf-senha-hint" className="sr-only">
                                Digite a mesma senha para confirmação
                            </div>
                        </div>

                        <div className={styles.passwordExplain}>
                            <h3>
                                <TbLockPassword />
                                <span>A senha deve conter os seguintes parâmetros:</span>
                            </h3>
                            <div className={styles.passwordParams}>
                                <h4>
                                    <FaCheck className={validations.hasUpper ? styles.valid : styles.invalid} />
                                    No mínimo uma letra maiúscula
                                </h4>
                                <h4>
                                    <FaCheck className={validations.hasLower ? styles.valid : styles.invalid} />
                                    No mínimo uma letra minúscula
                                </h4>
                                <h4>
                                    <FaCheck className={validations.hasNumber ? styles.valid : styles.invalid} />
                                    No mínimo um número (1234...)
                                </h4>
                                <h4>
                                    <FaCheck className={validations.hasSpecial ? styles.valid : styles.invalid} />
                                    No mínimo um caractere especial (@#!*$%...)
                                </h4>
                            </div>
                        </div>

                        <div className={styles.buttonContent}>
                            <button
                                type="submit"
                                className={styles.buttonEntrar}
                                aria-describedby="button-hint"
                            >
                                Cadastrar
                            </button>
                            <div id="button-hint" className="sr-only">
                                Clique para criar sua conta
                            </div>
                        </div>
                    </form>

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

                    <div>
                        <span>
                            Já tem conta?
                            <a
                                className={styles.linkLogin}
                                href="/login"
                                aria-label="Ir para página de login"
                            >
                                Login
                            </a>
                        </span>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}