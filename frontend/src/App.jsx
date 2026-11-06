import React, { useEffect } from 'react';
import './Global.css';
import { Rotas } from './Routes/Routes';
import { useFontSize } from './contexts/FontSizeContext';

function App() {
  const { scale } = useFontSize();
  
  useEffect(() => {
    const baseFontSize = 16;
    document.documentElement.style.fontSize = `${scale * baseFontSize}px`;
  }, [scale]);

  return <Rotas />;
}

export default App;