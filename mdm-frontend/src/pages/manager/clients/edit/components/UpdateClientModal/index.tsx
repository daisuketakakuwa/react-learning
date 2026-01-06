import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { TextInput } from '@/components/TextInput';
import { FormErrorMessage, Typography } from '@/components/Typography';
import { updateClient } from '@/lib/api/APIHandler';
import { useEffect, useState } from 'react';
import styles from './index.module.css';

const UpdateClientModal = (props: {
    clientId: string;
    currentName: string;
    isOpen: boolean;
    onClose: () => void;
    callbackSuccess: () => void;
    allClients: Client[];
}) => {
    // 入力値
    const [clientName, setClientName] = useState('');
    const [clientNameErrMsg, setClientNameErrMsg] = useState('');

    useEffect(() => {
        // モーダル開いた時に値を格納する
        if (props.isOpen) setClientName(props.currentName);
    }, [props.isOpen]);

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

    const callUpdateClientAPI = () => {
        if (!validateInput()) {
            updateClient(props.clientId, clientName).then(() => {
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
                <div className={styles.formFieldWrapper}>
                    <Typography tag="p" color="var(--color-text-gray)" size="md" fontWeight="bold">
                        企業名
                    </Typography>
                    <div className={styles.textInputWrapper}>
                        <TextInput type="text" value={clientName} onInput={(e) => setClientName(e.currentTarget.value)} />
                    </div>
                    <FormErrorMessage>{clientNameErrMsg}</FormErrorMessage>
                </div>

                <div className={styles.btnWrapper}>
                    <Button onClick={callUpdateClientAPI}>更新する</Button>
                </div>
            </>
        </Modal>
    );
};

export default UpdateClientModal;
