import Queue, { TQueueOptions } from "../Queue";
import Message from "./Message";
import Publisher from "./Publisher";
import Subscriber from "./Subscriber";

class Topic extends Queue {
    readonly name: string;
    protected queue: Message[] = []
    protected events: string[];

    key: Buffer

    publishers: Publisher[] = []
    subcribers: Subscriber[] = []

    constructor(
        name: string,
        options: TQueueOptions = {
            delay: 100,
            delivery: "at-least-once",
            expirationTime: 1000 * 60 * 60 * 24,
            maxWaitTime: 5000,
            processType: 'FIFO',
            retryTimes: 3
        },
        events: string[],
        key: Buffer
    ) {
        super(options)
        this.name = name
        this.events = events
        this.key = key
        this.loadPublishers()
        this.loadSubscribers()
    }

    private loadPublishers(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                
            } catch (error) {
                
            }
        })
    }

    private loadSubscribers(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                
            } catch (error) {
                
            }
        })
    }

    customEnqueue(object: Message, refeeding?: boolean) {
        if (this.isFull()) {
            return true;
        }

        if (!refeeding) {
            object.times = this.options.retryTimes
        }

        this.queue.push(object);

        return true
    }

}

export default Topic