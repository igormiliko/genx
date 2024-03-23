import Job from "./Job"

type TQueueOptions = {
    processType: 'FIFO' | 'LIFO' // Order to process the queue
    delivery: 'at-leats-once' | 'exactly-once'
    expirationTime: number // Time in 'ms' to a job expire
    maxWaitTime: number // Max time in 'ms' to exec a job
    delay: number // Delay time in 'ms' between queue process
    retryTimes: number // Times to a job can reenqueue
    inDisk?: boolean // Persist the queue in RAM or in disk
    priority?: string[] // Priority order to process jobs
    capacity?: number // Max length to queue
    integration?: {
        consumer: {
            apikey: string,
        }
    }
}

enum QueuePolicy {
    FIFO = "FIFO",
    LIFO = "LIFO"
}

abstract class Queue {
    readonly options: TQueueOptions
    private queue: Job[] = []

    constructor(options: TQueueOptions) {
        this.options = options
    }

    private isFull(): boolean {
        return this.options.capacity ? this.queue.length >= this.options.capacity : false;
    }

    private isEmpty(): boolean {
        return this.queue.length === 0;
    }

    enqueue(object: Job, refeeding?: boolean): void {
        if (this.isFull()) {
            return;
        }
        
        if(!refeeding) {
            object.times = this.options.retryTimes
        }

        if (this.options.inDisk) {
            this.customEnqueue()
        } else {
            this.queue.push(object);
        }
    }

    customEnqueue() {
        if(this.options.inDisk) {
            throw new Error('Please, override the customEnqueue method in a new child class')
        }
    }
    
    private dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }

        if (this.options.inDisk) {
            this.customDequeue()
        } else {
            if (this.options.processType === QueuePolicy.LIFO) {
                return this.queue.pop();
            } else {
                return this.queue.shift();
            }
        }
    }

    customDequeue() {
        if(this.options.inDisk) {
            throw new Error('Please, override the dequeue method in a new child class')
        }
    }

    length() {
        return this.queue.length
    }

    prosecute() {
        let job = this.dequeue()      
        return job
    }
}

export default Queue