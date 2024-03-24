import Message from "./Message"
import Topic from "./Topic/Topic"

class Publisher {
    topic: Topic
    message: Message
    constructor(topic: Topic, message: Message) {
        this.topic = topic
        this.message = message
    }
}

export default Publisher