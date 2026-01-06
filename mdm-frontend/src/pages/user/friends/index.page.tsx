import Loading from '@/components/Loading/Loading';
import { Typography } from '@/components/Typography';
import EditFriendNameModal from '@/features/friends/EditFriendNameModal/EditFriendNameModal';
import { UserProfileCard } from '@/features/friends/UserProfileCard';
import { fetchFriends } from '@/lib/api/APIHandler';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import useSWR from 'swr';
import styles from './index.module.css';
import { AuthContext } from '@/context/SessionProvider';

const FriendsPage: NextPage = () => {
    const router = useRouter();
    const { authUserInfo } = useContext(AuthContext);

    const [openEditNameModal, setOpenEditNameModal] = useState(false);
    const [editFriendNameData, setEditFriendNameData] = useState({} as EditFriendNameData);
    const onClickEditNameIcon = (f: Friend) => {
        // 対象データを設定してから編集モーダルを開く
        setEditFriendNameData({
            friendUserId: f.userId,
            defaultDisplayName: f.defaultDisplayName,
            currentDisplayName: f.displayName,
        });
        setOpenEditNameModal(true);
    };
    const onCloseEditNameModal = () => {
        setEditFriendNameData({} as EditFriendNameData);
        setOpenEditNameModal(false);
    };

    const { data: friends = [], mutate, isLoading } = useSWR<Friend[]>(authUserInfo ? '/api/users/friends' : null, fetchFriends);

    const callbackAfterUpdate = () => {
        onCloseEditNameModal();
        // revalidateするよう指示（再検証中はstaleを画面表示するのでisLoadingはfalseのまま）
        mutate();
    };

    return (
        <>
            <Loading isOpen={isLoading} />
            <div className={styles.titleWrapper}>
                <Typography tag="h1" size="lg" fontWeight="bold">
                    連絡先一覧
                </Typography>
            </div>
            {Array.isArray(friends) && (
                <>
                    {friends.length === 0 && (
                        <div className={styles.noFriendWrapper}>
                            <span className={styles.addFriendLink} onClick={() => router.push('/user/add-friend')}>
                                連絡先を追加
                            </span>
                            しましょう。
                        </div>
                    )}
                    <div className={styles.friendList}>
                        {friends.map((f: Friend) => (
                            <div className={styles.withCursor} onClick={() => router.push(`/user/friends/chat?friendUserid=${f.userId}`)}>
                                <UserProfileCard key={f.userId} friend={f} onClickEditNameIcon={() => onClickEditNameIcon(f)} />
                            </div>
                        ))}
                    </div>
                    <EditFriendNameModal
                        isOpen={openEditNameModal}
                        onClose={onCloseEditNameModal}
                        callbackAfterUpdate={callbackAfterUpdate}
                        friendUserId={editFriendNameData.friendUserId}
                        defaultDisplayName={editFriendNameData.defaultDisplayName}
                        currentDisplayName={editFriendNameData.currentDisplayName}
                    />
                </>
            )}
        </>
    );
};

export default FriendsPage;
