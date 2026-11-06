import React from 'react';
import './message.module.css';

export function MessageCard ({ message, type = 'info', position = 'top-right', onClose }){
  return (
    <div className={`message-card ${type} ${position}`}>
      <span>{message}</span>
    </div>
  );
};

