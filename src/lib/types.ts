export type TStyles<S = unknown> = Record<string, S>;

export type TCompiledTemplate = (context?: object, params?: object) => string;

type TInputName = string;
type TErrorMessage = string;
export type TFormErrors = Record<TInputName, TErrorMessage>;

export type TValidationCheck = (value: string | null, formData: object) => string | true;

export type TValidationConfig = Record<TInputName, TValidationCheck>;

export type Class<T> = new (...args: any[]) => T;
export type TContextBase = Partial<{
	_withInternalID: boolean;
	_id: string | null;
	events: Record<string, () => void>;
}>;
export type TProps = Record<string, unknown>;
export type TTemplate = (context?: object, options?: object) => string;
