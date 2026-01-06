import { Typography } from '@/components/Typography';
import styles from './MenuLinkCard.module.css';

type MenuLinkCardProps = {
    children: React.ReactElement | string;
    // スタイルパターンを指定する
    variant?: 'primary' | 'secondary';
    onClick: (event: React.MouseEvent) => void;
};

export const MenuLinkCard = ({ children, variant = 'primary', onClick }: MenuLinkCardProps) => {
    const colors = {
        primary: 'white',
        secondary: 'black',
    };

    return (
        <div className={`${styles.root} ${styles[`${variant}Color`]}`} onClick={onClick}>
            <Typography className={styles.textItem} tag="div" color={`var(--color-text-${colors[variant]})`} size="2xl" fontWeight="bold">
                {children}
            </Typography>
        </div>
    );
};
