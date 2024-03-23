import Job from "./Job";
import Message from "./Message";
import Queue from "./Queue";

class QueueProcessor {
    private queue: Queue;
    isBlocked: boolean = false

    constructor(queue: QueueProcessor['queue']) {
        this.queue = queue
    }

    private reenqueue(process: Job | Message) {
        if (process.times > 1) {
            this.queue.enqueue(process, true)
        }
    }

    private exec(process: Job | Message) {
        return new Promise<void>(async (resolve) => {
            let sentinel = setTimeout(() => {
                this.catch({ message: 'Processing time out', rest: process.times })
                
                this.reenqueue(process)
                
                return resolve()
            }, this.queue.options.maxWaitTime)

            try {                
                await process!.handle()
            } catch (error: any) {
                this.reenqueue(process)

                if (this.catch) {
                    this.catch(error)
                }
            } finally {
                clearTimeout(sentinel)
                return resolve()
            }
        })
    }

    public async start(): Promise<void> {
        while (!this.isBlocked && !!this.queue.length()) {
            let job = this.queue.prosecute()
            
            if (!job) {
                break;
            }

            job.times = job.times - 1

            await this.exec(job)

            await new Promise<void>((resolve) => {
                setInterval(()=>resolve(), this.queue.options.delay).unref()
            })
        }
    };

    continue() {
        this.isBlocked = false
        this.start()
    }

    stop() {
        this.isBlocked = true
    }

    protected catch(error: any): void {
        console.log('Error =>> \n', error)
    }
}

export default QueueProcessor