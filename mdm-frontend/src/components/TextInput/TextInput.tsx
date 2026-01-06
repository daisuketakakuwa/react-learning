import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import styles from './TextInput.module.css';

export const TextInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ type = 'text', value, placeholder, onInput, className }) => {
    const mergedClassname = clsx(styles.root, className);

    return <input type={type} className={mergedClassname} value={value} placeholder={placeholder} onInput={onInput} />;
};
