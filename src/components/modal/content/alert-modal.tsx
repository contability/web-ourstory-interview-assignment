import type { ReactNode } from 'react';
import type { ModalProps } from '..';
import Modal from '..';

interface AlertModalProps extends ModalProps {
  title?: string;
  message?: ReactNode;
  onConfirm: () => void;
}

const AlertModal = ({ title, message, isOpen, onConfirm, onClose }: AlertModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex w-full flex-col items-center rounded-lg bg-white p-6">
        {title && <h2 className="mb-8 text-xl font-bold text-forest md:text-2xl">{title}</h2>}
        {message && <div className="mb-8 text-center text-lg text-khaki md:text-xl">{message}</div>}
        <button
          className="w-full rounded-full bg-forest px-6 py-3 text-white transition-colors hover:bg-olive"
          onClick={onConfirm}
        >
          확인
        </button>
      </div>
    </Modal>
  );
};

export default AlertModal;
