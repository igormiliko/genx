import Job from "../Job"
import Topic from "./Topic"

export interface IMessage {
    topic: Topic, event: keyof Topic['events'], data: { [x: string]: any }
}

class Message extends Job {
    times = 1
    topic: IMessage['topic']
    event: IMessage['event']
    data: IMessage['data']

    constructor({ topic, event, data }: IMessage) {
        super()
        this.topic = topic
        this.event = event
        this.data = data
    }

    // Needs to go in the subscribers endPoints to post the message
    handle() {
        return new Promise<void>(() => {

        })
    }
}

export default Message