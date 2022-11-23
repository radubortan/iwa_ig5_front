//converts epoch date to dd/mm/yyyy format
export const convertEpochDate = (epochDate) => {
    let date = new Date(epochDate);
    return (
        date.getUTCDate() +
        '/' +
        (date.getUTCMonth() + 1) +
        '/' +
        date.getUTCFullYear()
    );
};

export const convertDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
};

export const convertYyyymmddToDdmmyyyy = (date) => {
    const [year, month, day] = date.split('-');

    const result = [day, month, year].join('/');
    return result;
};
