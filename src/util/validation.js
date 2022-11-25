//checks if the content of a textfield is empty
export function isTextFieldEmpty(content) {
    return String(content).trim().length === 0;
}

//checks if email is valid and return a boolean and an error message
export const isEmailValid = (email) => {
    const validRegex =
        /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;

    if (email.match(validRegex)) {
        return { validity: true };
    }
    return { validity: false };
};
