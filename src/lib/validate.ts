import { TFormErrors, TValidationConfig } from "../common/types";

export function validate(
    formData: FormData,
    rules: TValidationConfig = {}
): TFormErrors {
    return Object.keys(rules).reduce((errors: TFormErrors, inputName) => {
        const checkResult = rules[inputName](
            formData.get(inputName) as string,
            formData
        );
        if (checkResult !== true) {
            errors[inputName] = checkResult;
        }
        return errors;
    }, {});
}
