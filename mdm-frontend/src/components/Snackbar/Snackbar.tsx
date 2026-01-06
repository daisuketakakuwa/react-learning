import { capitalize } from '@/utils/stringUtils';
import { useEffect, useRef } from 'react';
import { Typography } from '@/components/Typography';
import styles from './Snackbar.module.css';

export type SnackbarProps = {
    open: boolean;
    type: 'success' | 'error';
    message: string;
};

export const Snackbar = (props: SnackbarProps) => {
    const { open, type, message } = props;

    // useRef = DOMを直接操作したい時に使う。
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const popoverElem = popoverRef.current;
        // commit完了前はnullなのでreturn
        if (popoverElem === null) return;

        if (open) {
            if (!popoverElem.matches(':popover-open')) popoverElem.showPopover();
        } else {
            if (popoverElem.matches(':popover-open')) popoverElem.hidePopover();
        }
    }, [open]);

    return (
        <div
            // 手動(JavaScript)で開閉する（通常はpopovertaget属性で自動）
            popover="manual"
            ref={popoverRef}
            className={styles.root}
        >
            <div className={`${styles.content} ${styles[`${type}Style`]}`}>
                <img src={`/svg/white${capitalize(type)}.svg`} width="20px" height="20px" />
                <Typography tag="p">{message}</Typography>
            </div>
        </div>
    );
};
