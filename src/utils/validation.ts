export function validateName(name: string) {
    const regex = /([a-z-A-Zа-яА-Я-]{3,})/g;
    const result = name.match(regex);

    return result && result.length >= 2;
}

export function validateEmail(email: string) {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gm;
    return regex.test(email);
}

export function validatePassword(password: string) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm;
    return regex.test(password);
}
