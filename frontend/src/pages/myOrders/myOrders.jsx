import { NavBar } from "../../components/Global/NavBar/NavBar";
import { Footer } from "../../components/Global/Footer/Footer";
import { useState, useEffect } from "react";
import styles from "./myOrders.module.css"
import { api } from "../../services/api";
import { FaShoppingCart, FaBox, FaClock, FaCheckCircle, FaTruck, FaTag, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function MyOrders(){
    const token = localStorage.getItem("token")
    const [pedidos, setPedidos] = useState([])
    const navigate = useNavigate();

    const buscarPedidos = () => {
        api
            .get("/orders/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(res => setPedidos(res.data))
            .catch(err => console.error("Erro ao buscar endereços", err));
    }

    useEffect(() =>{
            buscarPedidos();
    }, [])

    const handleBackToProfile = () => {
        navigate("/profile");
    }

    const getStatusIcon = (status) => {
        switch(status) {
            case 'PENDING': return <FaClock className={styles.statusIconPending} />;
            case 'CONFIRMED': return <FaCheckCircle className={styles.statusIconConfirmed} />;
            case 'DELIVERED': return <FaTruck className={styles.statusIconDelivered} />;
            default: return <FaBox className={styles.statusIcon} />;
        }
    }

    const getStatusClass = (status) => {
        switch(status) {
            case 'PENDING': return styles.statusPending;
            case 'CONFIRMED': return styles.statusConfirmed;
            case 'DELIVERED': return styles.statusDelivered;
            default: return '';
        }
    }

    return(
        <div className={styles.container}>
            <NavBar/>
            <div className={styles.mainContent}>
                <button onClick={handleBackToProfile} className={styles.backButton}>
                    <FaArrowLeft />
                    Voltar para o Perfil
                </button>
                <div className={styles.headBox}>
                    <div className={styles.titleSection}>
                        <FaShoppingCart className={styles.titleIcon}/>
                        <h1>Meus Pedidos</h1>
                    </div>
                    <p className={styles.subtitle}>Acompanhe o status de suas compras</p>  
                </div>
                <div
                     className={styles.cardPed}
                >
                    {pedidos.length === 0 ? (
                        <div className={styles.emptyState}>
                            <FaBox className={styles.emptyIcon}/>
                            <p>Você ainda não fez nenhum pedido</p>
                        </div>
                    ) : (
                        pedidos.map((ped) => (
                            <div key={ped.id} className={styles.card}>
                                <div
                                    className={styles.headPed}
                                >
                                    <div className={styles.orderInfo}>
                                        <h3>Pedido #{ped.id}</h3>
                                        {/* <span className={styles.orderDate}>12/03/2024</span> */}
                                    </div>
                                    <div className={`${styles.statusBadge} ${getStatusClass(ped.status)}`}>
                                        {getStatusIcon(ped.status)}
                                        <span>{ped.status}</span>
                                    </div>
                                </div>
                                <div className={styles.itemsContainer}>
                                    {ped.items.map((itemPe, index) => (
                                        <div 
                                            key={index}
                                            className={styles.pedExib}
                                        >
                                            <div className={styles.productImage}>
                                                <FaBox />
                                            </div>
                                            <div
                                                className={styles.prodExib}
                                            >
                                                <p className={styles.productName}>{itemPe.product?.name}</p>
                                                <p className={styles.productDetail}>Cor: {itemPe.product.color}</p>
                                                
                                            </div>
                                            <div
                                                 className={styles.priceInfo}
                                            >
                                                <p className={styles.quantity}>Qtd: {itemPe.quantity}</p>
                                                <p className={styles.price}>R$ {itemPe.pricePerUnit}</p>                                               
                                            </div>
                                        </div>
                                    ))}
                                </div>   
                                <div
                                    className={styles.footerPed}
                                >
                                    {ped.discount > 0 && (
                                        <div className={styles.discountTag}>
                                            <FaTag />
                                            <span>Desconto: R$ {ped.discount}</span>
                                        </div>
                                    )}
                                    <div className={styles.totalSection}>
                                        <span className={styles.totalLabel}>Total:</span>
                                        <span className={styles.totalValue}>R$ {ped.total}</span>
                                    </div>                           
                                </div>                                            
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    )
}