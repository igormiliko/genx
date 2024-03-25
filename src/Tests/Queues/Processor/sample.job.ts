import Job from "../../../Services/Queue/Job";

class SampleJob extends Job {
    handle(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if(this.times > 0) {
                reject(`Rejecting in time ${this.times}`)
            } else {
                resolve()
            }
        })
    }
}

export default SampleJob