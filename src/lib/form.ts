import { TValidationConfig } from "../common/types";
import { validate } from "./validate";
import EventBus from "./event-bus";

export default class Form {
    static EVENTS = {
        SUBMIT: "submit",
        VALID: "valid",
        ERRORS: "errors",
    };

    el: HTMLFormElement;
    validationConfig?: TValidationConfig;

    eventBus = new EventBus();

    constructor(root: HTMLFormElement, validationConfig?: TValidationConfig) {
        this.el = root;
        this.validationConfig = validationConfig;

        this.el.addEventListener("submit", this.handleSubmit);
        const inputs = this.el.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener("focus", this.handleValidate);
            inputs[i].addEventListener("blur", this.handleValidate);
        }
    }

    data() {
        return new FormData(this.el);
    }

    validate() {
        return validate(this.data(), this.validationConfig);
    }

    handleValidate = () => {
        const errors = this.validate();
        if (Object.values(errors).length) {
            this.eventBus.emit(Form.EVENTS.ERRORS, errors);
        } else {
            this.eventBus.emit(Form.EVENTS.VALID);
        }
    };

    handleSubmit = (event: Event) => {
        event.preventDefault();
        const errors = this.validate();
        if (!Object.values(errors).length) {
            const dataObject = Object.fromEntries(new FormData(this.el));
            this.eventBus.emit(Form.EVENTS.VALID);
            this.eventBus.emit(Form.EVENTS.SUBMIT, dataObject);
            console.log(dataObject);
        } else {
            this.eventBus.emit(Form.EVENTS.ERRORS, errors);
        }
    };
}
