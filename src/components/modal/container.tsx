import type { PropsWithChildren } from 'react';
import { motion } from 'motion/react';

interface ModalContainerProps {
  onClose: () => void;
}

const ModalContainer = ({ onClose, children }: PropsWithChildren<ModalContainerProps>) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex h-dvh bg-black/70"
      onClick={onClose}
      aria-modal="true"
      onKeyDown={e => {
        if (e.key === 'Escape') {
          onClose();
        }
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 z-[51] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 md:min-w-xl"
        onClick={e => e.stopPropagation()}
        role="presentation"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default ModalContainer;
