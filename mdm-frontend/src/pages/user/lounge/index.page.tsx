import { AuthContext } from '@/context/SessionProvider';
import { useContext } from 'react';
import DoctorLoungePage from './_components/DoctorLoungePage';
import SalesLoungePage from './_components/SalesLoungePage';

const LoungePage = () => {
    const { authUserInfo } = useContext(AuthContext);

    const userType = authUserInfo?.userType;

    return (
        <>
            {userType == 'DOCTOR' && <DoctorLoungePage />}
            {userType == 'MR' && <SalesLoungePage />}
        </>
    );
};

export default LoungePage;
