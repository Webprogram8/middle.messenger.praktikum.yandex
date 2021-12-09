import "~/src/layouts/main";
import "~/src/components/input";
import "~/src/components/button";
import "~/src/partials/chat-item";
import "~/src/partials/chat-message";

import Block from "../../lib/block";
import { TProps } from "../../types";
import { Input } from "../../components/input";

import template from "./chats.hbs";
import * as pageStyles from "./chats.module.css";
import Form from "../../lib/form";
import { validateNotEmpty } from "../../common/validation/validateNotEmpty";
import { TFormErrors } from "../../common/types";

const chats = [
    {
        name: "John Doe",
        lastMessage: "Last message",
    },
    {
        name: "John Doe",
    },
    {
        name: "John Doe",
        online: true,
    },
    {
        name: "John Doe",
        lastMessage: "Last message last message",
        online: true,
        hasNewMessages: true,
        author: "You",
    },
    {
        name: "John Doe",
        lastMessage: "Last message",
    },
];

export default class ChatsPage extends Block<TProps> {
    form: Form | null = null;

    constructor() {
        super(
            "div",
            {
                pageStyles,
                searchInput: new Input({
                    name: "search",
                    label: "Search",
                    class: pageStyles.searchInput,
                }),
                messageInput: new Input({
                    name: "message",
                    label: "Type something",
                    class: pageStyles.messageInput,
                }),
                chats,
                currentChat: {
                    name: "John Doe",
                    online: true,
                    messages: [
                        {
                            text:
                                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem " +
                                "Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown " +
                                "printer took a galley of type and scrambled it to make a type specimen book.",
                            name: "John Doe",
                            datetime: "2021-01-01 12:24",
                        },
                        {
                            text:
                                "It is a long established fact that a reader will be distracted by the readable content " +
                                "of a page when looking at its layout.",
                            datetime: "2021-01-01 12:25",
                        },
                    ],
                },
            },
            template
        );
    }

    handleSubmit(data: object) {
        console.log(data);
    }

    handleErrors(errors: TFormErrors) {
        this.children.messageInput?.setProps({ error: errors.message });
    }

    handleValid() {
        this.children.messageInput?.setProps({ error: undefined });
    }

    get formEl() {
        return this.element?.getElementsByTagName("form")[0];
    }

    componentDidMount() {
        if (this.formEl) {
            this.form = new Form(this.formEl, { message: validateNotEmpty });
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
