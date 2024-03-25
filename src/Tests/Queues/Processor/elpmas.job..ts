import Job from "../../../Services/Queue/Job";

class ElpmasJob extends Job {
    handle(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            resolve()
        })
    }
}

export default ElpmasJob