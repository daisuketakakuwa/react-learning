import { Button } from '@/components/Button';
import { MenuLinkCard } from '@/components/MenuLinkCard';
import { Typography } from '@/components/Typography';
import { AuthContext } from '@/context/SessionProvider';
import { managerLogout } from '@/lib/api/APIHandler';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import styles from './index.module.css';

const ManagerTopPage = () => {
    const { setIsManagerAuthenticated } = useContext(AuthContext);
    const router = useRouter();

    return (
        <>
            <div className={styles.titleWrapper}>
                <Typography tag="h1" size="lg" fontWeight="bold">
                    管理者TOP
                </Typography>
            </div>

            <div className={styles.linkMenuListWrapper}>
                <MenuLinkCard onClick={() => router.push('/manager/hospitals')}>病院を管理</MenuLinkCard>
                <MenuLinkCard onClick={() => router.push('/manager/clients')}>企業を管理</MenuLinkCard>
            </div>

            <div className={styles.logoutBtnWrapper}>
                <Button
                    onClick={() => {
                        managerLogout().then(() => {
                            setIsManagerAuthenticated(false);
                            router.push('/manager/login');
                        });
                    }}
                    variant="tertiary"
                >
                    ログアウト
                </Button>
            </div>
        </>
    );
};

export default ManagerTopPage;
