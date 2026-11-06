import { useState, useEffect, useRef } from "react";

import { NavBar } from "../../components/Global/NavBar/NavBar";
import { Footer } from "../../components/Global/Footer/Footer";

import styles from "./faleconosco.module.css";
import { api } from "../../services/api";
import { FaComments, FaPaperPlane, FaShoppingBag, FaCreditCard, FaExchangeAlt, FaHeadset, FaEnvelope, } from "react-icons/fa";

export function FaleConosco() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    api.get("/users/user")
      .then(response => {
        setUserName(response.data.name);
      })
      .catch(error => {
        console.error("Erro ao carregar nome do usuário:", error);
      });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickMessage = (messageType) => {
    setMessage(messageType);
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    if (message.trim() === "") {
      alert("Digite uma mensagem antes de enviar.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(""); 

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Você precisa estar logado para enviar uma mensagem.");
        return;
      }

      const response = await api.post("/contacts", { message });

      if (response.status === 201) {
        setMessages([{ text: message, sender: "user" }]);
        setMessage("");
        
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            text: "Mensagem recebida! Nossa equipe logo entrará em contato por email.", 
            sender: "system" 
          }]);
        }, 500);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setErrorMessage("Não foi possível enviar a mensagem. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const getQuickButtonIcon = (text) => {
    if (text.includes("pedidos")) return <FaShoppingBag />;
    if (text.includes("pagamento")) return <FaCreditCard />;
    if (text.includes("Troca")) return <FaExchangeAlt />;
    return <FaEnvelope />;
  };

  return (
    <div>
      <NavBar />

      <div className={styles.contactContainer}>
        <div className={styles.welcomeSection}>
          <FaComments className={styles.welcomeIcon} />
          <h2>Olá{userName ? ` ${userName}` : ""}, fale conosco</h2>
          <p>Estamos aqui para ajudar com qualquer dúvida ou problema</p>
        </div>

        <div className={styles.chatArea}>


          <div className={styles.messagesArea}>
            {messages.length === 0 && (
              <div className={styles.initialMessage}>
                <FaEnvelope className={styles.supportIcon} />
                <p className={styles.helperMessage}>
                  Precisa de ajuda? Estamos aqui para você!<br />
                  Descreva sua dúvida ou use os botões abaixo.
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${message.sender === "user" ? styles.user : ""} ${message.sender === "system" ? styles.system : ""}`}
              >
                <p>{message.text}</p>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          <div className={styles.quickMessages}>
            {[
              "Problemas com pedidos",
              "Problemas com pagamento",
              "Troca de produto",
            ].map((text, i) => (
              <button
                key={i}
                className={styles.quickButton}
                type="button"
                onClick={() => handleQuickMessage(text)}
              >
                {getQuickButtonIcon(text)}
                <span>{text}</span>
              </button>
            ))}
          </div>

          <form className={styles.form} onSubmit={handleContactSubmit}>
            <div className={styles.inputArea}>
              <textarea
                className={styles.textarea}
                placeholder="Digite sua mensagem..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button className={styles.submitButton} type="submit" disabled={isLoading}>
                {isLoading ? (
                  <span className={styles.loadingSpinner}></span>
                ) : (
                  <>
                    <FaPaperPlane />
                    <span>Enviar</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}