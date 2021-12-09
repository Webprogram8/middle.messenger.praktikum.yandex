import { TValidationCheck } from "../types";

export const validateNotEmpty: TValidationCheck = (value: string | null) => {
    return Boolean(value) || "Required";
};
