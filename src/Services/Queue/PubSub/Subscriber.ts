import Topic from "./Topic";

class Subscriber {
    key: Buffer;
    url: string
    topics: Topic[]

    constructor(key: Buffer, url: string, topics: Topic[]) {
        this.key = key
        this.url = url
        this.topics = topics
    }

    forward(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }
}

export default Subscriber