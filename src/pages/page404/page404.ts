import "~/src/layouts/main";
import "~/src/components/input";
import "~/src/components/button";

import Block from "../../lib/block";
import { TProps } from "../../types";

import template from "./page404.hbs";
import * as pageStyles from "./page404.module.css";

export default class Page404 extends Block<TProps> {
    constructor() {
        super("div", { pageStyles }, template);
    }
}
