import Message, { IMessage } from "./Message"

abstract class Publisher {
    message: Message

    constructor({topic, event, data}: IMessage) {
        this.message = this.createMessage({topic, event, data})
    }

    abstract isValidMessage(): boolean

    createMessage({topic, event, data}: IMessage) {
        if(!this.isValidMessage()) {
            throw new Error('Message not valid!')
        }
            return new Message({topic, event, data})

    }
}

export default Publisher