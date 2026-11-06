import React, { useState, useEffect } from 'react';
import styles from './modalSelecaoTamanho.module.css';
import { api } from '../../../services/api';

export function ModalSelecaoTamanho({ produto, tamanhos, isOpen, onClose, onAddToCart }) {
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [estoqueDisponivel, setEstoqueDisponivel] = useState(0);

  useEffect(() => {
    const fetchStock = async () => {
      if (tamanhoSelecionado) {
        try {
          const response = await api.get(`/productsStock/product/${produto.id}`);
          const stockData = response.data.find(
            stock => stock.productSize === tamanhoSelecionado && stock.status === true
          );
          setEstoqueDisponivel(stockData ? stockData.stock : 0);
        } catch (error) {
          console.error('Erro ao buscar estoque:', error);
          setEstoqueDisponivel(0);
        }
      } else {
        setEstoqueDisponivel(0);
      }
    };
    fetchStock();
  }, [tamanhoSelecionado, produto.id]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tamanhoSelecionado) return;
    
    onAddToCart({
      produto,
      tamanho: tamanhoSelecionado,
      quantidade
    });
    
    setTamanhoSelecionado('');
    setQuantidade(1);
    onClose();
  };

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco);
  };

  return (
    <div 
      className={styles.overlay} 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>{produto.name}</h3>
          <button 
            className={styles.fechar} 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }} 
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        <div className={styles.conteudo}>
          <div className={styles.preco}>{formatarPreco(produto.price)}</div>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.campo}>
              <label htmlFor="tamanho">Tamanho *</label>
              <select 
                id="tamanho"
                value={tamanhoSelecionado}
                onChange={(e) => setTamanhoSelecionado(e.target.value)}
                required
              >
                <option value="">Selecione um tamanho</option>
                {tamanhos.map(tamanho => (
                  <option key={tamanho} value={tamanho}>{tamanho}</option>
                ))}
              </select>
            </div>

            <div className={styles.campo}>
              <label htmlFor="quantidade">Quantidade</label>
              <div className={styles.quantidadeControls}>
                <button 
                  type="button" 
                  onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                  disabled={quantidade <= 1}
                >
                  -
                </button>
                <input 
                  id="quantidade"
                  type="number" 
                  value={quantidade}
                  onChange={(e) => setQuantidade(Math.max(1, Math.min(estoqueDisponivel, parseInt(e.target.value) || 1)))}
                  min="1"
                  max={estoqueDisponivel}
                  disabled={!tamanhoSelecionado}
                />
                <button 
                  type="button" 
                  onClick={() => setQuantidade(Math.min(estoqueDisponivel, quantidade + 1))}
                  disabled={quantidade >= estoqueDisponivel || !tamanhoSelecionado}
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.total}>
              Total: {formatarPreco(produto.price * quantidade)}
            </div>

            <div className={styles.acoes}>
              <button 
                type="button" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose();
                }} 
                className={styles.cancelar}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className={styles.adicionar} 
                disabled={!tamanhoSelecionado}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}