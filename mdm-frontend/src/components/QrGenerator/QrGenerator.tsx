import React from 'react';
import QRCode from 'react-qr-code';
import styles from './QrGenerator.module.css';

type QrGeneratorProps = {
    value: string;
};

export const QrGenerator: React.FC<QrGeneratorProps> = ({ value }) => {
    if (!value) return null;

    return (
        <div className={styles.root}>
            <div className={styles.qrCodeWrapper}>
                <QRCode value={value} />
            </div>
        </div>
    );
};
