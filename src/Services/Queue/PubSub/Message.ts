import Job from "../Job"
import Topic from "./Topic/Topic"

class Message extends Job {
    times = 1
    topic: Topic['name']
    event: keyof Topic['events']
    data: {[x: string]: any}
    
    constructor(topic: Topic['name'], event:  keyof Topic['events'], data: {[x: string]: any}) {
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