type UserInfo = {
    userId: string;
    email: string;
    displayName: string;
    orgName: string;
    profileImgUrl: string;
    freeComment: string;
    userType: string;
    // doctor用
    doctorId: string;
    hospitalId: string;
    // MR用
    salesId: string;
    clientId: string;
};

type Friend = {
    userId: string;
    email: string;
    orgName: string;
    defaultDisplayName: string;
    displayName: string;
    profileImgUrl: string;
    freeComment: string;
    unreadCount: number;
    lastMessage: string;
    lastMessageSendDate: string;
    lastMessageSendTime: string;
};

type Hospital = {
    id: string;
    name: string;
};
type Client = {
    id: string;
    name: string;
};

type EditFriendNameData = {
    friendUserId: string;
    defaultDisplayName: string;
    currentDisplayName: string;
};

// ログイン情報をContextに保存する
type SessionContext = {
    authUserInfo: UserInfo | null;
    setAuthUserInfo: Dispatch<SetStateAction<UserInfo>>;
    isManagerAuthenticated: boolean;
    setIsManagerAuthenticated: Dispatch<SetStateAction<boolean>>;
};

// API IF
type UserLoginResponse = {
    userInfo: UserInfo;
};

type verifyUserResponse = {
    userInfo: UserInfo;
};

type ChatMessage = {
    senderName: string;
    message: string;
    sendDate: string;
    sendTime: string;
    isMe: boolean;
    unreadByBuddy: boolean;
};

type FetchMessagesResponse = {
    user1Id: string;
    user1Name: string;
    user2Id: string;
    user2Name: string;
    messages: ChatMessage[];
};

type FetchHospitalInfoResponse = {
    name: string;
    users: FetchHospitalInfoUser[];
};
type FetchHospitalInfoUser = {
    userId: string;
    email: string;
    displayName: string;
};

type FetchClientInfoResponse = {
    name: string;
    users: FetchClientInfoUser[];
};
type FetchClientInfoUser = {
    userId: string;
    email: string;
    displayName: string;
};

type FetchFriendsResponse = {
    friends: Friend[];
};

type FetchVisitingHospitalsBySalesResponse = {
    hospitals: Hospital[];
};

type FetchUserProfieInfoResponse = UserInfo;

// Snackbarで使う。HTMLDivElementの型定義にこの関数が含まれてなさそうなので。
interface HTMLDivElement {
    showPopover: () => void;
    hidePopover: () => void;
}
