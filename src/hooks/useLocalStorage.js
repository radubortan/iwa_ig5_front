import { useEffect, useState } from 'react';

//prefix placed in front of every value that is saved in the local storage
const PREFIX = 'fsj-app-';

//used for saving data in the local storage
const useLocalStorage = (key, initialValue) => {
    //name of the variable to be stored
    const prefixedKey = PREFIX + key;

    const [value, setValue] = useState(() => {
        //we read the value from storage
        const jsonValue = localStorage.getItem(prefixedKey);
        //if we have a value stored, we set the state
        if (jsonValue !== null && jsonValue !== 'undefined') {
            return JSON.parse(jsonValue);
        }
        if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    const deleteValue = () => {
        localStorage.removeItem(prefixedKey);
    };

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value]);

    return [value, setValue, deleteValue];
};

export default useLocalStorage;
