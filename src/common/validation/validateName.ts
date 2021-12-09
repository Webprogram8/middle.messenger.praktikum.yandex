import { TValidationCheck } from "../types";

export const validateName: TValidationCheck = (name: string | null) => {
    const nameRegex = /^[A-ZА-Я][a-zA-Zа-яА-Я-]+$/;
    return name && name.match(nameRegex) ? true : "Incorrect name";
};
