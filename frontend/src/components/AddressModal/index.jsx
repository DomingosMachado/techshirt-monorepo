import { useState } from 'react';
import styles from './AddressModal.module.css';
import { api } from '../../services/api';

const AddressModal = ({ onClose, onSave }) => {
    const [address, setAddress] = useState({
        nome: '',
        cep: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleCepBlur = async (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        if (cep.length !== 8) return;

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (!data.erro) {
                setAddress((prev) => ({
                    ...prev,
                    rua: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    estado: data.uf,
                }));
            } else {
                alert('CEP não encontrado.');
            }
        } catch (error) {
            alert('Erro ao buscar o CEP.');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        // Validação dos campos obrigatórios
        if (!address.nome.trim() || !address.cep.trim() || !address.numero.trim()) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            
            // Verifica se o token existe
            if (!token) {
                alert("Erro de autenticação. Por favor, faça login novamente.");
                setIsLoading(false);
                return;
            }
            
            // Prepara os dados para envio
            const house = {
                name: address.nome.trim(),
                cep: address.cep.replace(/\D/g, ''), // Remove caracteres não numéricos
                number: address.numero.trim(),
                complement: address.complemento.trim() || "" // Garante que complement não seja undefined
            };

            console.log('Enviando dados:', house); // Debug

            const response = await api.post("/houses", house, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('Resposta da API:', response.data); // Debug
            
            // Verifica se a resposta foi bem sucedida
            if (response.data) {
                // Chama o callback onSave com o novo endereço
                if (onSave) {
                    onSave(response.data);
                }
                
                // Fecha o modal apenas após sucesso
                onClose();
            }
        } catch (error) {
            console.error("Erro ao adicionar o endereço:", error);
            console.error("Detalhes do erro:", error.response?.data); // Debug
            
            if (error.response?.status === 401) {
                alert('Sessão expirada. Por favor, faça login novamente.');
            } else if (error.response?.status === 400) {
                alert('Dados inválidos. Verifique os campos e tente novamente.');
            } else {
                alert('Erro ao adicionar endereço. Tente novamente.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.modalBackdrop} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className={styles.modalContent}>
                <div className={styles.closeContent}>
                    <button onClick={onClose} className={styles.closeButton}>X</button>
                </div>
                <h2 className={styles.sectionTitle}>Novo Endereço</h2>
                <div>
                    <form className={styles.formContent} onSubmit={handleSave}>
                        <div className={styles.inputContent}>
                            <label htmlFor="nome">Nome do endereço <span>*</span></label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={address.nome}
                                onChange={handleChange}
                                placeholder="Ex: Minha Casa de Praia"
                                required
                            />
                        </div>

                        <div className={styles.inputContent}>
                            <label htmlFor="cep">CEP <span>*</span></label>
                            <input
                                type="text"
                                id="cep"
                                name="cep"
                                value={address.cep}
                                onChange={handleChange}
                                onBlur={handleCepBlur}
                                placeholder="Ex: 25635400"
                                maxLength="8"
                                required
                            />
                        </div>

                        <div className={styles.inputContent}>
                            <label htmlFor="estado">UF</label>
                            <input
                                type="text"
                                id="estado"
                                name="estado"
                                value={address.estado}
                                onChange={handleChange}
                                placeholder="Estado"
                                readOnly
                            />
                        </div>

                        <div className={styles.inputContent}>
                            <label htmlFor="cidade">Cidade</label>
                            <input
                                type="text"
                                id="cidade"
                                name="cidade"
                                value={address.cidade}
                                onChange={handleChange}
                                placeholder="Cidade"
                                readOnly
                            />
                        </div>

                        <div className={styles.inputContent}>
                            <label htmlFor="bairro">Bairro</label>
                            <input
                                type="text"
                                id="bairro"
                                name="bairro"
                                value={address.bairro}
                                onChange={handleChange}
                                placeholder="Bairro"
                                readOnly
                            />
                        </div>

                        <div className={styles.inputContent}>
                            <label htmlFor="rua">Rua</label>
                            <input
                                type="text"
                                id="rua"
                                name="rua"
                                value={address.rua}
                                onChange={handleChange}
                                placeholder="Rua"
                                readOnly
                            />
                        </div>

                        <div className={styles.inputContent}>
                            <label htmlFor="numero">Número do Endereço <span>*</span></label>
                            <input
                                type="text"
                                id="numero"
                                name="numero"
                                value={address.numero}
                                onChange={handleChange}
                                placeholder="Ex: 100"
                                required
                            />
                        </div>

                        <div className={styles.inputContent}>
                            <label htmlFor="complemento">Complemento</label>
                            <input
                                type="text"
                                id="complemento"
                                name="complemento"
                                value={address.complemento}
                                onChange={handleChange}
                                placeholder="Ex: Portão branco, ao lado da padaria"
                            />
                        </div>

                        <button 
                            type="submit" 
                            className={styles.saveButton}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Salvando...' : 'Salvar Endereço'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddressModal;