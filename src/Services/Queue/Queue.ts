import Job from "./Job"
import Message from "./PubSub/Message"

export type TQueueOptions = {
    processType: 'FIFO' | 'LIFO' // Order to process the queue
    delivery: 'at-least-once' | 'exactly-once'
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
    protected queue: Job[] = []

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
     * @protected
     * @returns {boolean}
     */
    protected isFull(): boolean {
        return this.options.capacity ? this.queue.length >= this.options.capacity : false;
    }
    /**
     * Method to check if the queue is empty
     * @protected
     * @returns {boolean}
     */
    protected isEmpty(): boolean {
        return this.queue.length === 0;
    }

    enqueue(object: Job, refeeding?: boolean): void {
        if (this.isFull()) {
            return;
        }

        if (!refeeding) {
            object.times = this.options.retryTimes
        }

        if (this.customEnqueue || this.options.inDisk) {
            this.customEnqueue(object, refeeding)
        } else {
            this.queue.push(object as any);
        }
    }

    customEnqueue(object: Job, refeeding?: boolean): boolean {
        if (this.options.inDisk) {
            throw new Error('Please, override the customEnqueue method in a new child class')
        }
        return false
    }

    private dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }

        if (this.customDequeue || this.options.inDisk) {
            this.customDequeue()
        } else {
            if (this.options.processType === QueuePolicy.LIFO) {
                return this.queue.pop();
            } else {
                return this.queue.shift();
            }
        }
    }

    protected customDequeue(): boolean {
        if (this.options.inDisk) {
            throw new Error('Please, override the dequeue method in a new child class')
        }
        return false
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