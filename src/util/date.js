//converts epoch date to dd/mm/yyyy format
export const convertDate = (epochDate) => {
    let date = new Date(epochDate);
    return (
        date.getUTCDate() +
        '/' +
        (date.getUTCMonth() + 1) +
        '/' +
        date.getUTCFullYear()
    );
};
