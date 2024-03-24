import Job from "../Job"

class Message extends Job {
    times = 1
    topic: string
    
    constructor(topic: string, event: string, data: {[x: string]: any}) {
        super()
        this.topic = topic
    }
    
    handle() {
        return new Promise<void>(() => {

        })
    }
}

export default Message