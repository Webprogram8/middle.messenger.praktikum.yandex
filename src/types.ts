export type TProps = Record<string, unknown>;
export type TTemplate = (context?: object, options?: object) => string;

export type TContextBase = Partial<{
    _withInternalID: boolean;
    _id: string | null;
    events: Record<string, () => void>;
}>;
