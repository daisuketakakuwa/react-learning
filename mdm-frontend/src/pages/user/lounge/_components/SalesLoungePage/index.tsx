import { Button } from '@/components/Button';
import Loading from '@/components/Loading/Loading';
import { Typography } from '@/components/Typography';
import { fetchVisitingHospitalsBySales, leaveVisitingHospitalsBySales } from '@/lib/api/APIHandler';
import { useContext, useState } from 'react';
import useSWR from 'swr';
import styles from './index.module.css';
import ReadLoungeQRCode from './ReadLoungeQRCode';
import { AuthContext } from '@/context/SessionProvider';

const SalesLoungePage = () => {
    const { authUserInfo } = useContext(AuthContext);
    const [selectedHospitalId, setSelectedHospitalId] = useState('');
    const {
        data: visitingHospitals = [],
        mutate,
        isLoading,
    } = useSWR<Hospital[]>(authUserInfo ? '/api/users/sales-visiting-hospitals/hospitals' : null, fetchVisitingHospitalsBySales);

    const handleClickHospitalIcon = (id: string) => {
        setSelectedHospitalId((prev) => (prev === id ? '' : id));
    };

    const leaveHospital = (hospitalId: string) => {
        setSelectedHospitalId('');
        // 削除系なのでuseSWRは使わない
        leaveVisitingHospitalsBySales(hospitalId).then(() => mutate());
    };

    return (
        <>
            <Loading isOpen={isLoading} />
            <div className={styles.page}>
                <div className={styles.pageTitleWrapper}>
                    <Typography tag="h1" size="lg" fontWeight="bold">
                        在院ステータス管理画面
                    </Typography>
                </div>

                <div className={styles.qrTitleWrapper}>
                    <Typography tag="h2" size="md" fontWeight="semibold">
                        ラウンジQRコード読取
                    </Typography>
                </div>

                <div className={styles.qrDescriptionWrapper}>
                    <Typography tag="span" size="sm">
                        病院のMDMラウンジに設置されている QRコードを読み取ってください。
                        スキャンが完了すると、あなたが訪問中であることを病院の医者に伝えます。
                    </Typography>
                </div>

                <div className={styles.readQrWrapper}>
                    <ReadLoungeQRCode successCallbackAfterReadQrCode={mutate} />
                </div>

                <div className={styles.hospitalSectionTitleWrapper}>
                    <Typography tag="h2" size="md" fontWeight="semibold">
                        あなたが訪問中の病院
                    </Typography>
                </div>

                {Array.isArray(visitingHospitals) && (
                    <>
                        {visitingHospitals.length === 0 && (
                            <div className={styles.emptyHospitalWrapper}>
                                <Typography tag="span" size="sm">
                                    現在あなたが訪問中の病院はありません。
                                </Typography>
                            </div>
                        )}

                        {visitingHospitals.length > 0 && (
                            <>
                                <div className={styles.hospitalDescriptionWrapper}>
                                    <Typography tag="span" size="sm">
                                        「これから退館される病院」もしくは「既に退館済みの病院」を選択した上で 「退館する」ボタンを押してください。
                                        病院の医者に対して「退館済み」であることを伝えます。
                                    </Typography>
                                </div>

                                <div className={styles.hospitalListWrapper}>
                                    {visitingHospitals.map((hospital) => (
                                        <div key={hospital.id} className={styles.hospitalItemWrapper}>
                                            <div
                                                // 選択するとclassnameを動的に切り替える
                                                className={`${styles.hospitalIcon} ${
                                                    hospital.id === selectedHospitalId ? styles.hospitalIconSelected : ''
                                                }`}
                                                onClick={() => handleClickHospitalIcon(hospital.id)}
                                            >
                                                {hospital.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.leaveButtonWrapper}>
                                    <Button variant="primary" disabled={!selectedHospitalId} onClick={() => leaveHospital(selectedHospitalId)}>
                                        退館する
                                    </Button>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default SalesLoungePage;
