export function validateName(name: string) {
    const regex = /^(?:\b\w{3,}\b\s*){2,}$/gm;
    return regex.test(name);
}

export function validateEmail(email: string) {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gm;
    return regex.test(email);
}

export function validatePassword(password: string) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm;
    return regex.test(password);
}
