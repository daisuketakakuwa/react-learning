import { showAPISnackbar } from '@/components/APIContext/APIEventEmitter';
import { QrGenerator } from '@/components/QrGenerator';
import { QrScanner } from '@/components/QrScanner';
import { Typography } from '@/components/Typography';
import { AuthContext } from '@/context/SessionProvider';
import { beFriendsByEmail } from '@/lib/api/APIHandler';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import styles from './index.module.css';

const ShowFriendQRCodePage: NextPage = () => {
    const router = useRouter();

    const { authUserInfo } = useContext(AuthContext);

    const handleScanSuccess = (text: string) => {
        beFriendsByEmail(text).then(() => router.push('/user/friends'));
    };

    const handleScanFailure = (error: string) => {
        showAPISnackbar('error', '読み取り処理に失敗しました。');
    };

    return (
        <>
            <div className={styles.showQrTitleWrapper}>
                <Typography tag="h1" size="lg" fontWeight="bold">
                    連絡先追加用QRコード表示
                </Typography>
            </div>

            {authUserInfo && (
                <div className={styles.qrDisplaySection}>
                    <QrGenerator value={authUserInfo.email} />
                </div>
            )}

            <div className={styles.scanQrTitleWrapper}>
                <Typography tag="h1" size="lg" fontWeight="bold">
                    連絡先追加用QRコード読込
                </Typography>
            </div>

            <div className={styles.qrScannerWrapper}>
                <QrScanner onScanSuccess={handleScanSuccess} onScanFailure={handleScanFailure} />
            </div>
        </>
    );
};

export default ShowFriendQRCodePage;
