import { SWRConfig } from 'swr';
import { Snackbar, SnackbarProps } from '@/components/Snackbar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { addShowAPISnackbarEventListener, removeShowAPISnackbarEventListener } from './APIEventEmitter';

type APIContextProps = {
    children: React.ReactNode;
};

/**
 * 全コンポーネントまたぐContextです。
 * ・SWRのContext(キャッシュ)を管理します。
 * ・APIに関するメッセージ(Event)を各々でdispatchしてもらい、このContextでキャッチ->Snackbarに表示します。
 */
export const APIContext = (props: APIContextProps) => {
    const timerIdRef = useRef<number | null>(null);
    const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>({
        open: false,
        type: 'success',
        message: '',
    });

    // レンダリングの度に再生成されないようにする -> eventListenerに登録する関数だから。
    const openSnackBar = useCallback((type: 'success' | 'error', message: string) => {
        // 登録済のTimerIdがあればクリアする
        if (timerIdRef.current !== null) clearTimeout(timerIdRef.current);
        // Snacbarを開く
        setSnackbarProps({
            open: true,
            type: type,
            message: message,
        });
        // 3秒後に自動で閉じるTimer処理を設定
        timerIdRef.current = window.setTimeout(() => {
            setSnackbarProps((prev) => ({ ...prev, open: false }));
            // TimerIdをクリアにする
            timerIdRef.current = null;
        }, 3000);
    }, []);

    // 流れ
    //  1. Componentから、dispatchする（type と message）
    //  2. listenerで event を受け取って、Snackbarを開く処理を実行する。
    // 　　　ここで、dispatchした内容（type と message）を受け取る
    useEffect(() => {
        // a. Listenするカスタムイベントを定義する
        const eventListener = (e: CustomEvent<{ type: 'success' | 'error'; message: string }>) => openSnackBar(e.detail.type, e.detail.message);
        // b. イベント登録（マウント時）
        addShowAPISnackbarEventListener(eventListener);
        // c. イベント削除（アンマウント時）
        return () => {
            removeShowAPISnackbarEventListener(eventListener);
        };
    }, [openSnackBar]);

    return (
        <SWRConfig
            value={{
                revalidateOnFocus: false,
                revalidateOnReconnect: false,
                shouldRetryOnError: false,
            }}
        >
            {props.children}
            <Snackbar {...snackbarProps} />
        </SWRConfig>
    );
};
