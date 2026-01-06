import { clsx } from 'clsx';
import { createElement, CSSProperties } from 'react';
import styles from './Typography.module.css';

// Pageコンポーネント側で実装すべきもの↓
//
// textAlign: 子要素のブロック要素内の文字にも適用される -> UIコンポーネント側で実装する
// textDecoration: 子要素のブロック要素内の「文字」のみに適用される -> UIコンポーネント側で実装する
// textUnderlineOffset: ↑と同じく
// onClick：「見た目」ではなく「振る舞い」なので。
// cursor：「見た目」ではなく「振る舞い」なので。

type TypographyProps = {
    tag?: keyof JSX.IntrinsicElements; // "h1" | "h2" | "p" など
    children: React.ReactElement | string;
    color?: string;
    size?: 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
    fontWeight?: 'thin' | 'extraLight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extraBold' | 'bold';
    className?: string;
    style?: CSSProperties;
};

export const Typography: React.FC<TypographyProps> = ({
    tag = 'p',
    children,
    color = '--color-text-black',
    size = 'base',
    fontWeight = 'normal',
    className,
    style,
    ...rest
}) => {
    const mergedClassname = clsx(styles.root, className);
    return createElement(
        tag,
        {
            className: mergedClassname,
            style: {
                color: color,
                fontSize: `var(--font-size-${size})`,
                fontWeight: `var(--font-weight-${fontWeight})`,
                ...style,
            },
            ...rest,
        },
        children
    );
};

// ページタイトル
export const PageTitle = ({ children }: { children: React.ReactElement | string }) => (
    <Typography tag="h1" size="lg">
        {children}
    </Typography>
);

// 入力フォームのエラーメッセージ
export const FormErrorMessage = ({ children }: { children: React.ReactElement | string }) => (
    <Typography tag="p" size="sm" color="var(--color-text-error)">
        {children}
    </Typography>
);
