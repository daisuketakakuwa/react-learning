import Loading from '@/components/Loading/Loading';
import { Typography } from '@/components/Typography';
import { AuthContext } from '@/context/SessionProvider';
import { fetchMessages, getOrCreateChatroom } from '@/lib/api/APIHandler';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import ChatMessageSendForm from './_components/ChatMessageSendForm';
import styles from './index.module.css';
import layoutStyles from './layout.module.css';

const FriendTalkPage: NextPage = () => {
    const router = useRouter();
    const { authUserInfo } = useContext(AuthContext);
    const { friendUserid } = router.query;
    const [displayUsername, setDisplayUsername] = useState('');

    // 1. チャットルームID を取得
    const { data: openingRoomId, isLoading: isLoading1 } = useSWR<string | null>(
        friendUserid && authUserInfo ? ['/api/users/chatrooms', [friendUserid]] : null,
        getOrCreateChatroom
    );
    // 2. 1のチャットルームIDで チャット情報 を取得
    const {
        data: fetchMessagesInfo,
        mutate: mutateFetchMessagesInfo,
        isLoading: isLoading2,
    } = useSWR<FetchMessagesResponse | undefined>(openingRoomId ? ['/api/users/chatrooms', openingRoomId] : null, fetchMessages, {
        refreshInterval: 30000, // 30秒に１回ポーリングする
    });
    // 3. 2で取得したチャット情報 を加工する
    const processedChatInfo = useMemo(() => {
        if (authUserInfo && fetchMessagesInfo) {
            // 相手のユーザー名取得
            if (authUserInfo?.userId == fetchMessagesInfo.user1Id) {
                setDisplayUsername(fetchMessagesInfo.user2Name);
            } else {
                setDisplayUsername(fetchMessagesInfo.user1Name);
            }

            // メッセージ一覧
            const messages = fetchMessagesInfo.messages;
            if (messages.length > 0) {
                // 日付ごとにグルーピング
                const dateGrouped = messages.reduce((map, chat) => {
                    if (!map.has(chat.sendDate)) {
                        map.set(chat.sendDate, []);
                    }
                    map.get(chat.sendDate)!.push(chat);
                    return map;
                }, new Map<string, ChatMessage[]>());

                return dateGrouped;
            }
        }
    }, [fetchMessagesInfo]);
    // 4. 最新メッセージを画面反映されたら画面下部へスクロールする。
    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    }, [processedChatInfo]);

    return (
        <>
            <div className={layoutStyles.fixedHeaderArea}>
                <img src="/svg/arrow-back.svg" width="50px" onClick={() => router.push('/user/friends')} />
                <Typography tag="p" size="lg" fontWeight="bold">
                    {displayUsername}
                </Typography>
            </div>
            <Loading isOpen={isLoading1 || isLoading2} />
            {processedChatInfo && processedChatInfo.size > 0 && (
                <div className={styles.pageWrapper}>
                    {[...processedChatInfo.entries()].map(([date, messages]) => (
                        <div key={date}>
                            <div className={styles.dateTitleWrapper}>
                                <div className={styles.dateTip}>
                                    <Typography tag="p" size="md" color="var(--color-text-white)" fontWeight="bold">
                                        {date}
                                    </Typography>
                                </div>
                            </div>
                            {messages.map((c: ChatMessage, idx) => {
                                // 自分の場合【送信日時 - メッセージ】
                                // 相手の場合【メッセージ - 送信日時】
                                if (c.isMe) {
                                    return (
                                        <div className={styles.myMessageLineWrapper} key={`${date}-${idx}`}>
                                            <div>
                                                {!c.unreadByBuddy && (
                                                    <div className={styles.unreadText}>
                                                        <Typography tag="p" size="sm">
                                                            既読
                                                        </Typography>
                                                    </div>
                                                )}
                                                <Typography tag="p" size="sm">
                                                    {c.sendTime}
                                                </Typography>
                                            </div>
                                            <div className={`${styles.message} ${styles.myMessage}`}>{c.message}</div>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className={styles.buddyMessageLineWrapper} key={`${date}-${idx}`}>
                                            <div className={`${styles.message} ${styles.buddyMessage}`}>{c.message}</div>
                                            <Typography tag="p" size="sm">
                                                {c.sendTime}
                                            </Typography>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    ))}
                </div>
            )}
            {openingRoomId && (
                <div className={layoutStyles.fixedFooterArea}>
                    <ChatMessageSendForm openingRoomId={openingRoomId} mutateFetchMessagesInfo={mutateFetchMessagesInfo} />
                </div>
            )}
        </>
    );
};

export default FriendTalkPage;
