declare module '*.module.css' {
    const content: Record<string, string>;
    export default content;
}

declare module "*.hbs" {
    const content: (context?: object, params?: object) => string;
    export default content;
}

declare module "*.svg";
declare module "*.png";