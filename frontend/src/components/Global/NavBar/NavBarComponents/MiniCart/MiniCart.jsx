import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../../../hooks/useCart';
import styles from './minicart.module.css';

function MiniCartImage({ base64Image, productName }) {
    const [imageUrl, setImageUrl] = React.useState(null);
    React.useEffect(() => {
        if (base64Image) {
            setImageUrl(`data:image/png;base64,${base64Image}`);
        }
    }, [base64Image]);

    if (!imageUrl) {
        return <div className={styles.imagePlaceholder}>Carregando...</div>;
    }

    return <img src={imageUrl} alt={productName} className={styles.productImage} />;
}


export function MiniCart({ isVisible, onClose }) {
    const { cartItems, getCartTotal, getCartItemsCount } = useCart();
    const total = getCartTotal();
    const itemsCount = getCartItemsCount();

    const formatarPreco = (preco) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco || 0);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.miniCartContainer} onMouseLeave={onClose}>
            {cartItems.length === 0 ? (
                <div className={styles.emptyCart}>
                    <p>O seu carrinho está vazio.</p>
                    <Link to="/loja" className={styles.shopButton} onClick={onClose}>
                        Ir para a loja
                    </Link>
                </div>
            ) : (
                <>
                    <div className={styles.header}>
                        <h4 className={styles.title}>Meu Carrinho ({itemsCount})</h4>
                    </div>
                    <div className={styles.itemsList}>
                        {cartItems.slice(0, 3).map(item => ( 
                            <div key={item.id} className={styles.item}>
                                <MiniCartImage base64Image={item.primaryImage} productName={item.name} />
                                <div className={styles.itemInfo}>
                                    <p className={styles.itemName}>{item.name}</p>
                                    <p className={styles.itemQuantity}>Qtd: {item.quantity}</p>
                                </div>
                                <p className={styles.itemPrice}>{formatarPreco(item.price * item.quantity)}</p>
                            </div>
                        ))}
                        {cartItems.length > 3 && (
                             <p className={styles.moreItems}>E mais {cartItems.length - 3} item(ns)...</p>
                        )}
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.total}>
                            <span>Subtotal:</span>
                            <span>{formatarPreco(total)}</span>
                        </div>
                        <Link to="/carrinho" className={styles.cartButton} onClick={onClose}>
                            Ver Carrinho
                        </Link>
                        <Link to="/checkout" className={styles.checkoutButton} onClick={onClose}>
                            Finalizar Compra
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}