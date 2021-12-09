export type TStyles = object;

export type TCompiledTemplate = (context?: object, params?: object) => string;

type TInputName = string;
type TErrorMessage = string;
export type TFormErrors = Record<TInputName, TErrorMessage>;

export type TValidationConfig = Record<TInputName, TValidationCheck>;

export type TValidationCheck = (
    value: string | null,
    formData: object
) => string | true;
