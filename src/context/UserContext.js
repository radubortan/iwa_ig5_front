import { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    //gives acces to the account type stored in local storage
    const [storageAccountType, setStorageAccountType] =
        useLocalStorage('accountType');
    const [storageAccessToken, setStorageAccessToken] =
        useLocalStorage('accessToken');
    const [storageAccountId, setStorageAccountId] =
        useLocalStorage('accountId');

    //account type is initialised to the value saved in local storage
    const [accountType, setAccountType] = useState(storageAccountType);
    const [accessToken, setAccessToken] = useState(storageAccessToken);
    const [accountId, setAccountId] = useState(storageAccountId);

    const contextValue = {
        accessToken,
        setAccessToken,
        accountType,
        setAccountType,
        accountId,
        setAccountId,
        setStorageAccountType,
        setStorageAccessToken,
        setStorageAccountId,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
