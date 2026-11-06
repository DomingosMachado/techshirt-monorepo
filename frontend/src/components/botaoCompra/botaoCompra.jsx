import React from 'react';
import { useCart } from '../../hooks/useCart';
import styles from './botaoCompra.module.css'; 

export function BotaoCompra({ produto, icone, children, ...props }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(produto);
    };

    return (
        <button 
            onClick={handleAddToCart}
            className={styles.botao} 
            {...props}
        >
            {icone && <span className={styles.icone}>{icone}</span>}
            {children}
        </button>
    );
}
