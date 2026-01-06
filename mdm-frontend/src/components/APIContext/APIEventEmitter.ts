// 同一のEmiiterを使う必要があるので、本モジュールでEmitterに関する処理を集約する。
const emitter = new EventTarget();

type ShowAPISnackbarEventProps = { type: 'success' | 'error'; message: string };

type CustomEventListener = (e: CustomEvent<ShowAPISnackbarEventProps>) => void;

// Event登録
export const addShowAPISnackbarEventListener = (listener: CustomEventListener) => {
    emitter.addEventListener('open-snackbar', listener as EventListener);
};
// Event削除
export const removeShowAPISnackbarEventListener = (listener: CustomEventListener) => {
    emitter.removeEventListener('open-snackbar', listener as EventListener);
};

// Component から Event を dispatchする
export const showAPISnackbar = (type: 'success' | 'error', message: string = 'サーバーエラーが発生しました。') => {
    emitter.dispatchEvent(new CustomEvent('open-snackbar', { detail: { type, message } }));
};
