import "~/src/layouts/main";
import "~/src/components/input";
import "~/src/components/button";

import Block from "../../lib/block";
import { TProps } from "../../types";

import template from "./page500.hbs";
import * as pageStyles from "./page500.module.css";
import { Button } from "../../components/button";

export default class Page500 extends Block<TProps> {
    constructor() {
        super(
            "div",
            {
                button: new Button({
                    text: "Reload page",
                    onClick: () => window.location.reload(),
                }),
                pageStyles,
            },
            template
        );
    }
}
