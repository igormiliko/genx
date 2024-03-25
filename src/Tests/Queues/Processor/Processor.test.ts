import sampleQueue from "../../../App/Components/Queue/sample.queue"
import QueueProcessor from "../../../Services/Queue/Processor"
import Queue from "../../../Services/Queue/Queue"
import ElpmasJob from "./elpmas.job."
import SampleJob from "./sample.job"

describe('Testing the processor class', () => {
    test('main', async () => {
        let pub = new SampleJob()
        let sub = new ElpmasJob()

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