import Job from "../../../Services/Queue/Job";

class Subscriber extends Job {
    handle(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            resolve()
        })
    }
}

export default Subscriber