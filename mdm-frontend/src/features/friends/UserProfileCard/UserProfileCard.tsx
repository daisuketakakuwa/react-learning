import { Typography } from '@/components/Typography';
import styles from './UserProfileCard.module.css';

type UserProfileCardProps = {
    friend: Friend;
    onClickEditNameIcon: () => void;
};

export const UserProfileCard = (props: UserProfileCardProps) => {
    const friend = props.friend;

    return (
        <div className={styles.root} key={friend.email}>
            <img src="/img/user-icon.png" className={styles.profileImg} />
            <div className={styles.profileMainContentArea}>
                <div className={`${styles.profileNameLine} ${styles.profileField}`}>
                    <Typography tag="div" size="xl" fontWeight="bold">
                        {friend.displayName}
                    </Typography>
                    <img
                        src="/svg/edit.svg"
                        height="20px"
                        className={styles.editNameIcon}
                        onClick={(e) => {
                            e.stopPropagation(); // ← 外側のクリックを止める
                            props.onClickEditNameIcon();
                        }}
                    />
                </div>
                <Typography className={styles.profileField} tag="div" size="sm">
                    {friend.email}
                </Typography>
                <Typography className={styles.profileField} tag="div" size="sm">
                    {friend.orgName}
                </Typography>
                <div className={styles.freeCommentLine}>
                    <Typography className={styles.profileField} tag="div" size="sm">
                        {friend.freeComment}
                    </Typography>
                </div>
            </div>
            <Typography tag="div" size="sm" fontWeight="bold" className={friend.unreadCount == 0 ? styles.noMessage : styles.unreadBadge}>
                {/* 99件以上は "99+" に変換（LINE風） */}
                <>{friend.unreadCount > 99 ? '99+' : friend.unreadCount}</>
            </Typography>
        </div>
    );
};
