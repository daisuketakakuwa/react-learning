import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';
import { capitalize } from '@/utils/stringUtils';

type ButtonProps = {
    children: React.ReactElement | string;
    // スタイルパターンを指定する
    variant?: 'primary' | 'secondary' | 'tertiary';
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> = ({ children, onClick, variant = 'primary', ...props }) => {
    const mergedClassname = clsx(styles.root, styles[`color${capitalize(variant)}`]);

    return (
        <button onClick={onClick} className={mergedClassname} {...props}>
            {children}
        </button>
    );
};
