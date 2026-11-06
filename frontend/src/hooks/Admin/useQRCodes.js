import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../services/api';

export function useQRCodes() {
  const [qrCodes, setQrCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQRCodes = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/qrcode');
      setQrCodes(response.data.sort((a, b) => a.id - b.id));
    } catch (err) {
      setError("Não foi possível carregar os QR Codes.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQRCodes();
  }, [fetchQRCodes]);

  const createQRCode = async (qrCodeData) => {
    try {
      await api.post('/qrcode', qrCodeData);
      toast.success('QR Code criado com sucesso!');
      fetchQRCodes();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erro ao criar QR Code.');
      throw err;
    }
  };

  const updateQRCode = async (qrCodeId, qrCodeData) => {
    try {
      await api.put(`/qrcode/${qrCodeId}`, qrCodeData);
      toast.success('QR Code atualizado com sucesso!');
      fetchQRCodes();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erro ao atualizar QR Code.');
      throw err;
    }
  };

  const toggleQRCodeStatus = async (qrCode) => {
    const newStatus = !qrCode.status;
    const actionText = newStatus ? 'ativado' : 'desativado';

    try {
      await api.put(`/qrcode/${qrCode.id}`, { ...qrCode, status: newStatus });
      toast.success(`QR Code ${actionText} com sucesso!`);
      fetchQRCodes();
    } catch (err) {
      toast.error(`Erro ao ${newStatus ? 'ativar' : 'desativar'} o QR Code.`);
      throw err;
    }
  };

  return {
    qrCodes,
    isLoading,
    error,
    createQRCode,
    updateQRCode,
    toggleQRCodeStatus,
  };
}