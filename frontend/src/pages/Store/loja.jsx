import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Imports Globais
import { NavBar } from "../../components/Global/NavBar/NavBar";
import { Footer } from "../../components/Global/Footer/Footer";

// Imports Store Components
import { BarraPesquisa } from '../../components/Store/BarraPesquisa/BarraPesquisa';
import { FiltroProdutos } from '../../components/Store/FiltroProdutos/FiltroProdutos';
import { GridProdutos } from '../../components/Store/GridProdutos/GridProdutos';
import { OrdenacaoProdutos } from '../../components/Store/OrdenacaoProdutos/OrdenacaoProdutos';
import { ModalSelecaoTamanho } from '../../components/Store/ModalSelecaoTamanho/ModalSelecaoTamanho';

import { useProduct } from '../../hooks/useProduct';
import { useCart } from '../../hooks/useCart';
import { useCategories } from '../../hooks/useCategories';
import { api } from '../../services/api';
import styles from './loja.module.css';

export function Loja() {
  const { products, loading, error } = useProduct();
  const { categories } = useCategories();
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const [productSizes, setProductSizes] = useState({});

  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [filtros, setFiltros] = useState({
    categories: [],
    sizes: [],
    preco: ''
  });
  const [ordenacao, setOrdenacao] = useState('padrao');
  const [filtrosMobileAbertos, setFiltrosMobileAbertos] = useState(false);
  const [ordenacaoMobileAberta, setOrdenacaoMobileAberta] = useState(false);
  
  // Estado do modal
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [tamanhosSelecionados, setTamanhosSelecionados] = useState([]);

  // Aplicar filtros da URL uma única vez quando categorias carregarem
  useEffect(() => {
    if (categories && categories.length > 0) {
      const categoriaParam = searchParams.get('categoria');
      const tamanhoParam = searchParams.get('tamanho');
      const precoParam = searchParams.get('preco');
      
      if (categoriaParam || tamanhoParam || precoParam) {
        const novosFiltros = {
          categories: [],
          sizes: [],
          preco: ''
        };
        
        // Filtro por categoria
        if (categoriaParam) {
          const categoriaEncontrada = categories.find(cat => 
            cat.name.toLowerCase() === categoriaParam.toLowerCase()
          );
          
          if (categoriaEncontrada) {
            novosFiltros.categories = [categoriaEncontrada.id.toString()];
          }
        }
        
        // Filtro por tamanho
        if (tamanhoParam) {
          const tamanhos = tamanhoParam.split(',').map(t => t.trim().toUpperCase());
          novosFiltros.sizes = tamanhos;
        }
        
        // Filtro por preço
        if (precoParam) {
          novosFiltros.preco = precoParam;
        }
        
        setFiltros(novosFiltros);
      }
    }
  }, [categories]);

  // Buscar tamanhos disponíveis para cada produto
  useEffect(() => {
    const fetchProductSizes = async () => {
      if (!products || products.length === 0) return;

      try {
        const sizesMap = {};
        
        await Promise.all(
          products.map(async (product) => {
            try {
              const response = await api.get(`/productsStock/product/${product.id}`);
              const availableSizes = response.data
                .filter(stock => stock.stock > 0 && stock.status === true)
                .map(stock => stock.productSize);
              
              const sizeOrder = ['PP', 'P', 'M', 'G', 'GG', 'XGG'];
              const sortedSizes = availableSizes.sort((a, b) => 
                sizeOrder.indexOf(a) - sizeOrder.indexOf(b)
              );
              
              sizesMap[product.id] = sortedSizes;
            } catch (error) {
              console.error(`Erro ao buscar tamanhos do produto ${product.id}:`, error);
              sizesMap[product.id] = [];
            }
          })
        );
        
        setProductSizes(sizesMap);
      } catch (error) {
        console.error('Erro ao buscar tamanhos dos produtos:', error);
      }
    };

    fetchProductSizes();
  }, [products]);

  const produtosFiltrados = useMemo(() => {
    let produtosResultantes = products || [];

    // Filtro por termo de pesquisa
    if (termoPesquisa) {
      produtosResultantes = produtosResultantes.filter(p => 
        p.name.toLowerCase().includes(termoPesquisa.toLowerCase())
      );
    }

    // Filtro por categorias
    if (filtros.categories.length > 0) {
      produtosResultantes = produtosResultantes.filter(p => 
        filtros.categories.includes(p.category?.id?.toString())
      );
    }

    // Filtro por preço
    if (filtros.preco) {
      produtosResultantes = produtosResultantes.filter(p => {
        if (filtros.preco === 'ate-30') return p.price <= 30;
        if (filtros.preco === '30-40') return p.price > 30 && p.price <= 40;
        if (filtros.preco === 'acima-40') return p.price > 40;
        return true;
      });
    }

    // Filtro por tamanhos
    if (filtros.sizes.length > 0) {
      produtosResultantes = produtosResultantes.filter(p => {
        const availableSizes = productSizes[p.id] || [];
        return filtros.sizes.some(size => availableSizes.includes(size));
      });
    }

    // Ordenação
    const produtosOrdenados = [...produtosResultantes];
    switch (ordenacao) {
      case 'preco-asc':
        produtosOrdenados.sort((a, b) => a.price - b.price);
        break;
      case 'preco-desc':
        produtosOrdenados.sort((a, b) => b.price - a.price);
        break;
      case 'nome-asc':
        produtosOrdenados.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return produtosOrdenados;
  }, [termoPesquisa, filtros, ordenacao, products, productSizes]);

  const handleOpenModal = (produto, tamanhos) => {
    setProdutoSelecionado(produto);
    setTamanhosSelecionados(tamanhos);
    setModalAberto(true);
  };

  const handleCloseModal = () => {
    setModalAberto(false);
    setProdutoSelecionado(null);
    setTamanhosSelecionados([]);
  };

  const handleAddToCart = ({ produto, tamanho, quantidade }) => {
    addToCart({ produto, tamanho, quantidade });
    handleCloseModal(); 
  };

  if (loading) return <div className={styles.carregando}><p>A carregar produtos...</p></div>;
  if (error) return <div className={styles.carregando}><p>{error}</p></div>;

  return (
    <div className={styles.container}>
      <a href="#main-content" className="skip-link">
        Ir para o conteúdo principal
      </a>
      
      <NavBar />
      
      <main className={styles.main} id="main-content">
        <header className={styles.header}>
          <h1 className={styles.titulo}>Os Nossos Produtos</h1>
          <p className={styles.subtitulo}>Encontre a t-shirt perfeita para expressar a sua paixão por tecnologia.</p>
        </header>

        <section className={styles.pesquisaContainer} aria-label="Pesquisa de produtos">
          <BarraPesquisa onPesquisar={setTermoPesquisa} />
        </section>

        <div className={styles.controlesMobile}>
          <button 
            className={styles.botaoControle} 
            onClick={() => setOrdenacaoMobileAberta(true)}
            aria-label="Abrir opções de ordenação"
          >
            Ordenar
          </button>
          <button 
            className={styles.botaoControle} 
            onClick={() => setFiltrosMobileAbertos(true)}
            aria-label="Abrir filtros de produtos"
          >
            Filtrar
          </button>
        </div>

        <div className={styles.conteudoWrapper}>
          <aside className={styles.sidebar} aria-label="Filtros de produtos">
            <FiltroProdutos 
              onFilterChange={setFiltros}
              filtros={filtros}
            />
          </aside>
          
          <section className={styles.produtosContainer} aria-label="Lista de produtos">
            <GridProdutos produtos={produtosFiltrados} onOpenModal={handleOpenModal} />
          </section>
        </div>
      </main>
      
      <Footer />

      {filtrosMobileAbertos && (
        <div role="dialog" aria-modal="true" aria-labelledby="filtros-titulo">
          <FiltroProdutos
            isMobile
            onFilterChange={setFiltros}
            onClose={() => setFiltrosMobileAbertos(false)}
            filtros={filtros}
          />
        </div>
      )}

      {ordenacaoMobileAberta && (
        <div role="dialog" aria-modal="true" aria-labelledby="ordenacao-titulo">
          <OrdenacaoProdutos
            isOpen={ordenacaoMobileAberta}
            onClose={() => setOrdenacaoMobileAberta(false)}
            onSortChange={setOrdenacao}
            currentSort={ordenacao}
          />
        </div>
      )}

      {modalAberto && produtoSelecionado && (
        <ModalSelecaoTamanho
          produto={produtoSelecionado}
          tamanhos={tamanhosSelecionados}
          isOpen={modalAberto}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}