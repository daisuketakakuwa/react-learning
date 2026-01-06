export function capitalize(value: string): string {
    if (value.length == 0) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export const trimNewlines = (str: string): string => {
    return str.replace(/^\r?\n+|\r?\n+$/g, '');
};
