import Job from "./Job";
import Queue from "./Queue";

class QueueProcessor {
    private queue: Queue;
    isBlocked: boolean = false

    constructor(queue: QueueProcessor['queue']) {
        this.queue = queue
    }

    private reenqueue(job: Job) {
        if (job.times > 1) {
            this.queue.enqueue(job, true)
        }
    }

    private exec(job: Job) {
        return new Promise<void>(async (resolve) => {
            let sentinel = setTimeout(() => {
                this.catch({ message: 'Processing time out', rest: job.times })
                
                this.reenqueue(job,)
                
                resolve()
            }, this.queue.options.maxWaitTime)

            try {                
                await job!.handle()
            } catch (error: any) {
                this.reenqueue(job)

                if (this.catch) {
                    this.catch(error)
                }
            } finally {
                resolve(clearTimeout(sentinel))
            }
        })
    }

    public async start(): Promise<void> {
        while (!this.isBlocked && !!this.queue.length()) {
            let job = this.queue.prosecute()
            
            if (!job) {
                break;
            }
            console.log(job.times, job.constructor.name)

            job.times = job.times - 1

            await this.exec(job)

            await new Promise<void>((resolve) => {
                setInterval(resolve, this.queue.options.delay)
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
        // console.log('Error =>> \n', error)
    }
}

export default QueueProcessor