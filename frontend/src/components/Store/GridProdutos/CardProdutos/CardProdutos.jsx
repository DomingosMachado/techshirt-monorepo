import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './cardProdutos.module.css';
import { useBase64Image } from '../../../../hooks/useImageConverter';
import { api } from '../../../../services/api';

export function CardProduto({ product, onOpenModal }) {
  const [sizes, setSizes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSizes = async () => {
      if (!product?.id) return;

      try {
        const response = await api.get(`/productsStock/product/${product.id}`);
        const availableSizes = response.data
          .filter(stock => stock.stock > 0 && stock.status === true)
          .map(stock => stock.productSize);
        const sizeOrder = ['PP', 'P', 'M', 'G', 'GG', 'XGG'];
        const sortedSizes = availableSizes.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b));
        setSizes(sortedSizes);
      } catch (error) {
        console.error("Erro ao buscar tamanhos:", error);
      }
    };

    fetchSizes();
  }, [product]);

  if (!product) return null;

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco);
  };

  const { name, price, primaryImage, description, category } = product;

  const { imageUrl, imageError } = useBase64Image(primaryImage);

  const getImageSrc = () => {
    if (imageError) {
      return 'https://placehold.co/400x400/e9ecef/6c757d?text=Imagem+Indisponível';
    }
    if (!imageUrl) {
      return 'https://placehold.co/400x400/e9ecef/6c757d?text=Carregando...';
    }
    return imageUrl;
  };

  const handleCardClick = (e) => {
    if (e.target.closest(`.${styles.botaoComprar}`)) {
      return;
    }
    navigate(`/product/${product.id}`);
  };

  const renderTamanhos = () => {
    if (sizes.length === 0) {
      return <span className={styles.tamanho}>Sem estoque</span>;
    }

    return (
      <>
        {sizes.map((size, index) => (
          <span key={index} className={styles.tamanho}>{size}</span>
        ))}
      </>
    );
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.imagemContainer}>
        <img
          src={getImageSrc()}
          alt={name}
          className={styles.imagem}
          loading="lazy"
        />
      </div>

      <div className={styles.conteudo}>
        <div className={styles.info}>
          <p className={styles.categoria}>{category?.name || 'Sem Categoria'}</p>
          <h3 className={styles.nome}>{name}</h3>
          <p className={styles.descricao}>{description}</p>
        </div>

        <div className={styles.tamanhos}>
          <div className={styles.tamanhosList}>
            {renderTamanhos()}
          </div>
        </div>

        <div className={styles.rodape}>
          <span className={styles.preco}>{formatarPreco(price)}</span>
          <button
            className={styles.botaoComprar}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenModal(product, sizes);
            }}
            disabled={sizes.length === 0}
            aria-label={`Selecionar tamanho para ${name}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}