import React from 'react';

import css from './Modal.module.css';

interface ModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className={css.modalOverlay}>
            <div className={css.modalContent}>
                <p>{message}</p>
                <div className={css.modalActions}>
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export { Modal };
