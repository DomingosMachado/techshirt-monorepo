import React, { useState, createContext, useEffect } from 'react';
import { api } from '../services/api';
import { toast } from 'react-toastify';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('cartItems');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Não foi possível carregar os dados do carrinho do localStorage", error);
            return [];
        }
    });

    const [stockCache, setStockCache] = useState({});

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const fetchProductStock = async (productId, size) => {
        const cacheKey = `${productId}_${size}`;
        
        if (stockCache[cacheKey] && stockCache[cacheKey].timestamp > Date.now() - 300000) {
            return stockCache[cacheKey].stock;
        }

        try {
            const response = await api.get(`/productsStock/product/${productId}`);
            const stockData = response.data.find(
                stock => stock.productSize === size && stock.status === true
            );
            
            const availableStock = stockData ? stockData.stock : 0;
            
            setStockCache(prev => ({
                ...prev,
                [cacheKey]: {
                    stock: availableStock,
                    timestamp: Date.now()
                }
            }));
            
            return availableStock;
        } catch (error) {
            console.error('Erro ao buscar estoque:', error);
            return 0;
        }
    };

    const addToCart = async ({ produto, tamanho, quantidade = 1 }) => {
        const itemId = `${produto.id}_${tamanho}`;
        
        const stockDisponivel = await fetchProductStock(produto.id, tamanho);
        
        const itemExistente = cartItems.find(item => item.id === itemId);
        const quantidadeAtual = itemExistente ? itemExistente.quantidade : 0;
        const quantidadeTotal = quantidadeAtual + quantidade;
        
        if (stockDisponivel === 0) {
            toast.error('Produto sem estoque!');
            return false;
        }
        
        if (quantidadeTotal > stockDisponivel) {
            const disponivel = stockDisponivel - quantidadeAtual;
            if (disponivel > 0) {
                toast.warning(`Apenas ${disponivel} unidade(s) disponível(is). Adicionando quantidade máxima.`);
                quantidade = disponivel;
            } else {
                toast.error(`Limite de estoque atingido! Máximo: ${stockDisponivel} unidade(s)`);
                return false;
            }
        }
        
        setCartItems(prevItems => {
            if (itemExistente) {
                return prevItems.map(item =>
                    item.id === itemId 
                        ? { ...item, quantidade: item.quantidade + quantidade }
                        : item
                );
            } else {
                const novoItem = {
                    id: itemId,
                    produto: produto,
                    tamanho: tamanho,
                    quantidade: quantidade,
                    name: produto.name,
                    price: produto.price,
                    primaryImage: produto.primaryImage,
                    category: produto.category
                };
                
                return [...prevItems, novoItem];
            }
        });
        
        return true;
    };

    const removeFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const updateQuantity = async (itemId, novaQuantidade) => {
        if (novaQuantidade <= 0) {
            removeFromCart(itemId);
            return;
        }
        
        const item = cartItems.find(item => item.id === itemId);
        if (!item) return;
        
        const productId = item.produto?.id || itemId.split('_')[0];
        const tamanho = item.tamanho || itemId.split('_')[1];
        const stockDisponivel = await fetchProductStock(productId, tamanho);
        
        if (novaQuantidade > stockDisponivel) {
            toast.error(`Limite de estoque: ${stockDisponivel} unidade(s)`);
            novaQuantidade = stockDisponivel;
        }
        
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId 
                    ? { ...item, quantidade: novaQuantidade }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        setStockCache({});
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const preco = item.produto?.price || item.price || 0;
            const quantidade = item.quantidade || item.quantity || 0;
            return total + (preco * quantidade);
        }, 0);
    };

    const getCartItemsCount = () => {
        return cartItems.reduce((total, item) => {
            const quantidade = item.quantidade || item.quantity || 0;
            return total + quantidade;
        }, 0);
    };

    const getItemSize = (itemId) => {
        const item = cartItems.find(item => item.id === itemId);
        return item?.tamanho || '';
    };

    const hasItems = () => {
        return cartItems.length > 0;
    };

    const getFormattedCartItems = () => {
        if (!cartItems) return [];
        return cartItems.map(item => {
            if (item.produto) {
                return {
                    ...item,
                    quantidade: item.quantidade || item.quantity || 1,
                    quantity: item.quantidade || item.quantity || 1
                };
            }

            const isStringId = typeof item.id === 'string';
            const productId = isStringId ? item.id.split('_')[0] : item.id;
            const tamanho = isStringId ? item.id.split('_')[1] : (item.tamanho || '');

            return {
                id: item.id,
                produto: {
                    id: productId,
                    name: item.name,
                    price: item.price,
                    primaryImage: item.primaryImage,
                    category: item.category
                },
                tamanho: tamanho,
                quantidade: item.quantity || 1,
                name: item.name,
                price: item.price,
                primaryImage: item.primaryImage,
                category: item.category,
                quantity: item.quantity || 1
            };
        });
    };

    const checkItemStock = async (itemId) => {
        const item = cartItems.find(item => item.id === itemId);
        if (!item) return 0;
        
        const productId = item.produto?.id || itemId.split('_')[0];
        const tamanho = item.tamanho || itemId.split('_')[1];
        
        return await fetchProductStock(productId, tamanho);
    };

    return (
        <CartContext.Provider value={{
            cartItems: getFormattedCartItems(),
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartItemsCount,
            getItemSize,
            hasItems,
            checkItemStock,
            selectedSizes: {}, 
            setProductSize: () => {}, 
            getProductSize: (itemId) => getItemSize(itemId)
        }}>
            {children}
        </CartContext.Provider>
    );
}

export { CartContext };