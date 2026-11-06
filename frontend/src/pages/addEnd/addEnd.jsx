// Imports Globais
    import { NavBar } from "../../components/Global/NavBar/NavBar";
    import { Footer } from "../../components/Global/Footer/Footer";

    import styles from './addEnd.module.css';
    import { useState } from 'react';
    import { api } from "../../services/api";
import { useNavigate } from 'react-router-dom';

    export function AddEnd() {
        const token = localStorage.getItem("token");
        const navegate = useNavigate()
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

    const house ={
        name: address.nome,
        cep: address.cep,
        number: address.numero,
        complement: address.complemento
    }

    const handleAddEnd = (e) => {
        e.preventDefault();

        api
            .post("/houses", house, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then((data) => {
                navegate("/address")
            })
            .catch((error) => {
                console.log("Erro ao adicionar o endereço", error)
            })

    }

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

    return (
        <div>
        <NavBar />
        <div className={styles.areatotal}>
            <div className={styles.areaRegister}>
            <div className={styles.titulo}>
                <h1>Adicionar Endereço</h1>
            </div>
            <form 
                onSubmit={handleAddEnd}
                className={styles.formRegister}
                >
                <div className={styles.divEmail}>
                <h3>Nome:</h3>
                <input
                    name="nome"
                    value={address.nome}
                    onChange={handleChange}
                    type="text"
                    placeholder="Nome da residência"
                    className={styles.input}
                    required
                />
                </div>

                <div className={styles.divCep}>
                <h3>CEP:</h3>
                <input
                    name="cep"
                    value={address.cep}
                    onChange={handleChange}
                    onBlur={handleCepBlur}
                    type="text"
                    placeholder="CEP"
                    className={styles.input}
                    required
                />
                </div>                
                <div className={styles.divEstado}>
                    <h3>UF:</h3>
                    <input
                    name="estado"
                    value={address.estado}
                    onChange={handleChange}
                    type="text"
                    placeholder="Estado"
                    className={styles.input}
                    required
                    />
                </div>
                <div className={styles.divCidade}>
                    <h3>Cidade:</h3>
                    <input
                    name="cidade"
                    value={address.cidade}
                    onChange={handleChange}
                    type="text"
                    placeholder="Cidade"
                    className={styles.input}
                    required
                    />
                </div>              
                <div className={styles.divBairro}>
                    <h3>Bairro:</h3>
                    <input
                    name="bairro"
                    value={address.bairro}
                    onChange={handleChange}
                    type="text"
                    placeholder="Bairro"
                    className={styles.input}
                    required
                    />
                </div>

                <div className={styles.divRua}>
                    <h3>Rua:</h3>
                    <input
                    name="rua"
                    value={address.rua}
                    onChange={handleChange}
                    type="text"
                    placeholder="Rua"
                    className={styles.input}
                    required
                    />
                </div>
                               
                <div className={styles.divNumber}>
                    <h3>Número:</h3>
                    <input
                    name="numero"
                    value={address.numero}
                    onChange={handleChange}
                    type="text"
                    placeholder="Número"
                    className={styles.input}
                    required
                    />
                </div>

                <div className={styles.divCompl}>
                    <h3>Complemento:</h3>
                    <input
                    name="complemento"
                    value={address.complemento}
                    onChange={handleChange}
                    type="text"
                    placeholder="Complemento"
                    className={styles.input}
                    required
                    />
                </div>
                
                <div>
                <button 
                    type="submit" 
                    className={styles.buttonEntrar}
                >
                    Adicionar
                </button>
                </div>
            </form>
            </div>
        </div>
        <Footer />
        </div>
    );
    }
