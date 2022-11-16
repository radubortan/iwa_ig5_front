import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [accountType, setAccountType] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [accountId, setAccountId] = useState('');

    const contextValue = {
        accessToken,
        setAccessToken,
        accountType,
        setAccountType,
        accountId,
        setAccountId,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
