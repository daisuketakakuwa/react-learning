import { AuthContext } from '@/context/SessionProvider';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import styles from './NavigationMenu.module.css';

export const NavigationMenu = () => {
    const router = useRouter();
    const { authUserInfo } = useContext(AuthContext);

    return (
        <div className={styles.root}>
            {authUserInfo && (
                <>
                    <div onClick={() => router.push('/user/friends')}>
                        <img className={styles.linkImg} src="/svg/home.svg" width="55px" />
                    </div>
                    <div onClick={() => router.push('/user/lounge')} style={{ marginLeft: '5px' }}>
                        <img className={styles.linkImg} src="/img/lounge.png" width="50px" />
                    </div>
                    <div onClick={() => router.push('/user/add-friend')}>
                        <img className={styles.linkImg} src="/img/add-friend.png" width="55px" />
                    </div>
                    <div onClick={() => router.push('/user/mypage')}>
                        <img className={styles.linkImg} src="/img/user-icon.png" width="55px" />
                    </div>
                </>
            )}
        </div>
    );
};
