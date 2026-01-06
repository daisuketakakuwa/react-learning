// UAスタイル(ブラウザのデフォルトCSS)をリセットする
import { APIContext } from '@/components/APIContext/APIContext';
/**
 *  「リセット」といいつつ、form要素↓に対してモバイル(iOS)のタップ可能最小サイズ(44px?)が自動適用される。
 *  textarea要素などに min-height が44pxが自動で付与される -> 親要素のheightも勝手に制御される
 *
 *   button,
 *   input,
 *   select,
 *   textarea {
 *     min-block-size: 44px;
 *   }
 */
import SessionProvider, { AuthContext } from '@/context/SessionProvider';
import { NavigationMenu } from '@/features/layout/NavigationMenu';
import { verifyManager, verifyUser } from '@/lib/api/APIHandler';
import '@/styles/globals.css';
import '@/styles/variables.css';
import {
    MANAGER_LOGIN_REQUIRED_PAGES,
    MANAGER_NO_LOGIN_PAGES,
    SHOW_NAV_MENU_PAGES,
    USER_LOGIN_REQUIRED_PAGES,
    USER_NO_LOGIN_PAGES,
} from '@/utils/constants';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import 'the-new-css-reset/css/reset.css';
import styles from './_app.module.css';

type AuthGuardProps = {
    Component: AppProps['Component'];
    pageProps: AppProps['pageProps'];
};

const AuthGuard = ({ Component, pageProps }: AuthGuardProps) => {
    const router = useRouter();
    const { setAuthUserInfo, setIsManagerAuthenticated } = useContext(AuthContext);

    const [canRender, setCanRender] = useState(false);
    const [unknownPage, setUnknownPage] = useState(false);

    // User認証後のアクション
    const userActionAfterVerify = (userInfo: UserInfo | null) => {
        setAuthUserInfo(userInfo);
        if (router.pathname == '/') {
            if (userInfo) {
                return router.replace('/user/friends');
            }
            // 未ログインならUserログイン画面へ
            return router.replace('/user/login');
        }

        const isLoginRequiredPage = USER_LOGIN_REQUIRED_PAGES.includes(router.pathname);
        const isNoLoginPages = USER_NO_LOGIN_PAGES.includes(router.pathname);

        // 未認証で認証必要画面へアクセス ⇒ ログイン画面へリダイレクト
        if (isLoginRequiredPage && !userInfo) {
            return router.replace('/user/login');
        }

        // 認証済ならログイン画面はいかせずにtop画面へリダイレクト
        if (isNoLoginPages && userInfo) {
            return router.replace('/user/friends');
        }
    };
    // Manager認証後のアクション
    const managerActionAfterVerify = (isAuthenticated: boolean) => {
        setIsManagerAuthenticated(isAuthenticated);
        // TOP画面アクセス時
        if (router.pathname == '/') {
            if (isAuthenticated) {
                return router.replace('/manager/top');
            }
            // 未ログインならUserログイン画面へ
            return router.replace('/manager/login');
        }

        // Manager画面へのアクセスの場合
        if (router.pathname.startsWith('/manager')) {
            const isLoginRequiredPage = MANAGER_LOGIN_REQUIRED_PAGES.includes(router.pathname);
            const isNoLoginPages = MANAGER_NO_LOGIN_PAGES.includes(router.pathname);

            // 未認証で認証必要画面へアクセス ⇒ ログイン画面へリダイレクト
            if (isLoginRequiredPage && !isAuthenticated) {
                return router.replace('/manager/login');
            }

            // 認証済ならログイン画面はいかせずにtop画面へリダイレクト
            if (isNoLoginPages && isAuthenticated) {
                return router.replace('/manager/top');
            }
        }
    };

    // Step1: 画面開く・画面遷移時に、verifyAPIを呼ぶ。
    useEffect(() => {
        setCanRender(false); // verifyの結果を受けてから各画面をレンダリングする。
        switch (true) {
            case router.pathname === '/': // ルートへのアクセスはUser扱いとする。
            case router.pathname.startsWith('/user'):
                verifyUser()
                    .then(userActionAfterVerify)
                    .then(() => setCanRender(true));
                break;
            case router.pathname.startsWith('/manager'):
                verifyManager()
                    .then(managerActionAfterVerify)
                    .then(() => setCanRender(true));
                break;
            default:
                setUnknownPage(true);
                break;
        }
    }, [router.pathname]);

    if (unknownPage) return <div>存在しないページです。</div>;

    return (
        <>
            <Head>
                <title>MDM</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* ナビゲーションメニュー */}
            {SHOW_NAV_MENU_PAGES.includes(router.pathname) && (
                <div className={styles.fixedFooter}>
                    <NavigationMenu />
                </div>
            )}

            {/* URLに応じてpageコンポーネントを表示 */}
            {canRender && <Component {...pageProps} />}
        </>
    );
};

const AppWrapper = ({ Component, pageProps }: AppProps) => {
    return (
        <SessionProvider>
            <APIContext>
                <AuthGuard Component={Component} pageProps={pageProps} />
            </APIContext>
        </SessionProvider>
    );
};

export default AppWrapper;
