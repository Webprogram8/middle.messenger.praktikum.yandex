import { TValidationCheck } from "../types";

export const validatePassword: TValidationCheck = (password: string | null) => {
    const passwordLength = password?.length ?? 0;
    if (!password) {
        return "Empty password";
    }
    if (passwordLength < 8) {
        return "Short password";
    }

    if (passwordLength > 40) {
        return "Long password";
    }

    return password.match(/[A-Z]/) && password.match(/[0-9]/)
        ? true
        : "Password must contain numbers and uppercase letters";
};
