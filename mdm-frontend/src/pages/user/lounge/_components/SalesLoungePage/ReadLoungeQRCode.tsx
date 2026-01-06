import { showAPISnackbar } from '@/components/APIContext/APIEventEmitter';
import { QrScanner } from '@/components/QrScanner';
import { visitHospital } from '@/lib/api/APIHandler';

type ReadLoungeQRCodeProps = {
    successCallbackAfterReadQrCode: () => void;
};

const ReadLoungeQRCode = ({ successCallbackAfterReadQrCode }: ReadLoungeQRCodeProps) => {
    const handleScanSuccess = (hospitalId: string) => {
        visitHospital(hospitalId).then(() => successCallbackAfterReadQrCode());
    };

    const handleScanFailure = (error: string) => {
        showAPISnackbar('error', '読み取り処理に失敗しました。');
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <QrScanner onScanSuccess={handleScanSuccess} onScanFailure={handleScanFailure} needFileUpload={false} />
            </div>
        </>
    );
};

export default ReadLoungeQRCode;
