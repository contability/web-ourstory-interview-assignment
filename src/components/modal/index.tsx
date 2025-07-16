import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import ModalContainer from './container';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose, children }: PropsWithChildren<ModalProps>) => {
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const element = document.querySelector('#modal-root');
      setPortalElement(element);
    }
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [isOpen]);

  if (portalElement) {
    return createPortal(
      <AnimatePresence>
        {isOpen && (
          <ModalContainer onClose={onClose}>
            <motion.div
              className="block px-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.3 }}
            >
              {children}
            </motion.div>
          </ModalContainer>
        )}
      </AnimatePresence>,
      portalElement,
      'modal-root',
    );
  }
};

export default Modal;
