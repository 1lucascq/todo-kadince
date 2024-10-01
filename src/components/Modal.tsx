import React from 'react';
import { ModalProps } from '../lib/types';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
			id="modal-overlay"
			data-testid="modal-overlay"
			className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleOverlayClick}
        >
            <div className="bg-white p-4 rounded shadow-lg relative">
                {children}
            </div>
        </div>
    );
};

export default Modal;
