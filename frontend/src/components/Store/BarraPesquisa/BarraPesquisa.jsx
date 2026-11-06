import { useState } from 'react';
import styles from './barraPesquisa.module.css';

export function BarraPesquisa({ onPesquisar }) {
  const [termo, setTermo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onPesquisar(termo);
  };

  const handleChange = (e) => {
    const valor = e.target.value;
    setTermo(valor);
    onPesquisar(valor); 
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit} role="search">
      <div className={styles.inputContainer}>
        <label htmlFor="pesquisa-produtos" className="sr-only">
          Pesquisar produtos
        </label>
        <input
          id="pesquisa-produtos"
          type="search"
          placeholder="Pesquisar produtos..."
          value={termo}
          onChange={handleChange}
          className={styles.input}
          aria-label="Campo de pesquisa de produtos"
          aria-describedby="pesquisa-hint"
        />
        <div id="pesquisa-hint" className="sr-only">
          Digite para pesquisar produtos em tempo real
        </div>
        <button 
          type="submit" 
          className={styles.botao} 
          aria-label="Executar pesquisa"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      </div>
    </form>
  );
}