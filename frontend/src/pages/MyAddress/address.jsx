import { NavBar } from "../../components/Global/NavBar/NavBar";
import { Footer } from "../../components/Global/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import styles from './address.module.css'
import {useEffect, useState} from "react"
import { FaMapMarkedAlt, FaPlus, FaTrash, FaCheckCircle, FaHome, FaMapPin, FaArrowLeft } from "react-icons/fa";

export function Address(){
    const token = localStorage.getItem("token")
    const [enderecos, setEnderecos] = useState([])
    const navigate = useNavigate()

    const meusEnderecos = () => {
        api 
            .get("/houses/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(res => setEnderecos(res.data))
            .catch(err => console.error("Erro ao buscar endereços", err));
    }
    
    useEffect(() =>{
        meusEnderecos();
    }, [])

    const handleAddEnd = () => {
        navigate("/newAddress")
    }

    const handleBackToProfile = () => {
        navigate("/profile");
    }

    const handleDelEnd = async (id) => {
        try {
            await api.delete(`/houses/${parseInt(id)}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            meusEnderecos()
        } catch (error) {
            console.error("Erro ao deletar:", error.response?.data || error.message);
        }
    }

    const handleActiveEnd = async (id) => {
        try{
            await api.put(`/houses/active/${parseInt(id)}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            meusEnderecos()
        }
        catch (error){
            console.error("Erro ao ativar:", error.response?.data || error.message);
        }
    }

    return( 
        <div className={styles.container}>
            <NavBar/>
            <div 
                className={styles.box}
            >
                <button onClick={handleBackToProfile} className={styles.backButton}>
                    <FaArrowLeft />
                    Voltar para o Perfil
                </button>
                <div
                    className={styles.headBox}
                >
                    <div className={styles.titleSection}>
                        <FaMapMarkedAlt className={styles.titleIcon}/>
                        <h1>Meus Endereços</h1>
                    </div>
                    <div>
                        <button
                            type="submit"
                            onClick={handleAddEnd}
                            className={styles.buttAddEnd}
                        >
                            <FaPlus />
                            Adicionar Endereço
                        </button>
                    </div>                    
                </div>
                
                <div
                    className={styles.cardEnds}
                >
                    {enderecos.map((end, index) => (
                        <div key={index} className={`${styles.card} ${end.status ? styles.cardActive : styles.cardInactive}`}>
                            <div className={styles.cardHeader}>
                                <div
                                    className={styles.titEnd}
                                >
                                    <FaHome className={styles.homeIcon}/>
                                    <h3>{end.name}</h3>
                                </div>
                                {end.status && (
                                    <span className={styles.activeLabel}>Ativo</span>
                                )}
                            </div>
                            <div
                                className={styles.endExib}
                            >
                                <div className={styles.addressInfo}>
                                    <FaMapPin className={styles.pinIcon}/>
                                    <div>
                                        <p className={styles.addressLine}>{end.address?.name}, {end.number}</p>
                                        <p className={styles.addressLine}>{end.address?.locality} - {end.address?.state}</p>
                                        <p className={styles.cepLine}>CEP: {end.cep}</p>
                                    </div>
                                </div>
                            </div>   
                            <div
                                className={styles.listCard}
                            >
                                 {end.status ? (
                                    <button
                                        type="button"
                                        onClick={() => handleDelEnd(end.id)}
                                        className={styles.linkTextDell}
                                    >
                                        <FaTrash />
                                        Excluir
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => handleActiveEnd(end.id)}
                                        className={styles.linkTextActivate}
                                    >
                                        <FaCheckCircle />
                                        Ativar
                                    </button>
                                )} 
                            </div>
                        </div>
                    ))}
                </div>    
            </div>
            <Footer/>
        </div>
    )
}