import ReactModal from 'react-modal';
import { Button } from '@/components/Button';
import styles from './Modal.module.css';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement('#__next');

type ModalProps = {
    children: React.ReactElement;
    isOpen: boolean;
    onClose: () => void;
};

export const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
    return (
        <ReactModal className={styles.modalContent} isOpen={isOpen} onRequestClose={onClose} contentLabel="Example Modal">
            {children}
            <div className={styles.closeBtnWrapper}>
                <Button onClick={onClose} variant="tertiary">
                    閉じる
                </Button>
            </div>
        </ReactModal>
    );
};
