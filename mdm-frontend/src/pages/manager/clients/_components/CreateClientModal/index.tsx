import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { TextInput } from '@/components/TextInput';
import { FormErrorMessage, Typography } from '@/components/Typography';
import { createClient } from '@/lib/api/APIHandler';
import { useState } from 'react';
import styles from './index.module.css';

const CreateClientModal = (props: { isOpen: boolean; onClose: () => void; callbackSuccess: () => void; allClients: Client[] }) => {
    // 入力値
    const [clientName, setClientName] = useState('');
    const [clientNameErrMsg, setClientNameErrMsg] = useState('');

    // バリデーション
    const validateInput = () => {
        var hasError = false;

        if (clientName == '') {
            setClientNameErrMsg('企業名を入力してください。');
            hasError = true;
        } else {
            // 半角/全角スペースを除去した上でマッチしなければ新規登録可能
            const trimmedClientName = clientName.replaceAll(/[\s　]/g, '');
            const trimmedAllClientNames = props.allClients.map((h: Client) => h.name.replaceAll(/[\s　]/g, ''));
            if (trimmedAllClientNames.includes(trimmedClientName)) {
                setClientNameErrMsg('既に同名の企業が登録されています。');
                hasError = true;
            }
        }

        return hasError;
    };

    const resetAllInput = () => {
        setClientName('');
        setClientNameErrMsg('');
    };

    const callCreateClientAPI = () => {
        if (!validateInput()) {
            createClient(clientName).then(() => {
                resetAllInput();
                props.callbackSuccess();
            });
        }
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onClose={() => {
                resetAllInput();
                props.onClose();
            }}
        >
            <>
                <div className={styles.titleWrapper}>
                    <Typography tag="p" color="var(--color-text-gray)" fontWeight="bold">
                        登録する企業名
                    </Typography>
                </div>

                <div className={styles.formTextInputWrapper}>
                    <TextInput type="text" value={clientName} onInput={(e) => setClientName(e.currentTarget.value)} />
                    <FormErrorMessage>{clientNameErrMsg}</FormErrorMessage>
                </div>

                <div className={styles.btnWrapper}>
                    <Button onClick={callCreateClientAPI}>登録する</Button>
                </div>
            </>
        </Modal>
    );
};

export default CreateClientModal;
