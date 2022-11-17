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

    //account type is initialised to the value saved in local storage
    const [accountType, setAccountType] = useState(storageAccountType);
    const [accessToken, setAccessToken] = useState('');
    const [accountId, setAccountId] = useState('');

    const contextValue = {
        accessToken,
        setAccessToken,
        accountType,
        setAccountType,
        accountId,
        setAccountId,
        setStorageAccountType,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
