'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
} 

export default function Modal({ children, onClose }: ModalProps) {
    const modalRoot = typeof document !== 'undefined' ?
        document.getElementById('modal-root') as HTMLElement
        : null;
    
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
      };
      

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleBackdropClick = (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    if (!modalRoot) return null;
    
    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div className={css.modal}>
                {children}
            </div>
        </div>,
modalRoot
    );
}


