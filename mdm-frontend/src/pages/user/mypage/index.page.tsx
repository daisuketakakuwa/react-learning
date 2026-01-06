import { Button } from '@/components/Button';
import Loading from '@/components/Loading/Loading';
import { Textarea } from '@/components/Textarea';
import { TextInput } from '@/components/TextInput';
import { FormErrorMessage, Typography } from '@/components/Typography';
import { AuthContext } from '@/context/SessionProvider';
import { fetchUserProfieInfo, updateUserProfieInfo, userLogout } from '@/lib/api/APIHandler';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import styles from './index.module.css';

const MyPage = () => {
    const { authUserInfo, setAuthUserInfo } = useContext(AuthContext);
    const router = useRouter();

    const [isEditorMode, setIsEditorMode] = useState(false);

    const userType = authUserInfo?.userType;

    // 表示用アイテム
    const [emailForDisp, setEmailForDisp] = useState('');
    const [displayNameForDisp, setDisplayNameForDisp] = useState('');
    const [orgNameForDisp, setOrgNameForDisp] = useState('');
    const [freeCommentForDisp, setFreeCommentForDisp] = useState('');
    // 編集用アイテム
    const [emailForEdit, setEmailForEdit] = useState('');
    const [displayNameForEdit, setDisplayNameForEdit] = useState('');
    const [freeCommentForEdit, setFreeCommentForEdit] = useState('');
    // エラーメッセージ
    const [emailErrMsg, setEmailErrMsg] = useState('');
    const [displayNameErrMsg, setDisplayNameErrMsg] = useState('');

    // バリデーション
    const validateInput = () => {
        var hasError = false;

        // メアド
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailForEdit)) {
            setEmailErrMsg('xxxxx@xxxxx形式で入力してください。');
            hasError = true;
        } else {
            setEmailErrMsg('');
        }
        // プロフィール名
        if (displayNameForEdit == '') {
            setDisplayNameErrMsg('プロフィール名を入力してください。');
            hasError = true;
        } else if (displayNameForEdit.length > 30) {
            setDisplayNameErrMsg('３０文字以内で入力してください。');
            hasError = true;
        } else {
            setDisplayNameErrMsg('');
        }

        return hasError;
    };

    const { data: userProfileInfo, mutate, isLoading } = useSWR<FetchUserProfieInfoResponse>(authUserInfo ? '/api/users' : null, fetchUserProfieInfo);

    const callUpdateUserProfileAPI = () => {
        if (!validateInput()) {
            // 更新系なのでuseSWRは使わない
            updateUserProfieInfo(emailForEdit, displayNameForEdit, freeCommentForEdit).then(() => {
                // 再検証後、編集モードを解除
                mutate().then(() => setIsEditorMode(false));
            });
        }
    };

    useEffect(() => {
        // プリセット値の設定
        if (userProfileInfo) {
            setEmailForDisp(userProfileInfo.email);
            setEmailForEdit(userProfileInfo.email);
            setEmailErrMsg('');
            setDisplayNameForDisp(userProfileInfo.displayName);
            setDisplayNameForEdit(userProfileInfo.displayName);
            setDisplayNameErrMsg('');
            setOrgNameForDisp(userProfileInfo.orgName);
            setFreeCommentForDisp(userProfileInfo.freeComment);
            setFreeCommentForEdit(userProfileInfo.freeComment);
        }
    }, [userProfileInfo, isEditorMode]);

    return (
        <>
            <Loading isOpen={isLoading} />
            <div className={styles.titleWrapper}>
                <Typography tag="h1" size="lg" fontWeight="bold">
                    マイページ
                </Typography>
            </div>

            <div className={styles.logoutButtonWrapper}>
                <Button
                    variant="tertiary"
                    onClick={() =>
                        userLogout().then(() => {
                            setAuthUserInfo(null);
                            router.push('/user/login');
                        })
                    }
                >
                    ログアウト
                </Button>
            </div>

            <div className={styles.divider} />

            <div className={styles.formWrapper}>
                <div className={styles.formHeader}>
                    <Typography tag="h2" size="lg" fontWeight="medium">
                        プロフィール情報
                    </Typography>
                    <Button variant="secondary" onClick={() => setIsEditorMode(!isEditorMode)}>
                        {isEditorMode ? '編集をやめる' : '編集する'}
                    </Button>
                </div>

                <div className={styles.fieldBlock}>
                    <Typography tag="p" size="md" color="var(--color-text-gray)" fontWeight="bold">
                        メールアドレス
                    </Typography>
                    {isEditorMode ? (
                        <div className={styles.textInputWrapper}>
                            <TextInput
                                type="text"
                                placeholder="test@gmail.com"
                                value={emailForEdit}
                                onInput={(e) => setEmailForEdit(e.currentTarget.value)}
                            />
                            <div
                                // エラーメッセージ有の場合にclassnameを動的に切り替える
                                className={`${styles.errorMessageWrapper} ${!!emailErrMsg ? styles.showErrorMessage : styles.hideErrorMessage}`}
                            >
                                <FormErrorMessage>{emailErrMsg}</FormErrorMessage>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.fieldDispValueWrapper}>
                            <Typography tag="p" size="md" fontWeight="bold">
                                {emailForDisp}
                            </Typography>
                        </div>
                    )}
                </div>

                <div className={styles.fieldBlock}>
                    <Typography tag="p" size="md" color="var(--color-text-gray)" fontWeight="bold">
                        プロフィール名
                    </Typography>
                    {isEditorMode ? (
                        <div className={styles.textInputWrapper}>
                            <TextInput
                                type="text"
                                placeholder="MDM太郎"
                                value={displayNameForEdit}
                                onInput={(e) => setDisplayNameForEdit(e.currentTarget.value)}
                            />
                            <div
                                // エラーメッセージ有の場合にclassnameを動的に切り替える
                                className={`${styles.errorMessageWrapper} ${!!displayNameErrMsg ? styles.showErrorMessage : styles.hideErrorMessage}`}
                            >
                                <FormErrorMessage>{displayNameErrMsg}</FormErrorMessage>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.fieldDispValueWrapper}>
                            <Typography tag="p" size="md" fontWeight="bold">
                                {displayNameForDisp}
                            </Typography>
                        </div>
                    )}
                </div>

                <div className={styles.fieldBlock}>
                    <Typography tag="p" size="md" color="var(--color-text-gray)" fontWeight="bold">
                        {userType == 'DOCTOR' ? '病院名' : '会社名'}
                    </Typography>
                    <div className={styles.fieldDispValueWrapper}>
                        <Typography tag="p" size="md" fontWeight="bold">
                            {orgNameForDisp}
                        </Typography>
                    </div>
                </div>

                <div className={styles.fieldBlock}>
                    <Typography tag="p" size="md" color="var(--color-text-gray)" fontWeight="bold">
                        自由入力欄
                    </Typography>
                    {isEditorMode ? (
                        <Textarea
                            id="MyPageFreeCommentTextarea"
                            placeholder="稼働時間 08:00 - 17:00"
                            value={freeCommentForEdit}
                            onInput={(e) => setFreeCommentForEdit(e.currentTarget.value)}
                            style={{ minHeight: '90px' }}
                        />
                    ) : (
                        <div className={styles.fieldDispValueWrapper}>
                            <Typography tag="p" size="md" fontWeight="bold">
                                {freeCommentForDisp}
                            </Typography>
                        </div>
                    )}
                </div>

                {isEditorMode && (
                    <div className={styles.updateButtonWrapper}>
                        <Button onClick={callUpdateUserProfileAPI}>更新する</Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default MyPage;
