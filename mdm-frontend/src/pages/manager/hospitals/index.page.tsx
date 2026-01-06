import Loading from '@/components/Loading/Loading';
import { MenuLinkCard } from '@/components/MenuLinkCard';
import { Typography } from '@/components/Typography';
import { fetchAllHospitals } from '@/lib/api/APIHandler';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import useSWR from 'swr';
import styles from './index.module.css';
import CreateHospitalModal from './_components/CreateHospitalModal';
import { AuthContext } from '@/context/SessionProvider';

const ManageHospitalPage = () => {
    const router = useRouter();
    const { isManagerAuthenticated } = useContext(AuthContext);
    const [isOpenCreateHospitalModal, setIsOpenCreateHospitalModal] = useState(false);

    const {
        data: allHospitals,
        mutate,
        isLoading,
    } = useSWR<Hospital[]>(isManagerAuthenticated ? '/api/managers/hospitals' : null, fetchAllHospitals);

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
                    病院を管理
                </Typography>
            </div>
            <div className={styles.addHospitalWrapper}>
                <MenuLinkCard onClick={() => setIsOpenCreateHospitalModal(true)}>病院を追加する</MenuLinkCard>
            </div>

            <div className={styles.hospitalListTitleWrapper}>
                <Typography tag="h3" size="lg" fontWeight="bold">
                    登録済みの病院一覧
                </Typography>
            </div>

            <Loading isOpen={isLoading} />

            {Array.isArray(allHospitals) && (
                <>
                    {allHospitals.length > 0 && (
                        <div className={styles.hospitalListWrapper}>
                            {allHospitals.map((h: Hospital) => (
                                <MenuLinkCard key={h.id} variant="secondary" onClick={() => router.push(`/manager/hospitals/edit?id=${h.id}`)}>
                                    {h.name}
                                </MenuLinkCard>
                            ))}
                        </div>
                    )}

                    <CreateHospitalModal
                        isOpen={isOpenCreateHospitalModal}
                        onClose={() => setIsOpenCreateHospitalModal(false)}
                        callbackSuccess={() => {
                            setIsOpenCreateHospitalModal(false);
                            mutate();
                        }}
                        allHospitals={allHospitals}
                    />
                </>
            )}
        </div>
    );
};

export default ManageHospitalPage;
