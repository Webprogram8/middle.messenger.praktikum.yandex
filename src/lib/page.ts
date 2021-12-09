import {TCompiledTemplate, TStyles} from "../common/types";

export class Page<C extends object> {
    template: TCompiledTemplate;
    styles: TStyles;

    componentDidMount?(root: HTMLElement): void;

    constructor(template: TCompiledTemplate, styles: TStyles) {
        this.styles = styles;
        this.template = template;
    }

    render(root: HTMLElement, context?: C) {
        root.innerHTML = this.template({ ...context, pageStyles: this.styles });
        this.componentDidMount?.(root);
    }
}