import React, { useEffect, useState } from 'react';

// Imports Globais
import { NavBar } from "../../components/Global/NavBar/NavBar";
import { Footer } from "../../components/Global/Footer/Footer";

import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useCart } from '../../hooks/useCart';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/authContext';

import { useBase64Image } from '../../hooks/useImageConverter';

import styles from './checkout.module.css';
import HouseCard from '../../components/HouseCard';
import AddressModal from '../../components/AddressModal';

function OrderSuccessModal({ isOpen, onClose }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.successModalContent}>
                <div className={styles.successIconWrapper}>
                    <svg className={styles.successIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle className={styles.successIconCircle} cx="26" cy="26" r="25" fill="none" />
                        <path className={styles.successIconCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                </div>
                <h2 className={styles.modalTitle}>Compra Realizada!</h2>
                <p className={styles.modalText}>O seu pedido foi processado com sucesso.</p>
                <button onClick={onClose} className={styles.successButton}>
                    OK
                </button>
            </div>
        </div>
    );
}

function CheckoutProductImage({ base64Image, productName }) {
    const { imageUrl, imageError } = useBase64Image(base64Image);
    const getImageSrc = () => {
        if (imageError) return 'https://placehold.co/50x50/e9ecef/6c757d?text=Sem+Imagem';
        if (!imageUrl) return 'https://placehold.co/50x50/e9ecef/6c757d?text=...';
        return imageUrl;
    };
    return <img src={getImageSrc()} alt={productName} className={styles.productImage} />;
}

function LoginPromptModal() {
    return (
        <div className={styles.promptOverlay}>
            <div className={styles.promptModal}>
                <h2 className={styles.promptTitle}>Quase lá!</h2>
                <p className={styles.promptText}>
                    Para continuar, por favor, faça login ou crie uma conta.
                </p>
                <div className={styles.promptButtons}>
                    <Link to="/login" className={styles.loginButton}>Fazer Login</Link>
                    <Link to="/register" className={styles.registerButton}>Criar Conta</Link>
                </div>
            </div>
        </div>
    );
}

export function Checkout() {
    const { isAuthenticated } = useAuth();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [cardInfo, setCardInfo] = useState({ number: '', name: '', expiry: '', cvv: '' });
    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [parcelas, setParcelas] = useState(1);

    const [isLoading, setIsLoading] = useState(false);
    const [isOrderSuccessModalOpen, setOrderSuccessModalOpen] = useState(false);
    const [errors, setErrors] = useState({});

    const [houses, setHouses] = useState([]);
    const [selectedHouseId, setSelectedHouseId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Estado para métodos desabilitados - simples e direto
    const [disabledMethods, setDisabledMethods] = useState(new Set());

    useEffect(() => {
        if (isAuthenticated) {
            const fetchHouses = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await api.get('/houses/user', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    setHouses(response.data);

                    const firstActiveHouse = response.data.find(h => h.status);
                    if (firstActiveHouse) {
                        setSelectedHouseId(firstActiveHouse.id);
                    }
                } catch (error) {
                    console.error("Erro ao buscar casas", error);
                }
            };
            fetchHouses();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const response = await api.get('/paymentMethods/user');
                const disabled = new Set();
                
                if (response.data && Array.isArray(response.data)) {
                    response.data.forEach(method => {
                        // Se status é false, adiciona na lista de desabilitados
                        if (method.status === false) {
                            if (method.method === 'PIX') disabled.add('pix');
                            else if (method.method === 'Credit') disabled.add('credit-card');
                            else if (method.method === 'Debit') disabled.add('debit-card');
                            else if (method.method === 'BankSlip') disabled.add('boleto');
                        }
                    });
                }
                
                setDisabledMethods(disabled);
                console.log('Métodos desabilitados:', Array.from(disabled));
            } catch (error) {
                console.warn("Não foi possível verificar métodos de pagamento:", error);
                // Se der erro, não desabilita nada
                setDisabledMethods(new Set());
            }
        };
        
        fetchPaymentMethods();
        
        // Atualizar a cada 10 segundos para sincronizar com mudanças do admin
        const interval = setInterval(fetchPaymentMethods, 10000);
        return () => clearInterval(interval);
    }, []);

    const total = getCartTotal();

    const handleCardInfoChange = (e) => {
        let { name, value } = e.target;

        if (name === 'number') {
            const digits = value.replace(/\D/g, '');
            value = digits.match(/.{1,4}/g)?.join(' ').slice(0, 19) || '';
        } else if (name === 'expiry') {
            const digits = value.replace(/\D/g, '');
            value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2, 4)}` : digits;
        } else if (name === 'cvv') {
            value = value.replace(/\D/g, '').slice(0, 4);
        } else if (name === 'name') {
            value = value.replace(/[^a-zA-Z\s]/g, '');
        }

        setCardInfo(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (paymentMethod === 'credit-card' || paymentMethod === 'debit-card') {
            if (cardInfo.number.replace(/\s/g, '').length !== 16) newErrors.number = 'Número do cartão deve ter 16 dígitos.';
            if (!cardInfo.name.trim()) newErrors.name = 'Nome do titular é obrigatório.';
            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardInfo.expiry)) newErrors.expiry = 'Validade inválida (MM/AA).';
            if (cardInfo.cvv.length < 3) newErrors.cvv = 'CVV deve ter 3 ou 4 dígitos.';
        }
        if (!selectedHouseId) {
            toast.warn('Por favor, selecione ou adicione um endereço de entrega.');
            newErrors.house = 'Endereço é obrigatório.';
        }
        return newErrors;
    };

    const getPaymentMethodName = (method) => {
        const paymentNames = {
            'pix': 'PIX',
            'boleto': 'Boleto',
            'credit-card': 'Cartão de Crédito',
            'debit-card': 'Cartão de Débito'
        };
        return paymentNames[method] || method;
    };

    const handleFinalizarCompra = async () => {
        if (!isAuthenticated) {
            toast.warn('Por favor, faça login para finalizar a compra.');
            return;
        }

        // Verificar se o método selecionado está desabilitado
        if (disabledMethods.has(paymentMethod)) {
            toast.error(`O método de pagamento ${getPaymentMethodName(paymentMethod)} está temporariamente indisponível. Por favor, selecione outro método.`);
            return;
        }

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsLoading(true);
        try {
            let paymentMethodId;
            if (paymentMethod === 'pix') {
                paymentMethodId = 1;
            } else if (paymentMethod === 'boleto') {
                paymentMethodId = 2;
            } else if (paymentMethod === 'credit-card') {
                paymentMethodId = 3;
            } else if (paymentMethod === 'debit-card') {
                paymentMethodId = 4;
            } else {
                throw new Error("Método de pagamento inválido");
            }
            
            const orderPayload = {
                discount: 0.0,
                installment: parcelas,
                paymentMethodId: paymentMethodId,
                houseId: selectedHouseId,
                products: cartItems.map(item => ({
                    productId: item.produto.id,
                    productSize: item.tamanho,
                    quantity: item.quantidade
                })),
            };
            
            const token = localStorage.getItem('token');
            await api.post('/orders', orderPayload, {
                 headers: { 'Authorization': `Bearer ${token}` }
            });

            clearCart();
            setOrderSuccessModalOpen(true);
        } catch (error) {
            console.error("Erro ao finalizar a compra:", error.response?.data || error.message);
            
            let errorMessage = '';
            
            if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
                const specificError = error.response.data.errors[0];
                if (specificError.toLowerCase().includes('is disabled') || 
                    specificError.toLowerCase().includes('desativado') ||
                    specificError.toLowerCase().includes('indisponível')) {
                    errorMessage = `Compra não realizada. O método de pagamento ${getPaymentMethodName(paymentMethod)} está temporariamente indisponível. Por favor, tente outro método de pagamento.`;
                } else {
                    errorMessage = specificError;
                }
            } else if (error.response?.data?.message) {
                const apiMessage = error.response.data.message;
                if (apiMessage.toLowerCase().includes('is disabled') || 
                    apiMessage.toLowerCase().includes('desativado') ||
                    apiMessage.toLowerCase().includes('indisponível')) {
                    errorMessage = `Compra não realizada. O método de pagamento ${getPaymentMethodName(paymentMethod)} está temporariamente indisponível. Por favor, tente outro método de pagamento.`;
                } else {
                    errorMessage = apiMessage;
                }
            } else if (error.response?.status === 400 || error.response?.status === 422) {
                errorMessage = `Compra não realizada. O método de pagamento ${getPaymentMethodName(paymentMethod)} não pôde ser processado. Por favor, tente outro método de pagamento.`;
            } else {
                errorMessage = 'Compra não realizada. Por favor, tente outro método de pagamento ou entre em contato com o suporte.';
            }
            
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseSuccessModal = () => {
        setOrderSuccessModalOpen(false);
        navigate('/');
    };

    const formatarPreco = (preco) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco || 0);

    const calcularValorParcela = (p) => {
        const juros = 0.03;
        const aplicarJuros = p >= 3;
        const totalComJuros = aplicarJuros ? total * (1 + (juros * p)) : total;
        return totalComJuros / p;
    };

    const calcularValorJuros = () => {
        if (parcelas >= 3) {
            const taxa = 0.03;
            const juros = total * (taxa * parcelas);
            return juros;
        }
        return 0;
    };

    const totalFinal = (paymentMethod === 'credit-card' || paymentMethod === 'debit-card') && parcelas >= 3
        ? total * (1 + (0.03 * parcelas))
        : total;

    return (
        <>
            <OrderSuccessModal isOpen={isOrderSuccessModalOpen} onClose={handleCloseSuccessModal} />
            <div className={styles.container}>
                <NavBar />
                <main className={styles.main}>
                    <div className={styles.header}><h1 className={styles.title}>Finalizar Compra</h1></div>
                    <div className={styles.content}>
                        <div className={styles.formWrapper}>
                            {!isAuthenticated && <LoginPromptModal />}
                            <form className={styles.formContainer} onSubmit={(e) => e.preventDefault()}>
                                {isAuthenticated && houses.length > 0
                                    ? <h2 className={styles.subtitle}>Para onde enviar o pedido?</h2>
                                    : isAuthenticated && <h2 className={styles.subtitle}>Adicione um endereço para seu pedido.</h2>
                                }
                                {isAuthenticated && (
                                    <>
                                        <div className={styles.houseList}>
                                            {houses.map(house => (
                                                <HouseCard
                                                    key={house.id}
                                                    house={house}
                                                    isSelected={selectedHouseId === house.id}
                                                    onClick={() => {
                                                        if (house.status) {
                                                            setSelectedHouseId(house.id)
                                                        }
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        <div className={styles.addressButtonContent}>
                                            <button type="button" onClick={() => setIsModalOpen(true)} className={styles.addressButton}>
                                                Adicionar Novo Endereço
                                            </button>
                                        </div>
                                    </>
                                )}

                                <div className={styles.formSection}>
                                    <h2 className={styles.sectionTitle}>Pagamento</h2>
                                    <div className={styles.paymentMethodSelector}>
                                        <button type="button" className={`${styles.paymentButton} ${paymentMethod === 'credit-card' ? styles.active : ''} ${disabledMethods.has('credit-card') ? styles.disabled : ''}`} onClick={() => setPaymentMethod('credit-card')}>
                                            Cartão de Crédito
                                            {disabledMethods.has('credit-card') && <small style={{color: '#ff6b6b', fontStyle: 'italic'}}> (Indisponível)</small>}
                                        </button>
                                        <button type="button" className={`${styles.paymentButton} ${paymentMethod === 'debit-card' ? styles.active : ''} ${disabledMethods.has('debit-card') ? styles.disabled : ''}`} onClick={() => setPaymentMethod('debit-card')}>
                                            Cartão de Débito
                                            {disabledMethods.has('debit-card') && <small style={{color: '#ff6b6b', fontStyle: 'italic'}}> (Indisponível)</small>}
                                        </button>
                                        <button type="button" className={`${styles.paymentButton} ${paymentMethod === 'pix' ? styles.active : ''} ${disabledMethods.has('pix') ? styles.disabled : ''}`} onClick={() => setPaymentMethod('pix')}>
                                            Pix
                                            {disabledMethods.has('pix') && <small style={{color: '#ff6b6b', fontStyle: 'italic'}}> (Indisponível)</small>}
                                        </button>
                                        <button type="button" className={`${styles.paymentButton} ${paymentMethod === 'boleto' ? styles.active : ''} ${disabledMethods.has('boleto') ? styles.disabled : ''}`} onClick={() => setPaymentMethod('boleto')}>
                                            Boleto
                                            {disabledMethods.has('boleto') && <small style={{color: '#ff6b6b', fontStyle: 'italic'}}> (Indisponível)</small>}
                                        </button>
                                    </div>

                                    {disabledMethods.has(paymentMethod) && (
                                        <div className={styles.warningMessage}>
                                            ⚠️ O método de pagamento {getPaymentMethodName(paymentMethod)} está temporariamente indisponível. Por favor, selecione outro método.
                                        </div>
                                    )}

                                    {(paymentMethod === 'credit-card' || paymentMethod === 'debit-card') && (
                                        <div className={styles.formGridPayment}>
                                            <div className={`${styles.inputGroup} ${styles.fullWidth}`}><input type="text" name="number" placeholder="Número do Cartão" className={`${styles.input} ${errors.number ? styles.inputError : ''}`} value={cardInfo.number} onChange={handleCardInfoChange} maxLength="19" />{errors.number && <span className={styles.errorMessage}>{errors.number}</span>}</div>
                                            <div className={`${styles.inputGroup} ${styles.fullWidth}`}><input type="text" name="name" placeholder="Nome do Titular" className={`${styles.input} ${errors.name ? styles.inputError : ''}`} value={cardInfo.name} onChange={handleCardInfoChange} />{errors.name && <span className={styles.errorMessage}>{errors.name}</span>}</div>
                                            <div className={styles.inputGroup}><input type="text" name="expiry" placeholder="Validade (MM/AA)" className={`${styles.input} ${errors.expiry ? styles.inputError : ''}`} value={cardInfo.expiry} onChange={handleCardInfoChange} maxLength="5" />{errors.expiry && <span className={styles.errorMessage}>{errors.expiry}</span>}</div>
                                            <div className={styles.inputGroup}><input type="text" name="cvv" placeholder="CVV" className={`${styles.input} ${errors.cvv ? styles.inputError : ''}`} value={cardInfo.cvv} onChange={handleCardInfoChange} maxLength="4" />{errors.cvv && <span className={styles.errorMessage}>{errors.cvv}</span>}</div>
                                            {paymentMethod === 'credit-card' && 
                                                <div className={`${styles.inputGroup} ${styles.fullWidth}`}><select onChange={(e) => setParcelas(Number(e.target.value))} value={parcelas} className={styles.input}>{[...Array(12).keys()].map(n => <option key={n + 1} value={n + 1}>{n + 1}x de {formatarPreco(calcularValorParcela(n + 1))}{(n + 1) <= 2 ? ' sem juros' : ' (com juros)'}</option>)}</select></div>
                                            }
                                        </div>
                                    )}

                                    {paymentMethod === 'pix' && <div className={styles.paymentContent}><p>O código PIX será gerado após a finalização da compra.</p></div>}
                                    {paymentMethod === 'boleto' && <div className={styles.paymentContent}><p>O boleto será gerado e enviado para o seu e-mail.</p></div>}
                                </div>
                            </form>
                        </div>

                        {isModalOpen && (
                            <AddressModal
                                onClose={() => setIsModalOpen(false)}
                                onSave={async (newlySavedHouse) => {
                                    setHouses(currentHouses => [...currentHouses, newlySavedHouse]);
                                    setSelectedHouseId(newlySavedHouse.id);
                                    setIsModalOpen(false);
                                    
                                    try {
                                        const token = localStorage.getItem('token');
                                        const response = await api.get('/houses/user', {
                                            headers: { 'Authorization': `Bearer ${token}` }
                                        });
                                        setHouses(response.data);
                                        
                                        const newHouse = response.data.find(h => h.id === newlySavedHouse.id);
                                        if (newHouse && newHouse.status) {
                                            setSelectedHouseId(newHouse.id);
                                        }
                                    } catch (error) {
                                        console.error("Erro ao recarregar endereços:", error);
                                    }
                                }}
                            />
                        )}

                        <div className={styles.orderSummary}>
                            <h2 className={styles.summaryTitle}>Resumo do Pedido</h2>
                            {cartItems.map(item => 
                                <div key={item.id} className={styles.summaryItem}>
                                    <div className={styles.itemInfo}>
                                        <CheckoutProductImage base64Image={item.produto.primaryImage} productName={item.produto.name} />
                                        <div className={styles.itemDetails}>
                                            <span className={styles.itemName}>
                                                {item.produto.name}
                                            </span>
                                            <span className={styles.itemQuantity}>
                                                Qtd: {item.quantidade}
                                            </span>
                                            <span className={styles.itemQuantity}>
                                                Tam: {item.tamanho}
                                            </span>
                                        </div>
                                    </div>
                                    <span className={styles.itemPrice}>{formatarPreco(item.produto.price * item.quantidade)}</span>
                                </div>
                            )}
                            <div className={styles.summaryDivider}></div>
                            <div className={styles.summaryItem}><span>Subtotal</span><span>{formatarPreco(total)}</span></div>
                            {parcelas >= 3 && (paymentMethod === 'credit-card' || paymentMethod === 'debit-card') && (<div className={styles.summaryItem}><span>Juros</span><span>{formatarPreco(calcularValorJuros())}</span></div>)}
                            <div className={styles.summaryDivider}></div>
                            <div className={styles.summaryTotal}><span>Total</span><span>{formatarPreco(totalFinal)}</span></div>
                            <button type="button" className={styles.checkoutButton} onClick={handleFinalizarCompra} disabled={isLoading || !isAuthenticated}>{isLoading ? 'Processando...' : 'Finalizar Compra'}</button>
                            <Link to="/carrinho" className={styles.continueShoppingButton}>Voltar ao Carrinho</Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}