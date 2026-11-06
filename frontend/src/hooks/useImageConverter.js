import { useState, useEffect } from 'react';

export function useBase64Image(base64String) {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!base64String) {
      setImageError(false);
      setImageUrl(null);
      return;
    }

    const testFormats = [
      { type: 'image/jpeg', name: 'JPEG' },
      { type: 'image/png', name: 'PNG' },
      { type: 'image/webp', name: 'WebP' },
      { type: 'image/avif', name: 'AVIF' }
    ];

    const tryFormat = (index) => {
      if (index >= testFormats.length) {
        setImageError(true);
        return;
      }

      const format = testFormats[index];
      const dataUrl = `data:${format.type};base64,${base64String}`;
      
      const img = new Image();
      img.onload = () => {
        setImageUrl(dataUrl);
        setImageError(false);
      };
      img.onerror = () => tryFormat(index + 1);
      img.src = dataUrl;
    };

    tryFormat(0);
  }, [base64String]);

  return { imageUrl, imageError };
}