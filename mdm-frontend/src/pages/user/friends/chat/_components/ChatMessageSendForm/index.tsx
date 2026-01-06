import { Textarea } from '@/components/Textarea';
import { sendMessage } from '@/lib/api/APIHandler';
import { useEffect, useRef, useState } from 'react';
import { KeyedMutator } from 'swr';
import styles from './index.module.css';
import { trimNewlines } from '@/utils/stringUtils';

type ChatMessageSendFormProps = {
    openingRoomId: string;
    mutateFetchMessagesInfo: KeyedMutator<FetchMessagesResponse | undefined>;
};

const ChatMessageSendForm = (props: ChatMessageSendFormProps) => {
    const { openingRoomId, mutateFetchMessagesInfo } = props;

    const [chatMessage, setChatMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const footerDivRef = useRef<HTMLDivElement>(null);

    // 入力のたびに高さを調整
    useEffect(() => {
        const textarea = textareaRef.current;
        const footerDiv = footerDivRef.current;
        if (!textarea || !footerDiv) return;
        textarea.style.height = 'auto'; // ← これで高さをリセット
        footerDiv.style.height = 'auto'; // ← これで高さをリセット
        textarea.style.height = '30px'; // ← リセットした後に初期値(30px)を設定する
        footerDiv.style.height = '40px'; // ← リセットした後に初期値(40px)を設定する
        // 2行目に入っていれば、scrollHeight を高さにする。
        if (textarea.scrollHeight > 30) {
            textarea.style.height = `${textarea.scrollHeight}px`;
            footerDiv.style.height = `${textarea.scrollHeight + 10}px`;
        }
    }, [chatMessage]);

    const sendMessageAction = () => {
        if (!chatMessage) return;
        if (!trimNewlines(chatMessage)) return;
        // 1. メッセージ送信（登録系だからuseSWR使わない）
        sendMessage(openingRoomId, chatMessage).then(() => {
            // 2. 入力メッセージクリア
            setChatMessage('');
            // 3. 最新メッセージ一覧取得
            mutateFetchMessagesInfo();
        });
    };

    return (
        <div className={styles.formWrapper} ref={footerDivRef}>
            <Textarea
                id="ChatMessageTextarea"
                className={styles.messageTextarea}
                value={chatMessage}
                onInput={(e) => setChatMessage(e.currentTarget.value)}
                ref={textareaRef}
            />
            <div onClick={sendMessageAction}>
                <img src={`/svg/send-button-${chatMessage ? 'blue' : 'gray'}.svg`} width="25px" />
            </div>
        </div>
    );
};

export default ChatMessageSendForm;
