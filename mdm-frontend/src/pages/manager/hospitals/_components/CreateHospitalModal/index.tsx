import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { TextInput } from '@/components/TextInput';
import { FormErrorMessage, Typography } from '@/components/Typography';
import { createHospital } from '@/lib/api/APIHandler';
import { useState } from 'react';
import styles from './index.module.css';

const CreateHospitalModal = (props: { isOpen: boolean; onClose: () => void; callbackSuccess: () => void; allHospitals: Hospital[] }) => {
    // 入力値
    const [hospitalName, setHospitalName] = useState('');
    const [hospitalNameErrMsg, setHospitalNameErrMsg] = useState('');

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

    const callCreateHospitalAPI = () => {
        if (!validateInput()) {
            createHospital(hospitalName).then(() => {
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
                <div className={styles.titleWrapper}>
                    <Typography tag="p" color="var(--color-text-gray)" fontWeight="bold">
                        登録する病院名
                    </Typography>
                </div>

                <div className={styles.formTextInputWrapper}>
                    <TextInput type="text" value={hospitalName} onInput={(e) => setHospitalName(e.currentTarget.value)} />
                    <FormErrorMessage>{hospitalNameErrMsg}</FormErrorMessage>
                </div>

                <div className={styles.btnWrapper}>
                    <Button onClick={callCreateHospitalAPI}>登録する</Button>
                </div>
            </>
        </Modal>
    );
};

export default CreateHospitalModal;
