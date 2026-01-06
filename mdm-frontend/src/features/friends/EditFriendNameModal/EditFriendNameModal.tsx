import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { TextInput } from '@/components/TextInput';
import { FormErrorMessage } from '@/components/Typography';
import { setFriendDisplayName } from '@/lib/api/APIHandler';
import { useEffect, useState } from 'react';
import styles from './EditFriendNameModal.module.css';

const EditFriendNameModal = (props: {
    isOpen: boolean;
    onClose: () => void;
    callbackAfterUpdate: () => void;
    friendUserId: string;
    defaultDisplayName: string;
    currentDisplayName: string;
}) => {
    // 入力値
    const [displayName, setDisplayName] = useState('');
    const [displayNameErrMsg, setDisplayNameErrMsg] = useState('');

    // バリデーション
    const validateInput = () => {
        var hasError = false;

        if (displayName == '') {
            setDisplayNameErrMsg('１文字以上入力してください。');
            hasError = true;
        }

        return hasError;
    };

    const resetAllInput = () => {
        setDisplayName('');
        setDisplayNameErrMsg('');
    };

    const callUpdateFriendNameAPI = () => {
        if (!validateInput()) {
            // 更新系なのでuseSWRは使わない
            setFriendDisplayName(props.friendUserId, displayName).then(() => props.callbackAfterUpdate());
        }
    };

    useEffect(() => {
        // モーダル開いた時に値を格納する
        if (props.isOpen) setDisplayName(props.currentDisplayName);
    }, [props.isOpen]);

    return (
        <Modal
            isOpen={props.isOpen}
            onClose={() => {
                resetAllInput();
                props.onClose();
            }}
        >
            <>
                <div className={styles.itemTitle}>ユーザー表示名</div>

                <div className={styles.textInputWrapper}>
                    <TextInput
                        type="text"
                        placeholder={props.defaultDisplayName}
                        value={displayName}
                        onInput={(e) => setDisplayName(e.currentTarget.value)}
                    />
                </div>

                <FormErrorMessage>{displayNameErrMsg}</FormErrorMessage>

                <div className={styles.buttonWrapper}>
                    <Button onClick={callUpdateFriendNameAPI}>更新する</Button>
                </div>
            </>
        </Modal>
    );
};

export default EditFriendNameModal;
