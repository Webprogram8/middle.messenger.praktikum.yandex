import "~/src/layouts/main";
import "~/src/components/input";
import "~/src/components/button";

import { TFormErrors, TStyles } from "../../common/types";
import { Button } from "../../components/button";
import Block from "../../lib/block";
import Input from "../../components/input/input";
import Form from "../../lib/form";
import { TContextBase } from "../../types";

import template from "./login.hbs";
import * as pageStyles from "./login.module.css";

type TContext = Partial<{
    pageStyles: TStyles;
}> &
    TContextBase;

export default class LoginPage extends Block<TContext> {
    form: Form | null = null;

    constructor() {
        super(
            "div",
            {
                button: new Button({ text: "Sign in", _withInternalID: true }),
                inputLogin: new Input({
                    name: "login",
                    label: "Login",
                    class: pageStyles.input,
                    _withInternalID: true,
                }),
                inputPassword: new Input({
                    type: "password",
                    name: "password",
                    label: "Password",
                    class: pageStyles.input,
                    _withInternalID: true,
                }),
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

    handleSubmit(data: object) {
        console.log(data);
    }

    componentDidMount() {
        if (this.formEl) {
            this.form = new Form(this.formEl);
            this.form.eventBus.on(
                Form.EVENTS.SUBMIT,
                this.handleSubmit.bind(this)
            );
        }
    }
}
