import { Button } from '@/components/Button';
import Loading from '@/components/Loading/Loading';
import { Typography } from '@/components/Typography';
import { fetchAllClients, fetchClientInfo } from '@/lib/api/APIHandler';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import useSWR from 'swr';
import CreateClientUserModal from './components/CreateClientUserModal';
import UpdateClientModal from './components/UpdateClientModal';
import UpdateClientUserModal from './components/UpdateClientUserModal';
import styles from './index.module.css';
import { AuthContext } from '@/context/SessionProvider';

const ClientEditPage = () => {
    const router = useRouter();
    const { isManagerAuthenticated } = useContext(AuthContext);
    const { id: clientId } = router.query;

    const [openUpdateClientNameModal, setOpenUpdateClientNameModal] = useState(false);
    const [openCreateClientUserModal, setOpenCreateClientUserModal] = useState(false);

    // 病院ユーザー更新用の情報
    type UpdateClientUserInfo = {
        userId: string;
        username: string;
        email: string;
    };
    const [updateClientUserInfo, setUpdateClientUserInfo] = useState({} as UpdateClientUserInfo);
    const [openUpdateClientUserModal, setOpenUpdateClientUserModal] = useState(false);

    // 編集用に登録済みの病院一覧を取得する。
    const {
        data: allClients = [],
        mutate: mutateFetchAllClients,
        isLoading: isLoading1,
    } = useSWR<Client[]>(isManagerAuthenticated ? '/api/managers/clients' : null, fetchAllClients);
    const {
        data: clientInfo,
        mutate: mutateFetchClientInfo,
        isLoading: isLoading2,
    } = useSWR<FetchClientInfoResponse>(isManagerAuthenticated && clientId ? ['/api/managers/clients', clientId] : null, fetchClientInfo);

    const fetchAllAgain = () => {
        mutateFetchAllClients();
        mutateFetchClientInfo();
    };

    return (
        <div className={styles.root}>
            <Loading isOpen={!router.isReady || isLoading1 || isLoading2} />
            {clientId && clientInfo && (
                <>
                    <div className={styles.headerNavigationLinkArea}>
                        <div className={styles.underlinedNavLink} onClick={() => router.push('/manager/top')}>
                            <Typography tag="a" size="md" fontWeight="bold">
                                管理者TOP
                            </Typography>
                        </div>
                        <Typography tag="span" size="md" fontWeight="bold" className={styles.linkItem}>
                            {'>'}
                        </Typography>
                        <div className={styles.underlinedNavLink} onClick={() => router.push('/manager/clients')}>
                            <Typography tag="a" size="md" fontWeight="bold" className={styles.linkItem}>
                                企業を管理
                            </Typography>
                        </div>
                        <Typography tag="span" size="md" fontWeight="bold" className={styles.linkItem}>
                            {'>'}
                        </Typography>
                        <Typography tag="span" size="md" fontWeight="bold" className={styles.linkItem}>
                            {clientInfo.name}
                        </Typography>
                    </div>

                    <div className={`${styles.titleWrapper} ${styles.textCenter}`}>
                        <Typography tag="h1" size="lg" fontWeight="bold">
                            企業名
                        </Typography>
                    </div>
                    <div className={styles.valueAndEditBtnLine}>
                        <div className={styles.currentValueItem}>{clientInfo.name}</div>
                        <Button variant="secondary" onClick={() => setOpenUpdateClientNameModal(true)}>
                            編集
                        </Button>
                    </div>

                    <UpdateClientModal
                        clientId={clientId as string}
                        currentName={clientInfo.name}
                        isOpen={openUpdateClientNameModal}
                        onClose={() => setOpenUpdateClientNameModal(false)}
                        callbackSuccess={() => {
                            setOpenUpdateClientNameModal(false);
                            fetchAllAgain();
                        }}
                        allClients={allClients}
                    />

                    <div className={`${styles.titleWrapper} ${styles.textCenter}`}>
                        <Typography tag="h1" size="lg" fontWeight="bold">
                            MDM利用ユーザー
                        </Typography>
                    </div>
                    <div className={styles.textCenter}>
                        <Typography tag="p" size="sm" fontWeight="bold">
                            {`@${clientInfo.name}`}
                        </Typography>
                    </div>

                    {clientInfo.users && (
                        <>
                            {clientInfo.users.length == 0 && (
                                <div className={`${styles.zeroUserTextWrapper} ${styles.textCenter}`}>
                                    <Typography tag="p" size="sm">
                                        利用ユーザーを作成してください。
                                    </Typography>
                                </div>
                            )}
                            {clientInfo.users.map((u: FetchClientInfoUser) => (
                                <div key={u.userId} className={styles.valueAndEditBtnLine}>
                                    <div className={styles.currentValueItem}>
                                        <div>{u.displayName}</div>
                                        <div style={{ borderTop: '0.5px solid black', margin: '5px 0 3px' }} />
                                        <div>{u.email}</div>
                                    </div>
                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                            // 更新対象のUser情報を格納する。
                                            setUpdateClientUserInfo({
                                                userId: u.userId,
                                                email: u.email,
                                                username: u.displayName,
                                            });
                                            // 更新用のモーダルを開く。
                                            setOpenUpdateClientUserModal(true);
                                        }}
                                    >
                                        編集
                                    </Button>
                                </div>
                            ))}
                        </>
                    )}
                    <UpdateClientUserModal
                        userId={updateClientUserInfo.userId}
                        username={updateClientUserInfo.username}
                        email={updateClientUserInfo.email}
                        isOpen={openUpdateClientUserModal}
                        onClose={() => {
                            setOpenUpdateClientUserModal(false);
                            setUpdateClientUserInfo({} as UpdateClientUserInfo);
                        }}
                        callbackAfterTriggerAPI={() => {
                            setOpenUpdateClientUserModal(false);
                            setUpdateClientUserInfo({} as UpdateClientUserInfo);
                            fetchAllAgain();
                        }}
                    />
                    <div className={styles.buttonWrapper}>
                        <Button onClick={() => setOpenCreateClientUserModal(true)}>Userを作成</Button>
                    </div>
                    <CreateClientUserModal
                        clientId={clientId as string}
                        isOpen={openCreateClientUserModal}
                        onClose={() => setOpenCreateClientUserModal(false)}
                        callbackAfterTriggerAPI={() => {
                            setOpenCreateClientUserModal(false);
                            fetchAllAgain();
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default ClientEditPage;
