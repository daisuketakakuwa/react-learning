import styles from './Loading.module.css';

type LoadingProps = {
    isOpen: boolean;
};

const Loading = (props: LoadingProps) => {
    if (!props.isOpen) return <></>;
    return (
        <div className={styles.overlay}>
            <div className={styles.spinner} />
            <p className={styles.text}>Loading...</p>
        </div>
    );
};

export default Loading;
