import React, { useState } from 'react';
import { useQRCodes } from '../../../hooks/Admin/useQRCodes';
import { QRCodeStats } from '../../../components/Admin/QRCode/QRCodeStats/QRCodeStats';
import { QRCodeList } from '../../../components/Admin/QRCode/QRCodeList/QRCodeList';
import { QRCodeModal } from '../../../components/Admin/QRCode/QRCodeModal/QRCodeModal';
import styles from './adminQRCode.module.css';

const INITIAL_QRCODE_STATE = { name: '', link: '' };

export function AdminQRCode() {
  const { qrCodes, isLoading, error, createQRCode, updateQRCode, toggleQRCodeStatus } = useQRCodes();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQRCode, setEditingQRCode] = useState(null);

  const handleOpenCreateModal = () => {
    setEditingQRCode(INITIAL_QRCODE_STATE);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (qrCode) => {
    setEditingQRCode(qrCode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQRCode(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = !!editingQRCode?.id;
    try {
      if (isEdit) {
        await updateQRCode(editingQRCode.id, editingQRCode);
      } else {
        await createQRCode(editingQRCode);
      }
      handleCloseModal();
    } catch (err) {
      // O hook já exibe o toast de erro
    }
  };

  if (isLoading) return <div className={styles.container}><p>Carregando QR Codes...</p></div>;
  if (error) return <div className={styles.container}><p>{error}</p></div>;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Gerenciamento de QR Codes</h1>
          <button onClick={handleOpenCreateModal} className={styles.addButton}>
            + Adicionar QR Code
          </button>
        </div>

        <QRCodeStats qrCodes={qrCodes} />
        
        {qrCodes.length > 0 ? (
          <QRCodeList 
            qrCodes={qrCodes}
            onEdit={handleOpenEditModal}
            onToggleStatus={toggleQRCodeStatus}
          />
        ) : (
          <div className={styles.noQRCodes}>
            <p>Nenhum QR Code encontrado.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <QRCodeModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          title={editingQRCode?.id ? 'Editar QR Code' : 'Adicionar Novo QR Code'}
          qrCode={editingQRCode}
          onChange={setEditingQRCode}
          isEdit={!!editingQRCode?.id}
        />
      )}
    </>
  );
}