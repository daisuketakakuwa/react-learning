import { Button } from '@/components/Button';
import Loading from '@/components/Loading/Loading';
import { Modal } from '@/components/Modal';
import { QrGenerator } from '@/components/QrGenerator/';
import { Typography } from '@/components/Typography';
import { fetchAllHospitals, fetchHospitalInfo } from '@/lib/api/APIHandler';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import useSWR from 'swr';
import styles from './index.module.css';
import CreateHospitalUserModal from './_components/CreateHospitalUserModal';
import UpdateHospitalModal from './_components/UpdateHospitalModal';
import UpdateHospitalUserModal from './_components/UpdateHospitalUserModal';
import { AuthContext } from '@/context/SessionProvider';

const HospitalEditPage = () => {
    const router = useRouter();
    const { isManagerAuthenticated } = useContext(AuthContext);
    const { id: hospitalId } = router.query;

    const [openQrCodeModal, setOpenQrCodeModal] = useState(false);
    const [openUpdateHospitalNameModal, setOpenUpdateHospitalNameModal] = useState(false);
    const [openCreateHospitalUserModal, setOpenCreateHospitalUserModal] = useState(false);

    // 病院ユーザー更新用の情報
    type UpdateHospitalUserInfo = {
        userId: string;
        username: string;
        email: string;
    };
    const [updateHospitalUserInfo, setUpdateHospitalUserInfo] = useState({} as UpdateHospitalUserInfo);
    const [openUpdateHospitalUserModal, setOpenUpdateHospitalUserModal] = useState(false);

    const {
        data: allHospitals = [],
        mutate: mutateFetchAllHospitals,
        isLoading: isLoading1,
    } = useSWR<Hospital[]>(isManagerAuthenticated ? '/api/managers/hospitals' : null, fetchAllHospitals);
    const {
        data: hospitalInfo,
        mutate: mutateFetchHospitalInfo,
        isLoading: isLoading2,
    } = useSWR<FetchClientInfoResponse>(isManagerAuthenticated ? ['/api/managers/hospitals', hospitalId] : null, fetchHospitalInfo);

    // 更新完了後に再度APIを呼ぶ
    const fetchAllAgain = () => {
        mutateFetchAllHospitals();
        mutateFetchHospitalInfo();
    };

    return (
        <div className={styles.root}>
            <Loading isOpen={!router.isReady || isLoading1 || isLoading2} />
            {hospitalId && hospitalInfo && (
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
                        <div className={styles.underlinedNavLink} onClick={() => router.push('/manager/hospitals')}>
                            <Typography tag="a" size="md" fontWeight="bold" className={styles.linkItem}>
                                病院を管理
                            </Typography>
                        </div>
                        <Typography tag="span" size="md" fontWeight="bold" className={styles.linkItem}>
                            {'>'}
                        </Typography>
                        <Typography tag="span" size="md" fontWeight="bold" className={styles.linkItem}>
                            {hospitalInfo.name}
                        </Typography>
                    </div>

                    <div className={`${styles.titleWrapper} ${styles.textCenter}`}>
                        <Typography tag="h1" size="lg" fontWeight="bold">
                            病院名
                        </Typography>
                    </div>
                    <div className={styles.valueAndEditBtnLine}>
                        <div className={styles.currentValueItem}>{hospitalInfo.name}</div>
                        <Button variant="secondary" onClick={() => setOpenUpdateHospitalNameModal(true)}>
                            編集
                        </Button>
                    </div>

                    <UpdateHospitalModal
                        hospitalId={hospitalId as string}
                        currentName={hospitalInfo.name}
                        isOpen={openUpdateHospitalNameModal}
                        onClose={() => setOpenUpdateHospitalNameModal(false)}
                        callbackSuccess={() => {
                            setOpenUpdateHospitalNameModal(false);
                            fetchAllAgain();
                        }}
                        allHospitals={allHospitals}
                    />

                    <div className={`${styles.titleWrapper} ${styles.textCenter}`}>
                        <Typography tag="h1" size="lg" fontWeight="bold">
                            MDM利用ユーザー
                        </Typography>
                    </div>
                    <div className={styles.textCenter}>
                        <Typography tag="p" size="sm" fontWeight="bold">
                            {`@${hospitalInfo.name}`}
                        </Typography>
                    </div>

                    {hospitalInfo.users && (
                        <>
                            {hospitalInfo.users.length == 0 && (
                                <div className={`${styles.zeroUserTextWrapper} ${styles.textCenter}`}>
                                    <Typography tag="p" size="sm">
                                        利用ユーザーを作成してください。
                                    </Typography>
                                </div>
                            )}
                            {hospitalInfo.users.map((u: FetchHospitalInfoUser) => (
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
                                            setUpdateHospitalUserInfo({
                                                userId: u.userId,
                                                email: u.email,
                                                username: u.displayName,
                                            });
                                            // 更新用のモーダルを開く。
                                            setOpenUpdateHospitalUserModal(true);
                                        }}
                                    >
                                        編集
                                    </Button>
                                </div>
                            ))}
                        </>
                    )}
                    <UpdateHospitalUserModal
                        userId={updateHospitalUserInfo.userId}
                        username={updateHospitalUserInfo.username}
                        email={updateHospitalUserInfo.email}
                        isOpen={openUpdateHospitalUserModal}
                        onClose={() => {
                            setOpenUpdateHospitalUserModal(false);
                            setUpdateHospitalUserInfo({} as UpdateHospitalUserInfo);
                        }}
                        callbackAfterTriggerAPI={() => {
                            setOpenUpdateHospitalUserModal(false);
                            setUpdateHospitalUserInfo({} as UpdateHospitalUserInfo);
                            fetchAllAgain();
                        }}
                    />
                    <div className={styles.buttonWrapper}>
                        <Button onClick={() => setOpenCreateHospitalUserModal(true)}>Userを作成</Button>
                    </div>
                    <CreateHospitalUserModal
                        hospitalId={hospitalId as string}
                        isOpen={openCreateHospitalUserModal}
                        onClose={() => setOpenCreateHospitalUserModal(false)}
                        callbackAfterTriggerAPI={() => {
                            setOpenCreateHospitalUserModal(false);
                            fetchAllAgain();
                        }}
                    />
                    <div className={`${styles.titleWrapper} ${styles.textCenter}`}>
                        <Typography tag="h1" size="lg" fontWeight="bold">
                            ラウンジQRコード
                        </Typography>
                    </div>
                    <div className={styles.buttonWrapper}>
                        <Button onClick={() => setOpenQrCodeModal(true)}>QRコードを表示する</Button>
                    </div>
                    <Modal isOpen={openQrCodeModal} onClose={() => setOpenQrCodeModal(false)}>
                        <>
                            <div className={styles.textCenter}>
                                <Typography tag="p" size="sm">
                                    ラウンジに到着したMRに、このQRコードをMDMアプリで読み取ってもらいます。
                                </Typography>
                            </div>
                            <div className={styles.qrGeneratorWrapper}>
                                <QrGenerator value={hospitalId as string} />
                            </div>
                        </>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default HospitalEditPage;
