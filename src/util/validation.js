export function isTextFieldEmpty(string) {
    return String(string).trim().length === 0;
}

export function isEmailValid(email) {
    const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
        return true;
    }
    return false;
}
