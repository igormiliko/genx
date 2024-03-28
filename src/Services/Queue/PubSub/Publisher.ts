import Message, { IMessage } from "./Message"

class Publisher {
    key: Buffer;
    constructor(key: Buffer) {
       this.key = key
    }

    isValidMessage(): boolean {
        return true
    }

    createMessage({topic, event, data}: IMessage) {
        if(!this.isValidMessage()) {
            throw new Error('Message not valid!')
        }
        return new Message({topic, event, data})
    }
}

export default Publisher