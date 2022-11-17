import { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    //gives acces to the account type stored in local storage
    const [
        storageAccountType,
        setStorageAccountType,
        deleteStorageAccountType,
    ] = useLocalStorage('accountType');
    const [
        storageAccessToken,
        setStorageAccessToken,
        deleteStorageAccessToken,
    ] = useLocalStorage('accessToken');
    const [storageAccountId, setStorageAccountId, deleteStorageAccountId] =
        useLocalStorage('accountId');

    //account type is initialised to the value saved in local storage
    const [accountType, setAccountType] = useState(storageAccountType);
    const [accessToken, setAccessToken] = useState(storageAccessToken);
    const [accountId, setAccountId] = useState(storageAccountId);

    const signOut = () => {
        setAccessToken('');
        setAccountId('');
        setAccountType('');
        deleteStorageAccessToken();
        deleteStorageAccountId();
        deleteStorageAccountType();
    };

    const logIn = (accountType, accessToken, accountId) => {
        setAccountType(accountType);
        setStorageAccountType(accountType);

        setAccessToken(accessToken);
        setStorageAccessToken(accessToken);

        setAccountId(accountId);
        setStorageAccountId(accountId);
    };

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
        signOut,
        logIn,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
