import React, { useState, useEffect } from 'react';

import { NavBar } from "../../components/Global/NavBar/NavBar";
import { Footer } from "../../components/Global/Footer/Footer";

import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useBase64Image } from '../../hooks/useImageConverter';

import styles from './carrinho.module.css';

function CartProductImage({ base64Image, productName }) {
    const { imageUrl, imageError } = useBase64Image(base64Image);

    const getImageSrc = () => {
        if (imageError) {
            return 'https://placehold.co/100x100/e9ecef/6c757d?text=Sem+Imagem';
        }
        if (!imageUrl) {
            return 'https://placehold.co/100x100/e9ecef/6c757d?text=Carregando...';
        }
        return imageUrl;
    };

    return (
        <img
            src={getImageSrc()}
            alt={productName}
            className={styles.productImage}
        />
    );
}

export function Carrinho() {
    const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemsCount, checkItemStock } = useCart();
    const total = getCartTotal();
    const [stockLimits, setStockLimits] = useState({});

    useEffect(() => {
        const fetchStockLimits = async () => {
            const limits = {};
            for (const item of cartItems) {
                const stock = await checkItemStock(item.id);
                limits[item.id] = stock;
            }
            setStockLimits(limits);
        };
        
        if (cartItems.length > 0) {
            fetchStockLimits();
        }
    }, [cartItems.length]);

    const formatarPreco = (preco) => {
        if (typeof preco !== 'number' || isNaN(preco)) {
            return 'R$ 0,00';
        }
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco);
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className={styles.container}>
                <NavBar />
                <main className={styles.main}>
                    <div className={styles.emptyCart}>
                        <div className={styles.emptyIcon}>
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                        </div>
                        <h1 className={styles.emptyTitle}>O seu carrinho está vazio</h1>
                        <p className={styles.emptySubtitle}>Adicione produtos da nossa loja para os ver aqui.</p>
                        <Link to="/loja" className={styles.shopButton}>
                            Ir para a Loja
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <NavBar />
            <main className={styles.main}>
                <div className={styles.header}>
                    <h1 className={styles.title}>O Meu Carrinho</h1>
                    <span className={styles.itemCount}>
                        {getCartItemsCount()} {getCartItemsCount() === 1 ? 'item' : 'itens'}
                    </span>
                </div>

                <div className={styles.content}>
                    <div className={styles.cartItems}>
                        <div className={styles.cartHeader}>
                            <h2 className={styles.sectionTitle}>Produtos</h2>
                            <button onClick={clearCart} className={styles.clearButton}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 6h18" />
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                </svg>
                                Limpar Carrinho
                            </button>
                        </div>

                        {cartItems.map(item => (
                            <div key={item.id} className={styles.cartItem}>
                                <div className={styles.itemImage}>
                                    <CartProductImage
                                        base64Image={item.primaryImage}
                                        productName={item.name}
                                    />
                                </div>

                                <div className={styles.itemInfo}>
                                    <h3 className={styles.itemName}>{item.name}</h3>
                                    <p className={styles.itemCategory}>{item.category?.name || 'Sem Categoria'}</p>
                                    <p className={styles.itemPrice}>{formatarPreco(item.price)}</p>
                                    <div className={styles.itemSize}>
                                        <span className={styles.sizeLabel}>Tamanho: </span>
                                        <span className={styles.sizeValue}>{item.tamanho}</span>
                                    </div>
                                </div>

                                <div className={styles.itemControlsContent}>
                                    <div className={styles.itemControls}>
                                        <div className={styles.quantityControls}>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                                                className={styles.quantityButton}
                                                disabled={item.quantidade <= 1}
                                            >
                                                -
                                            </button>
                                            <span className={styles.quantity}>{item.quantidade}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                                                className={styles.quantityButton}
                                                disabled={stockLimits[item.id] && item.quantidade >= stockLimits[item.id]}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div className={styles.itemTotal}>
                                            {formatarPreco(item.price * item.quantidade)}
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className={styles.removeButton}
                                            aria-label="Remover produto"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M18 6L6 18" />
                                                <path d="M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.orderSummary}>
                        <h2 className={styles.summaryTitle}>Resumo do Pedido</h2>

                        <div className={styles.summaryItem}>
                            <span>Subtotal ({getCartItemsCount()} {getCartItemsCount() === 1 ? 'item' : 'itens'})</span>
                            <span>{formatarPreco(total)}</span>
                        </div>

                        <div className={styles.summaryItem}>
                            <span>Frete</span>
                            <span className={styles.freeShipping}>Grátis</span>
                        </div>

                        <div className={styles.summaryDivider}></div>

                        <div className={styles.summaryTotal}>
                            <span>Total</span>
                            <span>{formatarPreco(total)}</span>
                        </div>

                        <Link to="/checkout" className={styles.checkoutButton}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 12l2 2 4-4" />
                                <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                            </svg>
                            Finalizar Compra
                        </Link>

                        <Link to="/loja" className={styles.continueShoppingButton}>
                            Continuar a Comprar
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}