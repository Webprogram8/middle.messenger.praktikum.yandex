import "~/src/layouts/main";
import "~/src/components/input";
import "~/src/components/button";

import { TFormErrors, TStyles } from "../../common/types";
import { Button } from "../../components/button";
import Block from "../../lib/block";
import Input from "../../components/input/input";
import Form from "../../lib/form";
import { TContextBase } from "../../types";
import { validateLogin } from "../../common/validation/validateLogin";
import { validatePassword } from "../../common/validation/validatePassword";

import template from "./registration.hbs";
import * as pageStyles from "./registration.module.css";
import { validateName } from "../../common/validation/validateName";
import { validateEmail } from "../../common/validation/validateEmail";
import { validatePhone } from "../../common/validation/validatePhone";

type TContext = Partial<{
    pageStyles: TStyles;
}> &
    TContextBase;

const inputs = {
    inputFirstName: new Input({
        name: "first_name",
        label: "First name",
        _withInternalID: true,
    }),
    inputSecondName: new Input({
        name: "second_name",
        label: "Second name",
        _withInternalID: true,
    }),
    inputLogin: new Input({
        name: "login",
        label: "Login",
        _withInternalID: true,
    }),
    inputEmail: new Input({
        name: "email",
        label: "Email",
        _withInternalID: true,
    }),
    inputPhone: new Input({
        name: "phone",
        label: "Phone",
        _withInternalID: true,
    }),
    inputPassword: new Input({
        type: "password",
        name: "password",
        label: "Password",
        _withInternalID: true,
    }),
    inputRepeatPassword: new Input({
        type: "password",
        name: "password2",
        label: "Repeat password",
        _withInternalID: true,
    }),
};

export default class RegistrationPage extends Block<TContext> {
    form: Form | null = null;

    constructor() {
        super(
            "div",
            {
                button: new Button({ text: "Create account" }),
                ...inputs,
            },
            template
        );
    }

    protected context() {
        return {
            ...super.context(),
            pageStyles,
        };
    }

    get formEl() {
        return this.element?.getElementsByTagName("form")[0];
    }

    validate() {
        const errors = this.form?.validate();
        if (errors && Object.values(errors).length) {
            this.handleErrors(errors);
        }
    }

    handleSubmit(data: object) {
        console.log(data);
    }

    handleErrors(errors: TFormErrors) {
        Object.values(inputs).forEach((input) =>
            input.setProps({ error: input.name && errors[input.name] })
        );
    }

    handleValid() {
        Object.values(inputs).forEach((input) =>
            input.setProps({ error: undefined })
        );
    }

    componentDidMount() {
        if (this.formEl) {
            this.form = new Form(this.formEl, {
                first_name: validateName,
                second_name: validateName,
                login: validateLogin,
                password: validatePassword,
                password2: validatePassword,
                email: validateEmail,
                phone: validatePhone,
            });
            this.form.eventBus.on(
                Form.EVENTS.SUBMIT,
                this.handleSubmit.bind(this)
            );
            this.form.eventBus.on(
                Form.EVENTS.ERRORS,
                this.handleErrors.bind(this)
            );
            this.form.eventBus.on(
                Form.EVENTS.VALID,
                this.handleValid.bind(this)
            );
        }
    }
}
