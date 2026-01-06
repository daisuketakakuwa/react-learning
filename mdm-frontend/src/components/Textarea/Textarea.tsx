import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Textarea.module.css';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ id, value, placeholder, onInput, style, className, ...rest }, ref) => {
        const mergedClassname = clsx(styles.root, className);

        return (
            <textarea
                id={id}
                ref={ref}
                className={mergedClassname}
                value={value}
                placeholder={placeholder}
                onInput={onInput}
                style={style}
                {...rest}
            />
        );
    }
);

Textarea.displayName = 'Textarea';
