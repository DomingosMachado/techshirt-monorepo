import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavBar } from "../../../components/Global/NavBar/NavBar";
import { Footer } from "../../../components/Global/Footer/Footer";
import { api } from '../../../services/api';
import { useCart } from '../../../hooks/useCart';
import { useBase64Image } from '../../../hooks/useImageConverter';
import { toast } from 'react-toastify';
import styles from './product.module.css';

export function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    
    const [produto, setProduto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [tamanhos, setTamanhos] = useState([]);
    const [imagemPrincipal, setImagemPrincipal] = useState(null);
    const [imagensAdicionais, setImagensAdicionais] = useState([]);

    useEffect(() => {
        fetchProduto();
        fetchTamanhos();
        fetchImagensAdicionais();
    }, [id]);

    const fetchProduto = async () => {
        try {
            const response = await api.get(`/products/${id}`);
            setProduto(response.data);
            setImagemPrincipal(response.data.primaryImage);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            toast.error('Erro ao carregar produto');
            setLoading(false);
        }
    };

    const fetchTamanhos = async () => {
        try {
            const response = await api.get(`/productsStock/product/${id}`);
            const tamanhosDisponiveis = response.data
                .filter(stock => stock.stock > 0 && stock.status === true)
                .map(stock => ({
                    tamanho: stock.productSize,
                    estoque: stock.stock
                }));
            
            const sizeOrder = ['PP', 'P', 'M', 'G', 'GG', 'XGG'];
            tamanhosDisponiveis.sort((a, b) => {
                const indexA = sizeOrder.indexOf(a.tamanho);
                const indexB = sizeOrder.indexOf(b.tamanho);
                return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
            });
            
            setTamanhos(tamanhosDisponiveis);
        } catch (error) {
            console.error('Erro ao buscar tamanhos:', error);
        }
    };

    const fetchImagensAdicionais = async () => {
        try {
            const response = await api.get(`/product_images/product/${id}`);
            setImagensAdicionais(response.data || []);
        } catch (error) {
            console.error('Erro ao buscar imagens adicionais:', error);
        }
    };

    const { imageUrl: imagemPrincipalUrl } = useBase64Image(imagemPrincipal);

    const handleAddToCart = async () => {
        if (!tamanhoSelecionado) {
            toast.warn('Por favor, selecione um tamanho');
            return;
        }

        const success = await addToCart({
            produto,
            tamanho: tamanhoSelecionado,
            quantidade
        });

        if (success) {
            toast.success('Produto adicionado ao carrinho!');
        }
        
        return success;
    };

    const formatarPreco = (preco) => {
        return new Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        }).format(preco);
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <NavBar />
                <div className={styles.loading}>Carregando produto...</div>
                <Footer />
            </div>
        );
    }

    if (!produto) {
        return (
            <div className={styles.container}>
                <NavBar />
                <div className={styles.notFound}>Produto não encontrado</div>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <NavBar />
            
            <main className={styles.main}>
                <button 
                    onClick={() => navigate('/loja')} 
                    className={styles.voltarButton}
                >
                    ← Voltar para a loja
                </button>

                <div className={styles.produtoContainer}>
                    <div className={styles.galeriaContainer}>
                        <div className={styles.imagemPrincipal}>
                            <img
                                src={imagemPrincipalUrl || 'https://placehold.co/600x600'}
                                alt={produto.name}
                            />
                        </div>
                        
                        {imagensAdicionais.length > 0 && (
                            <div className={styles.miniaturas}>
                                <div 
                                    className={styles.miniatura}
                                    onClick={() => setImagemPrincipal(produto.primaryImage)}
                                >
                                    <img src={imagemPrincipalUrl} alt={produto.name} />
                                </div>
                                {imagensAdicionais.map((img, index) => {
                                    const { imageUrl } = useBase64Image(img.productImage);
                                    return (
                                        <div 
                                            key={img.id} 
                                            className={styles.miniatura}
                                            onClick={() => setImagemPrincipal(img.productImage)}
                                        >
                                            <img src={imageUrl} alt={`${produto.name} ${index + 1}`} />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className={styles.infoContainer}>
                        <div className={styles.categoria}>{produto.category?.name}</div>
                        <h1 className={styles.nome}>{produto.name}</h1>
                        <p className={styles.descricao}>{produto.description}</p>

                        <div className={styles.preco}>{formatarPreco(produto.price)}</div>

                        <div className={styles.detalhes}>
                            <h2>Detalhes do Produto</h2>
                            <ul>
                                <li><strong>Material:</strong> {produto.material || 'Algodão 100%'}</li>
                                <li><strong>Cor:</strong> {produto.color || 'Conforme imagem'}</li>
                                <li><strong>Estampa:</strong> {produto.stamp || 'Estampado'}</li>
                            </ul>
                        </div>

                        <div className={styles.tamanhoSection}>
                            <h2>Tamanho</h2>
                            <div className={styles.tamanhosList}>
                                {tamanhos.map(({ tamanho, estoque }) => (
                                    <button
                                        key={tamanho}
                                        className={`${styles.tamanhoButton} ${tamanhoSelecionado === tamanho ? styles.tamanhoSelecionado : ''}`}
                                        onClick={() => setTamanhoSelecionado(tamanho)}
                                        disabled={estoque === 0}
                                    >
                                        {tamanho}
                                    </button>
                                ))}
                            </div>
                            {tamanhos.length === 0 && (
                                <p className={styles.semEstoque}>Produto sem estoque</p>
                            )}
                        </div>

                        <div className={styles.quantidadeSection}>
                            <h2>Quantidade</h2>
                            <div className={styles.quantidadeControls}>
                                <button
                                    onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                                    disabled={quantidade <= 1}
                                    aria-label="Diminuir quantidade"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantidade}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value) || 1;
                                        const tamanhoData = tamanhos.find(t => t.tamanho === tamanhoSelecionado);
                                        const maxEstoque = tamanhoData ? tamanhoData.estoque : 10;
                                        setQuantidade(Math.max(1, Math.min(maxEstoque, val)));
                                    }}
                                    min="1"
                                    max={tamanhoSelecionado ? tamanhos.find(t => t.tamanho === tamanhoSelecionado)?.estoque || 10 : 10}
                                    aria-label="Quantidade do produto"
                                />
                                <button
                                    onClick={() => {
                                        const tamanhoData = tamanhos.find(t => t.tamanho === tamanhoSelecionado);
                                        const maxEstoque = tamanhoData ? tamanhoData.estoque : 10;
                                        setQuantidade(Math.min(maxEstoque, quantidade + 1));
                                    }}
                                    disabled={tamanhoSelecionado && tamanhos.find(t => t.tamanho === tamanhoSelecionado)?.estoque <= quantidade}
                                    aria-label="Aumentar quantidade"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className={styles.acoes}>
                            <button
                                className={styles.addCarrinho}
                                onClick={handleAddToCart}
                                disabled={tamanhos.length === 0}
                            >
                                Adicionar ao Carrinho
                            </button>
                            <button
                                className={styles.comprarAgora}
                                onClick={async () => {
                                    const success = await handleAddToCart();
                                    if (success !== false) {
                                        navigate('/carrinho');
                                    }
                                }}
                                disabled={tamanhos.length === 0}
                            >
                                Ir para o Carrinho
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}