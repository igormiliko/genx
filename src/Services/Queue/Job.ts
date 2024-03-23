abstract class Job {
    times: number = 1
    abstract handle(): Promise<void>
}

export default Job