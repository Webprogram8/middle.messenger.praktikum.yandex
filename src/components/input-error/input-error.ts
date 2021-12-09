// @ts-ignore
import Handlebars from "handlebars/dist/handlebars.runtime";

import Block from "../../lib/block";

import * as styles from "./input-error.module.css";
import template from "./input-error.hbs";

type TProps = {
    error?: string;
    className?: string;
};

export default class InputError extends Block<TProps> {
    constructor(error?: string, className?: string) {
        super("div", { error, className }, template);
    }

    protected createResources() {
        super.createResources();
        this.element?.classList.add(styles.root);
        if (this.props.className) {
            this.element?.classList.add(this.props.className);
        }
    }
}
