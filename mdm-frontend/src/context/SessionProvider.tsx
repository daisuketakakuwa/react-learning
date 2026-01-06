import { createContext, useState } from 'react';

export const AuthContext = createContext({} as SessionContext);

type Props = {
    children: React.ReactNode;
};

const SessionProvider: React.FC<Props> = (props): JSX.Element => {
    // Userログイン用
    const [authUserInfo, setAuthUserInfo] = useState({} as UserInfo);
    // Managerログイン用
    const [isManagerAuthenticated, setIsManagerAuthenticated] = useState(false);
    return (
        <AuthContext.Provider value={{ authUserInfo, setAuthUserInfo, isManagerAuthenticated, setIsManagerAuthenticated }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default SessionProvider;
