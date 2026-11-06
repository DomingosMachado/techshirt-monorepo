import React, { createContext, useState, useContext, useMemo } from 'react';

const FontSizeContext = createContext();

export function FontSizeProvider({ children }) {
  const [scale, setScale] = useState(1); // 1 equivale a 100% do tamanho base (16px)

  const increase = () => setScale(prevScale => Math.min(prevScale + 0.1, 2)); // Limite de 200%
  const decrease = () => setScale(prevScale => Math.max(prevScale - 0.1, 0.8)); // Limite de 80%
  const reset = () => setScale(1);

  const value = useMemo(() => ({
    scale,
    increase,
    decrease,
    reset
  }), [scale]);

  return (
    <FontSizeContext.Provider value={value}>
      {children}
    </FontSizeContext.Provider>
  );
}

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error('useFontSize deve ser usado dentro de um FontSizeProvider');
  }
  return context;
};