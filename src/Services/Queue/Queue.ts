import Job from "./Job"
import Message from "./PubSub/Message"

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

/**
 * Class to abstract a queue, this can be implemented and override some methods if some custom options
 * @class
 */
abstract class Queue {
    /**
     * Custom options to create a Queue:
     * @readonly 
     * @type {TQueueOptions} 
     * @example
     * {
     *      processType: 'FIFO' | 'LIFO' // Order to process the queue
     *      delivery: 'at-leats-once' | 'exactly-once'
     *      expirationTime: number // Time in 'ms' to a job expire
     *      maxWaitTime: number // Max time in 'ms' to exec a job
     *      delay: number // Delay time in 'ms' between queue process
     *      retryTimes: number // Times to a job can reenqueue
     *      inDisk?: boolean // Persist the queue in RAM or in disk
     *      priority?: string[] // Priority order to process jobs
     *      capacity?: number // Max length to queue
     *      integration?: {
     *          consumer: {
     *              apikey: string,
     *          }
     *      }
     * }
     */
    readonly options: TQueueOptions
    
    /**
     * Array to enqueue the things
     * @private
     * @type {Job}
     */
    private queue: Job[] | Message[] = []
    
    /**
     * Create an Queue instance.
     * @constructor
     * @param {TQueueOptions} options - O tipo de veículo (carro, moto, etc.).
     */
    constructor(options: TQueueOptions) {
        this.options = options
    }

    /**
     * Method to check if the queue is full
     * @private
     * @returns {boolean}
     */
    private isFull(): boolean {
        return this.options.capacity ? this.queue.length >= this.options.capacity : false;
    }
    /**
     * Method to check if the queue is empty
     * @private
     * @returns {boolean}
     */
    private isEmpty(): boolean {
        return this.queue.length === 0;
    }

    enqueue(object: Job | Message, refeeding?: boolean): void {
        if (this.isFull()) {
            return;
        }
        
        if(!refeeding) {
            object.times = this.options.retryTimes
        }

        if (this.options.inDisk) {
            this.customEnqueue()
        } else {
            this.queue.push(object as any);
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

    private customDequeue() {
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