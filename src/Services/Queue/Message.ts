class Message {
    times = 1
    
    from: string
    to: string

    constructor(from: string, to: string) {
        this.from = from
        this.to = to
    }
    
    handle() {
        return new Promise<void>(() => {

        })
    }
}

export default Message