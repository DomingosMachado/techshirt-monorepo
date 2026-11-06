import { useState, useEffect } from 'react';

export function hexToDataURL(hexString) {
  if (!hexString) return null;

  try {
    const cleanHex = hexString.replace(/\s/g, '');
    
    if (cleanHex.length % 2 !== 0) {
      console.error("String hex inválida");
      return null;
    }

    const byteArray = new Uint8Array(cleanHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    
    const format = detectImageFormat(byteArray);
    
    if (!format) {
      console.error("Formato de imagem não reconhecido");
      return null;
    }

    const base64String = btoa(String.fromCharCode.apply(null, byteArray));
    
    return `data:${format};base64,${base64String}`;
    
  } catch (error) {
    console.error("Erro na conversão:", error);
    return null;
  }
}

function detectImageFormat(byteArray) {
  const header = byteArray.slice(0, 20);
  
  if (header[0] === 0xFF && header[1] === 0xD8 && header[2] === 0xFF) {
    return 'image/jpeg';
  }
  
  if (header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4E && header[3] === 0x47) {
    return 'image/png';
  }
  
  if (header[0] === 0x47 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x38) {
    return 'image/gif';
  }
  
  if (header[0] === 0x52 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x46) {
    return 'image/webp';
  }
  
  const headerString = String.fromCharCode.apply(null, byteArray.slice(0, 32));
  if (headerString.includes('ftyp') && headerString.includes('avif')) {
    return 'image/avif';
  }
  
  return null;
}

export function convertAvifToCompatible(hexString) {
  if (!hexString) return null;

  try {
    const cleanHex = hexString.replace(/\s/g, '');
    const byteArray = new Uint8Array(cleanHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    
    const headerString = String.fromCharCode.apply(null, byteArray.slice(0, 32));
    if (headerString.includes('ftyp') && headerString.includes('avif')) {
      
      const base64String = btoa(String.fromCharCode.apply(null, byteArray));
      return `data:image/avif;base64,${base64String}`;
    }
    
    return null;
  } catch (error) {
    console.error("Erro na conversão AVIF:", error);
    return null;
  }
}
