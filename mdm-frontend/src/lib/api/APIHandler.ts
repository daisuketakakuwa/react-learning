import axios from 'axios';
import { showAPISnackbar } from '@/components/APIContext/APIEventEmitter';

/**
 * ******************************************************************
 * ******************************************************************
 * User関連
 * ******************************************************************
 * ******************************************************************
 */

// UserログインAPI
export const userLogin = async (email: string, password: string): Promise<UserInfo | null> => {
    try {
        const { data } = await axios.post('/api/users/auth/login', {
            email,
            password,
        });
        return (data as UserLoginResponse).userInfo;
    } catch (err: any) {
        if (err.response.status == 400) {
            showAPISnackbar('error', '認証（ID/PW）処理に失敗しました。');
        } else {
            showAPISnackbar('error', 'サーバーエラーが発生しました。');
        }
        return null;
    }
};

// UserログアウトAPI
export const userLogout = async () => {
    try {
        await axios.post('/api/users/auth/logout');
    } catch (err: any) {
        showAPISnackbar('error', 'サーバーエラーが発生しました。');
    }
};

// Userログイン状態確認API
export const verifyUser = async (): Promise<UserInfo | null> => {
    try {
        const { data } = await axios.get('/api/users/auth/verify');
        return (data as verifyUserResponse).userInfo;
    } catch (err: any) {
        if (err.response.status !== 404) {
            showAPISnackbar('error', 'サーバーエラーが発生しました。');
        }
        return null;
    }
};

// Managerログイン状態確認API
export const verifyManager = async () => {
    try {
        await axios.get('/api/managers/auth/verify');
        return true;
    } catch (err: any) {
        if (err.response.status !== 404) {
            showAPISnackbar('error', 'サーバーエラーが発生しました。');
        }
        return false;
    }
};

// 連絡先一覧取得API
export const fetchFriends = async (): Promise<Friend[]> => {
    try {
        const { data } = await axios.get('/api/users/friends');
        return (data as FetchFriendsResponse).friends;
    } catch (err: any) {
        showAPISnackbar('error', 'サーバーエラーが発生しました。');
        return [];
    }
};

// 連絡先表示名更新API
export const setFriendDisplayName = async (friendUserId: string, displayName: string) => {
    try {
        await axios.put('/api/users/friends/display-name', { friendUserId, displayName });
        showAPISnackbar('success', 'ユーザー表示名の更新に成功しました。');
    } catch (err: any) {
        showAPISnackbar('error', 'サーバーエラーが発生しました。');
    }
};

// チャットルーム取得＆作成用API
export const getOrCreateChatroom = async ([_, friendUserIds]: [string, string[]]): Promise<string | null> => {
    type GetOrCreateChatroomResponse = {
        roomId: string;
    };

    try {
        const { data } = await axios.put('/api/users/chatrooms', { friendUserIds });
        return (data as GetOrCreateChatroomResponse).roomId;
    } catch (err: any) {
        // 409(ほぼ同時に別TXで作成し済の場合、エラーなしで終わらせる
        if (err.response.status !== 409) {
            showAPISnackbar('error', 'サーバーエラーが発生しました。');
        }
        return null;
    }
};
// メッセージ一覧取得API
export const fetchMessages = async ([_, roomId]: [string, string]): Promise<FetchMessagesResponse | undefined> => {
    try {
        const { data } = await axios.get(`/api/users/chatrooms/${roomId}`);
        return data as FetchMessagesResponse;
    } catch (err: any) {
        showAPISnackbar('error', `サーバーエラーが発生しました。`);
        return undefined;
    }
};
// メッセージ送信API
export const sendMessage = async (roomId: string, message: string): Promise<void> => {
    try {
        await axios.post(`/api/users/chatrooms/${roomId}/messages`, {
            message,
        });
    } catch (err: any) {
        showAPISnackbar('error', `サーバーエラーが発生しました。`);
        return undefined;
    }
};

// 友達追加API（QRコード読込）
export const beFriendsByEmail = async (friendEmail: string) => {
    try {
        await axios.post('/api/users/friends-by-email', { friendEmail });
        showAPISnackbar('success', `連絡先（${friendEmail}）の追加に成功しました。`);
    } catch (err: any) {
        showAPISnackbar('error', `サーバーエラーが発生しました。`);
    }
};

// 病院訪問API
export const visitHospital = async (hospitalId: string) => {
    type VisitHospitalResponse = {
        hospitalName: string;
    };

    try {
        const data = (await axios.post(`/api/users/sales-visiting-hospitals/${hospitalId}`)).data as VisitHospitalResponse;
        showAPISnackbar('success', `あなたが訪問中であることを\n「${data.hospitalName}」へ通知しました。`);
    } catch (err: any) {
        showAPISnackbar('error', 'サーバーエラーが発生しました。');
    }
};

// MR訪問中病院取得API
export const fetchVisitingHospitalsBySales = async (): Promise<Hospital[]> => {
    try {
        const { data } = await axios.get(`/api/users/sales-visiting-hospitals/hospitals`);
        return (data as FetchVisitingHospitalsBySalesResponse).hospitals;
    } catch (err: any) {
        showAPISnackbar('error', 'サーバーエラーが発生しました。');
        return [];
    }
};

// MR退館API
export const leaveVisitingHospitalsBySales = async (hospitalId: string) => {
    type LeaveVisitingHospitalsBySalesResponse = {
        hospitalName: string;
    };

    try {
        const data = (await axios.delete(`/api/users/sales-visiting-hospitals/${hospitalId}`)).data as LeaveVisitingHospitalsBySalesResponse;
        showAPISnackbar('success', `「${data.hospitalName}」から退館しました。`);
    } catch (err: any) {
        showAPISnackbar('error', '退館処理に失敗しました。');
    }
};

// 訪問中MR一覧取得API
export const fetchSalesVisitingHospitals = async (): Promise<Friend[]> => {
    type FetchSalesVisitingHospitalsResponse = {
        sales: Friend[];
    };

    try {
        const { data } = await axios.get(`/api/users/sales-visiting-hospitals/sales`);
        return (data as FetchSalesVisitingHospitalsResponse).sales;
    } catch (err: any) {
        showAPISnackbar('error', '訪問中MR一覧取得処理に失敗しました。');
        return [];
    }
};

// プロフィール情報取得
export const fetchUserProfieInfo = async () => {
    try {
        const { data } = await axios.get('/api/users');
        return data as FetchUserProfieInfoResponse;
    } catch (err: any) {
        showAPISnackbar('error', 'サーバーエラーが発生しました。');
        throw new Error(err);
    }
};

// プロフィール情報更新
export const updateUserProfieInfo = async (email: string, displayName: string, freeComment: string) => {
    // データ作成
    const formData = new FormData();
    formData.append('email', email);
    formData.append('displayName', displayName);
    formData.append('freeComment', !!freeComment ? freeComment : '');

    try {
        await axios.put('/api/users', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // 明示的に指定（なくてもAxiosが自動で付ける）
            },
        });
        showAPISnackbar('success', 'ユーザー情報の更新に成功しました。');
    } catch (err: any) {
        showAPISnackbar('error', 'サーバーエラーが発生しました。');
    }
};

/**
 * ******************************************************************
 * ******************************************************************
 * Manager関連
 * ******************************************************************
 * ******************************************************************
 */

// ManagerログインAPI
export const managerLogin = async (id: string, password: string): Promise<boolean> => {
    try {
        await axios.post('/api/managers/auth/login', {
            id,
            password,
        });
        return true;
    } catch (err: any) {
        if (err.response.status == 400) {
            showAPISnackbar('error', '認証（ID/PW）処理に失敗しました。');
        } else {
            showAPISnackbar('error', 'サーバーエラーが発生しました。');
        }
        return false;
    }
};

// ManagerログアウトAPI
export const managerLogout = async () => {
    try {
        await axios.post('/api/managers/auth/logout');
    } catch (err: any) {
        showAPISnackbar('error', 'サーバーエラーが発生しました。');
    }
};

// 病院一覧取得API
export const fetchAllHospitals = async (): Promise<Hospital[]> => {
    type FetchAllHospitalsResponse = {
        hospitals: Hospital[];
    };

    try {
        const { data } = await axios.get(`/api/managers/hospitals`);
        return (data as FetchAllHospitalsResponse).hospitals;
    } catch (err: any) {
        showAPISnackbar('error', 'サーバーエラーが発生しました。');
        return [];
    }
};
// 病院詳細取得API
export const fetchHospitalInfo = async ([_, hospitalId]: [string, string]): Promise<FetchHospitalInfoResponse> => {
    try {
        const { data } = await axios.get(`/api/managers/hospitals/${hospitalId}`);
        return data as FetchHospitalInfoResponse;
    } catch (error: any) {
        showAPISnackbar('error', 'サーバーエラーが発生しました。');
        return { name: '', users: [] };
    }
};

// 病院登録API
export const createHospital = async (hospitalName: string) => {
    try {
        await axios.post('/api/managers/hospitals', { name: hospitalName });
        showAPISnackbar('success', '病院の登録に成功しました。');
    } catch (error: any) {
        showAPISnackbar('error', 'サーバーエラーが発生しました。');
    }
};
// 病院更新API
export const updateHospital = async (hospitalId: string, hospitalName: string) => {
    try {
        await axios.put(`/api/managers/hospitals/${hospitalId}`, { name: hospitalName });
        showAPISnackbar('success', '病院名の更新に成功しました。');
    } catch (error: any) {
        showAPISnackbar('error', 'サーバーエラーが発生しました。');
    }
};
// Doctorアカウント作成API
export const createDoctorAccount = async (email: string, password: string, displayName: string, hospitalId: string) => {
    try {
        // データ作成
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('displayName', displayName);
        formData.append('hospitalId', hospitalId);

        await axios.post('/api/managers/users/doctors', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // 明示的に指定（なくてもAxiosが自動で付ける）
            },
        });
        showAPISnackbar('success', 'アカウント作成に成功しました。');
    } catch (error: any) {
        showAPISnackbar('error', 'サーバーエラーが発生しました。');
    }
};

// クライアント一覧取得API
export const fetchAllClients = async (): Promise<Client[]> => {
    type FetchAllClientsResponse = {
        clients: Client[];
    };

    try {
        const { data } = await axios.get(`/api/managers/clients`);
        return (data as FetchAllClientsResponse).clients;
    } catch (err: any) {
        showAPISnackbar('error', 'サーバーエラーが発生しました。');
        return [];
    }
};

// クライアント企業登録API
export const createClient = async (clientName: string) => {
    try {
        await axios.post('/api/managers/clients', { name: clientName });
        showAPISnackbar('success', '企業の登録に成功しました。');
    } catch (error: any) {
        showAPISnackbar('error', 'サーバーエラーが発生しました。');
    }
};

// クライアント詳細取得API
export const fetchClientInfo = async ([_, clientId]: [string, string]): Promise<FetchClientInfoResponse> => {
    try {
        const { data } = await axios.get(`/api/managers/clients/${clientId}`);
        return data as FetchClientInfoResponse;
    } catch (error: any) {
        showAPISnackbar('error', 'サーバーエラーが発生しました。');
        return { name: '', users: [] };
    }
};
// クライアント企業更新API
export const updateClient = async (clientId: string, clientName: string) => {
    try {
        await axios.put(`/api/managers/clients/${clientId}`, { name: clientName });
        showAPISnackbar('success', '企業名の更新に成功しました。');
    } catch (error: any) {
        showAPISnackbar('error', 'サーバーエラーが発生しました。');
    }
};
// MRアカウント作成API
export const createSalesAccount = async (email: string, password: string, displayName: string, clientId: string) => {
    try {
        // データ作成
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('displayName', displayName);
        formData.append('clientId', clientId);

        await axios.post('/api/managers/users/sales', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // 明示的に指定（なくてもAxiosが自動で付ける）
            },
        });
        showAPISnackbar('success', 'アカウント作成に成功しました。');
    } catch (error: any) {
        showAPISnackbar('error', 'サーバーエラーが発生しました。');
    }
};
// Manager-User情報更新API
export const managerUpdateUserInfo = async (userId: string, email: string, displayName: string, password: string) => {
    // データ作成
    const formData = new FormData();
    formData.append('email', email);
    formData.append('displayName', displayName);
    formData.append('password', password);

    try {
        await axios.put(`/api/managers/users/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // 明示的に指定（なくてもAxiosが自動で付ける）
            },
        });
        showAPISnackbar('success', 'アカウント情報の更新に成功しました。');
    } catch (error: any) {
        showAPISnackbar('error', 'サーバーエラーが発生しました。');
    }
};
