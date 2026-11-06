import { useState, useEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState('light'); 
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme'); 

    if (storedTheme) {
      setTheme(storedTheme); 
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    const body = document.body;
    console.log('Aplicando tema:', theme);
    if (theme === 'dark') {
      body.classList.add('dark-theme'); 
      console.log('Classe dark-theme adicionada');
    } else {
      body.classList.remove('dark-theme'); 
      console.log('Classe dark-theme removida');
    }
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    console.log('Classes no body:', body.classList.toString());
  }, [theme]);

  const toggleTheme = () => {
    console.log('Botão clicado! Tema atual:', theme);
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return [theme, toggleTheme];
};

export default useTheme;