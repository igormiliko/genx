import publisherJob from "../../App/Components/Jobs/sample.job"
import subscriberJob from "../../App/Components/Jobs/elpmas.job."
import sampleQueue from "../../App/Components/Queue/sample.queue"
import QueueProcessor from "../../Services/Queue/Processor"
import Queue from "../../Services/Queue/Queue"

describe('Testing the processor class', () => {
    test('main', async () => {
        let pub = new publisherJob()
        let sub = new subscriberJob()

        const queue = new sampleQueue({
            delay: 2000,
            delivery: "at-leats-once",
            expirationTime: 10000,
            maxWaitTime: 10000,
            processType: "FIFO",
            retryTimes: 5
        })

        queue.enqueue(pub)
        queue.enqueue(sub)

        let process = (q: Queue) => new QueueProcessor(q)

        await process(queue).start()
    })
})