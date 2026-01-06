import Loading from '@/components/Loading/Loading';
import { MenuLinkCard } from '@/components/MenuLinkCard';
import { Typography } from '@/components/Typography';
import { fetchAllClients } from '@/lib/api/APIHandler';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import useSWR from 'swr';
import styles from './index.module.css';
import CreateClientModal from './_components/CreateClientModal';
import { AuthContext } from '@/context/SessionProvider';

const ManageClientPage = () => {
    const router = useRouter();
    const { isManagerAuthenticated } = useContext(AuthContext);
    const [isOpenCreateClientModal, setIsOpenCreateClientModal] = useState(false);

    const { data: allClients = [], mutate, isLoading } = useSWR<Client[]>(isManagerAuthenticated ? '/api/managers/clients' : null, fetchAllClients);

    return (
        <div className={styles.root}>
            <div className={styles.headerNavigationLinkArea}>
                <div className={styles.underlinedNavLink} onClick={() => router.push('/manager/top')}>
                    <Typography tag="a" size="md" fontWeight="bold">
                        管理者TOP
                    </Typography>
                </div>
                <Typography tag="div" size="md" fontWeight="bold">
                    {'>'}
                </Typography>
                <Typography tag="div" size="md" fontWeight="bold">
                    企業を管理
                </Typography>
            </div>

            <div className={styles.addClientWrapper}>
                <MenuLinkCard onClick={() => setIsOpenCreateClientModal(true)}>企業を追加する</MenuLinkCard>
            </div>

            <div className={styles.clientListTitleWrapper}>
                <Typography tag="h3" size="lg" fontWeight="bold">
                    登録済みの企業一覧
                </Typography>
            </div>

            <Loading isOpen={isLoading} />

            {Array.isArray(allClients) && allClients.length > 0 && (
                <div className={styles.clientListWrapper}>
                    {allClients.map((c: Client) => (
                        <MenuLinkCard key={c.id} variant="secondary" onClick={() => router.push(`/manager/clients/edit?id=${c.id}`)}>
                            {c.name}
                        </MenuLinkCard>
                    ))}
                </div>
            )}

            <CreateClientModal
                isOpen={isOpenCreateClientModal}
                onClose={() => setIsOpenCreateClientModal(false)}
                callbackSuccess={() => {
                    setIsOpenCreateClientModal(false);
                    mutate();
                }}
                allClients={allClients}
            />
        </div>
    );
};

export default ManageClientPage;
