import Loading from '@/components/Loading/Loading';
import { Typography } from '@/components/Typography';
import EditFriendNameModal from '@/features/friends/EditFriendNameModal/EditFriendNameModal';
import { UserProfileCard } from '@/features/friends/UserProfileCard';
import { fetchSalesVisitingHospitals } from '@/lib/api/APIHandler';
import { useContext, useState } from 'react';
import useSWR from 'swr';
import styles from './index.module.css';
import { AuthContext } from '@/context/SessionProvider';

const DoctorLoungePage = () => {
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

    const callbackAfterUpdate = () => {
        onCloseEditNameModal();
        // revalidateするよう指示（再検証中はstaleを画面表示するのでisLoadingはfalseのまま）
        mutate();
    };

    const {
        data: visitingSales = [],
        mutate,
        isLoading,
    } = useSWR<Friend[]>(authUserInfo ? '/api/users/sales-visiting-hospitals/sales' : null, fetchSalesVisitingHospitals);

    return (
        <>
            <Loading isOpen={isLoading} />
            <div className={styles.titleWrapper}>
                <Typography tag="h1" size="lg" fontWeight="bold">
                    来院中のMR一覧
                </Typography>
            </div>

            {Array.isArray(visitingSales) && (
                <>
                    {visitingSales.length === 0 && (
                        <div className={styles.emptyMessageWrapper}>
                            <Typography tag="p" size="sm">
                                現在ラウンジに来院中のMRはいません。
                            </Typography>
                        </div>
                    )}

                    {visitingSales.length > 0 && (
                        <div className={styles.listWrapper}>
                            {visitingSales.map((f: Friend) => (
                                <UserProfileCard
                                    key={f.userId}
                                    // 既読表示なし
                                    friend={{ ...f, unreadCount: 0 }}
                                    onClickEditNameIcon={() => onClickEditNameIcon(f)}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}

            <EditFriendNameModal
                isOpen={openEditNameModal}
                onClose={onCloseEditNameModal}
                callbackAfterUpdate={callbackAfterUpdate}
                friendUserId={editFriendNameData.friendUserId}
                defaultDisplayName={editFriendNameData.defaultDisplayName}
                currentDisplayName={editFriendNameData.currentDisplayName}
            />

            <div className={styles.bottomSpacer} />
        </>
    );
};

export default DoctorLoungePage;
