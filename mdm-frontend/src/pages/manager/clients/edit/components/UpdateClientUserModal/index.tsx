import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { TextInput } from '@/components/TextInput';
import { Typography } from '@/components/Typography';
import { managerUpdateUserInfo } from '@/lib/api/APIHandler';
import { useEffect, useState } from 'react';
import styles from './index.module.css';

const UpdateClientUserModal = (props: {
    userId: string;
    username: string;
    email: string;
    isOpen: boolean;
    onClose: () => void;
    callbackAfterTriggerAPI: () => void;
}) => {
    // 入力値
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailErrMsg, setEmailErrMsg] = useState('');
    const [usernameErrMsg, setUsernameErrMsg] = useState('');
    const [passwordErrMsg, setPasswordErrMsg] = useState('');

    useEffect(() => {
        // モーダル開いた時に値を格納する
        if (props.isOpen) {
            setEmail(props.email);
            setUsername(props.username);
        }
    }, [props.isOpen]);

    // バリデーション
    const validateInput = () => {
        var hasError = false;

        // ユーザー名
        if (username == '') {
            setUsernameErrMsg('ユーザー名を入力してください。');
            hasError = true;
        }
        // Email（ユーザーID）
        if (email == '') {
            setEmailErrMsg('Emailを入力してください。');
            hasError = true;
        }

        return hasError;
    };

    const resetAllInput = () => {
        setEmail('');
        setEmailErrMsg('');
        setUsername('');
        setUsernameErrMsg('');
        setPassword('');
        setPasswordErrMsg('');
    };

    const callUpdateClientUserAPI = () => {
        if (!validateInput()) {
            managerUpdateUserInfo(props.userId, email, username, password).then(() => {
                resetAllInput();
                props.callbackAfterTriggerAPI();
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
                        ユーザー名
                    </Typography>
                    <div className={styles.textInputWrapper}>
                        <TextInput type="text" value={username} onInput={(e) => setUsername(e.currentTarget.value)} />
                    </div>
                    <Typography tag="p" color="var(--color-text-error)" size="sm">
                        {usernameErrMsg}
                    </Typography>
                </div>

                <div className={styles.formFieldWrapper}>
                    <Typography tag="p" color="var(--color-text-gray)" size="md" fontWeight="bold">
                        Email（ユーザーID）
                    </Typography>
                    <div className={styles.textInputWrapper}>
                        <TextInput type="text" value={email} onInput={(e) => setEmail(e.currentTarget.value)} />
                    </div>
                    <Typography tag="p" color="var(--color-text-error)" size="sm">
                        {emailErrMsg}
                    </Typography>
                </div>

                <div className={styles.formFieldWrapper}>
                    <div>
                        <Typography tag="p" color="var(--color-text-gray)" size="md" fontWeight="bold">
                            パスワード
                        </Typography>
                        <Typography tag="p" color="var(--color-text-gray)" size="sm" fontWeight="bold">
                            ※入力値がある場合現在のPWを上書きします
                        </Typography>
                    </div>
                    <div className={styles.textInputWrapper}>
                        <TextInput type="text" value={password} onInput={(e) => setPassword(e.currentTarget.value)} />
                    </div>
                    <Typography tag="p" color="var(--color-text-error)" size="sm">
                        {passwordErrMsg}
                    </Typography>
                </div>

                <div className={styles.btnWrapper}>
                    <Button onClick={callUpdateClientUserAPI}>更新する</Button>
                </div>
            </>
        </Modal>
    );
};

export default UpdateClientUserModal;
