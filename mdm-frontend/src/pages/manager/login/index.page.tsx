import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';
import { Typography } from '@/components/Typography';
import { AuthContext } from '@/context/SessionProvider';
import { managerLogin } from '@/lib/api/APIHandler';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import styles from './index.module.css';

const ManagerLoginPage: NextPage = () => {
    const router = useRouter();
    const { setIsManagerAuthenticated } = useContext(AuthContext);

    // 入力値
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    // エラーメッセージ
    const [idErrMessage, setIdErrMessage] = useState('');
    const [passwordErrMessage, setPasswordErrMessage] = useState('');

    const validateInput = () => {
        var hasError = false;

        // ID
        if (id == '') {
            setIdErrMessage('IDを入力してください。');
            hasError = true;
        } else {
            setIdErrMessage('');
        }
        // パスワード
        if (password == '') {
            setPasswordErrMessage('パスワードを入力してください。');
            hasError = true;
        } else {
            setPasswordErrMessage('');
        }

        return hasError;
    };

    const callManagerLoginAPI = () => {
        if (!validateInput()) {
            managerLogin(id, password).then((result) => {
                setIsManagerAuthenticated(result);
                if (result) router.push('/manager/top');
            });
        }
    };

    // Enterキーで「ログイン」ボタンを押下する
    useEffect(() => {
        const handleEnterKey = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                const loginBtn = document.getElementById('managerLoginBtn');
                if (loginBtn) loginBtn.click();
            }
        };
        document.addEventListener('keydown', handleEnterKey);
        // クリーンアップ（重要）
        return () => {
            document.removeEventListener('keydown', handleEnterKey);
        };
    }, []);

    return (
        <>
            <div className={styles.titleWrapper}>
                <Typography tag="h1" size="lg">
                    LOGIN（管理者）
                </Typography>
            </div>

            <div className={styles.formWrapper}>
                <div className={styles.inputBlock}>
                    <Typography tag="p" size="md">
                        ID
                    </Typography>
                    <div className={styles.textInputWrapper}>
                        <TextInput type="text" value={id} onInput={(e) => setId(e.currentTarget.value)} />
                    </div>
                    <Typography tag="p" size="sm" className={styles.errorText}>
                        {idErrMessage}
                    </Typography>
                </div>

                <div className={styles.inputBlock}>
                    <Typography tag="p" size="md">
                        パスワード
                    </Typography>
                    <div className={styles.textInputWrapper}>
                        <TextInput type="password" value={password} onInput={(e) => setPassword(e.currentTarget.value)} />
                    </div>
                    <Typography tag="p" size="sm" className={styles.errorText}>
                        {passwordErrMessage}
                    </Typography>
                </div>
            </div>

            <div className={styles.loginBtnWrapper}>
                <Button id="managerLoginBtn" onClick={callManagerLoginAPI}>
                    ログイン
                </Button>
            </div>
        </>
    );
};

export default ManagerLoginPage;
