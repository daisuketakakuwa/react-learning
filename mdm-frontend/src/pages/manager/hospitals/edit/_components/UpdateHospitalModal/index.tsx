import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { TextInput } from '@/components/TextInput';
import { FormErrorMessage, Typography } from '@/components/Typography';
import { updateHospital } from '@/lib/api/APIHandler';
import { useEffect, useState } from 'react';
import styles from './index.module.css';

const UpdateHospitalModal = (props: {
    hospitalId: string;
    currentName: string;
    isOpen: boolean;
    onClose: () => void;
    callbackSuccess: () => void;
    allHospitals: Hospital[];
}) => {
    // 入力値
    const [hospitalName, setHospitalName] = useState('');
    const [hospitalNameErrMsg, setHospitalNameErrMsg] = useState('');

    useEffect(() => {
        // モーダル開いた時に値を格納する
        if (props.isOpen) setHospitalName(props.currentName);
    }, [props.isOpen]);

    // バリデーション
    const validateInput = () => {
        var hasError = false;

        if (hospitalName == '') {
            setHospitalNameErrMsg('病院名を入力してください。');
            hasError = true;
        } else {
            // 半角/全角スペースを除去した上でマッチしなければ新規登録可能
            const trimmedHospitalName = hospitalName.replaceAll(/[\s　]/g, '');
            const trimmedAllHospitalNames = props.allHospitals.map((h: Hospital) => h.name.replaceAll(/[\s　]/g, ''));
            if (trimmedAllHospitalNames.includes(trimmedHospitalName)) {
                setHospitalNameErrMsg('既に同名の病院が登録されています。');
                hasError = true;
            }
        }

        return hasError;
    };

    const resetAllInput = () => {
        setHospitalName('');
        setHospitalNameErrMsg('');
    };

    const callUpdateHospitalAPI = () => {
        if (!validateInput()) {
            updateHospital(props.hospitalId, hospitalName).then(() => {
                resetAllInput();
                props.callbackSuccess();
            });
        }
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onClose={() => {
                resetAllInput();
                props.onClose();
            }}
        >
            <>
                <div className={styles.formFieldWrapper}>
                    <Typography tag="p" color="var(--color-text-gray)" size="md" fontWeight="bold">
                        病院名
                    </Typography>
                    <div className={styles.textInputWrapper}>
                        <TextInput type="text" value={hospitalName} onInput={(e) => setHospitalName(e.currentTarget.value)} />
                    </div>
                    <FormErrorMessage>{hospitalNameErrMsg}</FormErrorMessage>
                </div>

                <div className={styles.btnWrapper}>
                    <Button onClick={callUpdateHospitalAPI}>更新する</Button>
                </div>
            </>
        </Modal>
    );
};

export default UpdateHospitalModal;
