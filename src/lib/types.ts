export type TStyles<S = unknown> = Record<string, S>;

export type TCompiledTemplate = (context?: object, params?: object) => string;

type TInputName = string;
type TErrorMessage = string;
export type TFormErrors = Record<TInputName, TErrorMessage>;

export type TValidationCheck = (value: string | null, formData: object) => string | true;

export type TValidationConfig = Record<TInputName, TValidationCheck>;

export type TClass<T> = new (...args: any[]) => T;

export type TContextBase = Partial<{
	_withInternalID: boolean;
	_id: string | null;
	events: Record<string, () => void>;
}>;
export type TProps = Record<string, unknown>;
export type TTemplate = (context?: object, options?: object) => string;

export type TDOMSelector = string;

export type Indexed<T = unknown> = {
	[key in string]: T;
};

export type TUser = {
	firstName: string;
	secondName: string;
	login: string;
	email: string;
	password?: string;
	phone: string;
	id?: number;
	displayName?: string;
	avatar?: string;
	role?: string;
};

export type TUserFormData = {
	/* eslint-disable camelcase  */
	first_name: string;
	second_name: string;
	display_name?: string;
	/* eslint-enable camelcase  */
	login: string;
	email: string;
	password: string;
	phone: string;
	id?: number;
	avatar?: string;
	role?: string;
};

export type TChatsRequest = Partial<{
	offset: number;
	limit: number;
	title: string;
}>;

export type TChat = {
	avatar: string;
	createdBy: number;
	id: number;
	lastMessage: null;
	title: string;
	unreadCount: number;
};

/* eslint-disable camelcase */
export type TChatData = {
	avatar: string;
	created_by: number;
	id: number;
	last_message: null;
	title: string;
	unread_count: number;
};
/* eslint-enable camelcase */
