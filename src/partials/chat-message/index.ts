// @ts-ignore
import Handlebars from "handlebars/dist/handlebars.runtime";

import "~/src/partials/mini-avatar";

import avatarStub from "~/static/photo-stub.png";

import template from "./chat-message.hbs";
import * as styles from "./chat-message.module.css";

const defaultContext = {
    avatar: avatarStub,
};

Handlebars.registerPartial("chat-message", (context: object, options: object) =>
    template({ ...defaultContext, ...context, styles }, options)
);
